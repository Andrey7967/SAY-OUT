import { useEffect, useRef, useState } from 'react';
import '../css/messageInput.css';
import enterImg from '../img/enter.svg';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';

import { useAppDispatch, useAppSelector } from '../states/Store';
import { addMessages } from '../states/Slice';

import useConnectWebSocket from '../ws/ws';
import { PCHost } from '../../hostingAdress';

export default function MessageInput() {
  const userId = useAppSelector((state) => state.app.userId);

  const isLogged = useAppSelector((state) => state.app.isLogged);
  const dispatch = useAppDispatch();
  const [messageData, setMessageData] = useState<string>('');
  const messageRef = useRef<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket>(undefined);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isLogged) {
      if (wsRef.current) {
        wsRef.current.close();
      }
      wsRef.current = new WebSocket('ws://' + PCHost + ':3001');

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };

      wsRef.current.onmessage = (event) => {
        const received: messageQuery = JSON.parse(event.data);

        dispatch(addMessages(received));
      };
    } else {
      if (wsRef.current) {
        console.log('ws ref has been closed');
        wsRef.current.close();
        wsRef.current = undefined;
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isLogged]);

  const changeExpand = () => {
    if (inputRef.current) {
      inputRef.current.addEventListener('input', function () {
        if (inputRef.current) {
          const isTextWrapping =
            inputRef.current.scrollWidth > inputRef.current.clientWidth;
          if (isTextWrapping) {
            if (inputRef.current.rows < 8) {
              inputRef.current.rows++;
            }
          }
        }
      });
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    messageRef.current = value;
    changeExpand();
  };

  const handleSubmit = async (e) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!messageRef.current) return;
    if (!wsRef.current) return;

    if (wsRef.current.readyState === WebSocket.OPEN) {
      if (messageRef.current !== undefined) {
        wsRef.current.send(
          JSON.stringify({
            content: messageRef.current,
            author_id: userId,
          } as IMessageData)
        );
      }
      if (inputRef.current) {
        inputRef.current.value = '';
        messageRef.current = '';
      }
    } else {
      console.error('WebSocket не подключен');
    }
  };

  return (
    <form className="messageInput">
      <hr className="messageInputHr"></hr>

      <div className="container rowify">
        <textarea
          ref={inputRef}
          className=" messageInputTextArea "
          dir="auto"
          placeholder="Write something. Don’t be shy!"
          rows={1}
          onChange={handleChange}
          name="content"
        ></textarea>
        <img src={enterImg} className="enter" onClick={handleSubmit}></img>
      </div>
    </form>
  );
}

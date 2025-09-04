import { useEffect, useRef } from 'react';
import '../css/messageInput.css';
import enterImg from '../img/enter.svg';

import { useAppDispatch, useAppSelector } from '../states/Store';
import { addMessages } from '../states/Slice';

import { PCHost } from '../../hostingAdress';
import isMobile from '../logic/isMobileDevice';

export default function MessageInput() {
  const userId = useAppSelector((state) => state.app.userId);

  const isLogged = useAppSelector((state) => state.app.isLogged);
  const dispatch = useAppDispatch();
  const wsRef = useRef<WebSocket>(undefined);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isLogged) {
      wsRef.current = new WebSocket('ws://' + PCHost + ':3001');

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
      };

      wsRef.current.onmessage = (event) => {
        const received: messageQuery = JSON.parse(event.data);

        dispatch(addMessages(received));
      };
    } else {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = undefined;
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isLogged, userId]);

  function handleKeyDown(e: any) {
    if (e.key == 'Enter' && !e.shiftKey && !isMobile()) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const handleSubmit = async (e: any) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = 'auto';
    }

    if (!inputRef.current) return;
    if (!inputRef.current.value) return;
    if (!wsRef.current) return;

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          content: inputRef.current.value,
        } as IMessageData)
      );
      inputRef.current.value = '';
    } else {
      console.error('WebSocket is not connected');
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
          name="content"
          rows={3}
          onKeyDown={handleKeyDown}
        ></textarea>
        <img src={enterImg} className="enter" onClick={handleSubmit}></img>
      </div>
    </form>
  );
}

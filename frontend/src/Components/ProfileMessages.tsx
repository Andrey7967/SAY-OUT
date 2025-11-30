import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { setMessages } from '../states/Slice';
import Message from './message';
import '../css/messages.css';
import { animated, easings, useSpring } from '@react-spring/web';
import { PCHost } from '../../hostingAdress';
import useGetUserMessage from '../hooks/useGetUserMessages';
import messages from './messages';
import IGetUserMessages from '../types/IUserMessages';

export default function ProfileMessages() {
  const {messages} : {messages: Array<IGetUserMessages>} = useGetUserMessage();
 
  const [isLoaded, setIsLoaded] = useState<boolean>(false);



  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef<boolean>(false);

  if (messagesRef.current) {
    shouldAutoScrollRef.current =
      Math.abs(
        messagesRef.current.scrollHeight -
          messagesRef.current.clientHeight -
          messagesRef.current.scrollTop
      ) < 20;
  }

 

  const [spring, api] = useSpring(() => ({
    scrollTop: messagesRef.current?.scrollTop,

    config: {
      duration: 300,
      precision: 0.0001,
      easing: easings.easeInOutCubic,
    },
  }));

  useEffect(() => {
    if (isLoaded) {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    if (messagesRef.current) {
      if (shouldAutoScrollRef.current) {
        api.start({
          from: {
            scrollTop: messagesRef.current.scrollTop,
          },
          to: {
            scrollTop:
              messagesRef.current?.scrollHeight -
              messagesRef.current.clientHeight,
          },
        });
      }
    }
  }, [messages]);

  return (
    <animated.div
      ref={messagesRef}
      scrollTop={spring.scrollTop}
      className="customScroll messageContainer"
    >
      {messages.map((message) =>
          <Message
            key={message.id}
            content={message.content}
            author={false}
            authorName={" "}
          />
        )
      }
    </animated.div>
  );
}

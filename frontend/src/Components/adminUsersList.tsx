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
import ProfileMessage from './ProfileMessage';
import message from './message';
import UserDataElement from './UserDataElement';
import useGetUser from '../hooks/useGetUser';
import IGetUser from '../types/IGetUser';
import LoadingElement from './loadingElement';

export default function AdminUsers() {
  const { users, loading }: { users: Array<IGetUser>; loading: boolean } =
    useGetUser();

  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef<boolean>(false);

  return (
    <>
      <div className="row  p64">
        <div className="col-md-12">
          <h2 className="p96">User List</h2>
        </div>
      </div>

      {loading ? (
        <div className="List p64 width100">
          <LoadingElement />
        </div>
      ) : (
        <div className="container  mt-4 container-fluid List noBottomScroll">
          {users.map((user) => (
            <UserDataElement
              id={user.id}
              key={user.id}
              nickname={user.nickname}
              email={user.email}
            />
          ))}
        </div>
      )}
    </>
  );
}

// <animated.div
//       ref={messagesRef}
//       scrollTop={spring.scrollTop}
//       className="customScroll container-fluid d-flex flex-column"
//     >
//       {users.map((user) => (
//         <UserDataElement
//           id={user.id}
//           key={user.id}
//           nickname={user.nickname}
//           email={user.email}
//         />
//       ))}
//     </animated.div>

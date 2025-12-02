import { animated, useTransition } from '@react-spring/web';
import '../css/SignUpSection.css';

import { useState } from 'react';
import brightLogo from '../img/brightLogo.svg';
import exit from '../img/exit.svg';
import checkUnique from '../logic/checkUnique';
import {
  setIsLogged,
  setIsProfile,
  setIsSignUp,
  setLoggedEmail,
  setLoggedNickname,
  setUserId,
} from '../states/Slice';
import { useAppDispatch, useAppSelector } from '../states/Store';
import FollowingEyes from './Eyes';
import InfoInput from './Inputs';
import privateEyes from '../img/privateEyes.svg';
import axios from 'axios';
import { PCHost } from '../../hostingAdress';
import ProfileMessages from './ProfileMessages';
import UserData from './UserData';
import { EditUserDataElement } from './editUserDataFields';
import AdminUsers from './adminUsersList';

interface signUpInput {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Profile() {
  const isProfile = useAppSelector((state) => state.app.isProfile);
  const role = useAppSelector((state) => state.app.role);
  const dispatch = useAppDispatch();
  const [isToEdit, setIsToEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleEdit = () => {
    setIsToEdit(true);
  };
  //   const handleChange = (e: any) => {
  //     const { name, value } = e.target;
  //     setSignUpInput({
  //       ...signUpInput,
  //       [name]: value,
  //     } as signUpInput);
  //   };

  const transitions = useTransition(isProfile, {
    from: {
      transform: 'translateY(100%)',
    },
    enter: {
      transform: 'translateY(0%)',
    },
    leave: {
      transform: 'translateY(100%)',
    },
    onDestroyed: () => {
      setIsLoaded(false);
    },
    onRest: () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    },
    config: {
      tension: 450,
      friction: 70,
      precision: 0.0001,
    },
  });

  return transitions((style, item) =>
    item ? (
      <animated.div className="Profile width100 customScroll" style={style}>
        <div className="rowify spaceBetween  headerSignUp width100">
          <div className="rowify">
            <img className="logo" src={brightLogo}></img>
            <div className="p36 seldomFont centerTitle">
              Your own <br></br> profile
            </div>
          </div>

          <img
            className="exit"
            src={exit}
            onClick={() => {
              dispatch(setIsProfile(false));
            }}
          ></img>
        </div>

        {isLoaded && isProfile && (
          <>
            {role == 'user' &&
              (isToEdit ? (
                <EditUserDataElement setIsToEdit={setIsToEdit} />
              ) : (
                <UserData handleEdit={handleEdit} />
              ))}
            {role === 'admin' && <AdminUsers />}
            <ProfileMessages />
          </>
        )}
      </animated.div>
    ) : null
  );
}

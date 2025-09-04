import { animated, useTransition } from '@react-spring/web';
import '../css/SignUpSection.css';

import { useState } from 'react';
import brightLogo from '../img/brightLogo.svg';
import exit from '../img/exit.svg';
import checkUnique from '../logic/checkUnique';
import {
  setIsLogged,
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

interface signUpInput {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function SignUpSection() {
  const isSignUp = useAppSelector((state) => state.app.isSignUp);
  const dispatch = useAppDispatch();

  const [signUpInput, setSignUpInput] = useState<signUpInput>({
    nickname: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [signUpSectionMessage, setSignUpSectionMessage] = useState('\u00A0');
  const [isUniqueNickname, setIsUniqueNickname] = useState<boolean>(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);

  const [isPrivateEyes, setIsPrivateEyes] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpInput({
      ...signUpInput,
      [name]: value,
    } as signUpInput);
  };

  function checkEmailInput(email: string): boolean {
    const dogPosition = email.indexOf('@');
    if (dogPosition === -1) {
      return false;
    } else {
      if (dogPosition - 1 >= 0 && dogPosition + 1 <= email.length - 1) {
        return true;
      } else {
        return false;
      }
    }
  }
  const handleChangeUnique = (e: any, setState: any) => {
    const { value } = e.target;
    handleChange(e);
    if (value !== '') {
      checkUnique(e.target, setState);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      signUpInput.password === signUpInput.repeatPassword &&
      isUniqueNickname === true &&
      isUniqueEmail === true &&
      signUpInput.email !== '' &&
      signUpInput.nickname !== '' &&
      signUpInput.email.indexOf('@') !== -1 &&
      checkEmailInput(signUpInput.email) &&
      signUpInput.password !== '' &&
      signUpInput.repeatPassword !== ''
    ) {
      await axios
        .post(PCHost + '/register', signUpInput, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          dispatch(setIsLogged({ data: true }));
          dispatch(setUserId({ data: response.data.user.id }));
          dispatch(setLoggedNickname({ data: response.data.user.nickname }));
          dispatch(setLoggedEmail({ data: response.data.user.email }));
          dispatch(setIsSignUp({ data: false }));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setSignUpSectionMessage("input data aren't correct");
    }
  };

  const transitions = useTransition(isSignUp, {
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
      setSignUpInput({
        nickname: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
      setSignUpSectionMessage('\u00A0');
      setIsUniqueNickname(false);
      setIsUniqueEmail(false);
      setIsPrivateEyes(false);
    },
    config: {
      tension: 450,
      friction: 70,
      precision: 0.0001,
    },
  });

  return transitions((style, item) =>
    item ? (
      <animated.form className="signUp" style={style}>
        <div className="rowify spaceBetween width100 headerSignUp">
          <div className="rowify">
            <img className="logo" src={brightLogo}></img>
            <div className="p36 seldomFont centerTitle">
              who are you? <br></br> we’ll keep it a secret
            </div>
          </div>

          <img
            className="exit"
            src={exit}
            onClick={() => {
              dispatch(setIsSignUp(false));
            }}
          ></img>
        </div>
        {isPrivateEyes ? (
          <img className="privateEyes" src={privateEyes}></img>
        ) : (
          <FollowingEyes />
        )}
        <div className="inputSection">
          <InfoInput
            placeholder="nickname"
            maxlength={32}
            message={
              signUpInput.nickname === ''
                ? '\u00A0'
                : signUpInput.nickname +
                  (isUniqueNickname ? '  is free' : ' already exists')
            }
            Change={(e) => {
              handleChangeUnique(e, setIsUniqueNickname);
            }}
          />
          <InfoInput
            placeholder="email"
            maxlength={256}
            type="email"
            message={
              signUpInput.email === ''
                ? '\u00A0'
                : signUpInput.email +
                  (isUniqueEmail ? '  is free' : ' already exists')
            }
            Change={(e) => {
              handleChangeUnique(e, setIsUniqueEmail);
            }}
          />
          <InfoInput
            placeholder="password"
            maxlength={22}
            type="password"
            message={'\u00A0'}
            Change={(e) => {
              handleChange(e);
            }}
            onFocus={() => {
              setIsPrivateEyes(true);
            }}
            onBlur={() => {
              setIsPrivateEyes(false);
            }}
          />
          <InfoInput
            placeholder="repeat password"
            name="repeatPassword"
            maxlength={22}
            type="password"
            message={
              signUpInput.repeatPassword === '' ||
              signUpInput.password === signUpInput.repeatPassword
                ? '\u00A0'
                : "passwords don't match"
            }
            Change={(e) => {
              handleChange(e);
            }}
            onFocus={() => {
              setIsPrivateEyes(true);
            }}
            onBlur={() => {
              setIsPrivateEyes(false);
            }}
          />
        </div>
        <div className="p64 tekturFont">{signUpSectionMessage}</div>
        <div className="p96 seldomFont submitButton" onClick={handleSubmit}>
          Sign Up
        </div>
      </animated.form>
    ) : null
  );
}

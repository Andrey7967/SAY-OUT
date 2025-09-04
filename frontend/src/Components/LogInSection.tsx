import { animated, useTransition } from '@react-spring/web';
import '../css/SignUpSection.css';

import axios from 'axios';
import { EventHandler, useState } from 'react';
import brightLogo from '../img/brightLogo.svg';
import exit from '../img/exit.svg';
import privateEyes from '../img/privateEyes.svg';
import {
  setIsLogged,
  setIsLogIn,
  setLoggedEmail,
  setLoggedNickname,
  setUserId,
} from '../states/Slice';
import { useAppDispatch, useAppSelector } from '../states/Store';
import FollowingEyes from './Eyes';
import InfoInput from './Inputs';
import { PCHost } from '../../hostingAdress';

interface LogInInput {
  email: string;
  password: string;
}
export default function LogInSection() {
  const isLogIn = useAppSelector((state) => state.app.isLogIn);
  const loggedEmail = useAppSelector((state) => state.app.loggedEmail);
  const dispatch = useAppDispatch();
  const [logMessage, setLogMessage] = useState<string>('\u00A0');
  const [logInInput, setLogInInput] = useState<LogInInput>({
    email: '',
    password: '',
  });
  const [isPrivateEyes, setIsPrivateEyes] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInInput({
      ...logInInput,
      [name]: value,
    } as LogInInput);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (logInInput.email === loggedEmail) {
      setLogMessage("you're already here");
    } else if (logInInput.email !== '' && logInInput.password !== '') {
      await axios
        .post('http://' + PCHost + ':3001/login', logInInput, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setLogMessage('');
          dispatch(setIsLogIn({ data: false }));

          dispatch(setIsLogged({ data: response.data.user.isLogged }));
          dispatch(setLoggedNickname({ data: response.data.user.nickname }));
          dispatch(setLoggedEmail({ data: response.data.user.email }));

          dispatch(setUserId({ data: response.data.user.id }));
        })
        .catch((error) => {
          setLogMessage(error.response.data.error);
          console.error('Error:', error.response.data);
        });
    } else {
      setLogMessage('input data is incorrect');
    }
  };

  const transitions = useTransition(isLogIn, {
    from: {
      transform: 'translateY(100%)',
    },
    enter: {
      transform: 'translateY(0%)',
    },
    leave: {
      transform: 'translateY(100%)',
    },
    onDestroyed(item, key) {
      setLogInInput({ email: '', password: '' });
      setLogMessage('\u00A0');
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
              dispatch(setIsLogIn(false));
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
            placeholder="email"
            maxlength={256}
            type="email"
            message={'\u00A0'}
            Change={(e) => {
              handleChange(e);
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
        </div>
        <div className="p64 tekturFont">{logMessage}</div>
        <div className="p96 seldomFont submitButton" onClick={handleSubmit}>
          Log In
        </div>
      </animated.form>
    ) : null
  );
}

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

interface signUpInput {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Profile() {
  const isProfile = useAppSelector((state) => state.app.isProfile);
  const dispatch = useAppDispatch();

  

  const [signUpSectionMessage, setSignUpSectionMessage] = useState('\u00A0');
  const [isUniqueNickname, setIsUniqueNickname] = useState<boolean>(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);



//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setSignUpInput({
//       ...signUpInput,
//       [name]: value,
//     } as signUpInput);
//   };

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
//   const handleChangeUnique = (e: any, setState: any) => {
//     const { value } = e.target;
//     handleChange(e);
//     if (value !== '') {
//       checkUnique(e.target, setState);
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (
//       signUpInput.password === signUpInput.repeatPassword &&
//       isUniqueNickname === true &&
//       isUniqueEmail === true &&
//       signUpInput.email !== '' &&
//       signUpInput.nickname !== '' &&
//       signUpInput.email.indexOf('@') !== -1 &&
//       checkEmailInput(signUpInput.email) &&
//       signUpInput.password !== '' &&
//       signUpInput.repeatPassword !== ''
//     ) {
//       await axios
//         .post(PCHost + '/register', signUpInput, {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           dispatch(setIsLogged({ data: true }));
//           dispatch(setUserId({ data: response.data.user.id }));
//           dispatch(setLoggedNickname({ data: response.data.user.nickname }));
//           dispatch(setLoggedEmail({ data: response.data.user.email }));
//           dispatch(setIsSignUp({ data: false }));
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     } else {
//       setSignUpSectionMessage("input data aren't correct");
//     }
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
    // onDestroyed: () => {
    //   setSignUpInput({
    //     nickname: '',
    //     email: '',
    //     password: '',
    //     repeatPassword: '',
    //   });
    //   setSignUpSectionMessage('\u00A0');
    //   setIsUniqueNickname(false);
    //   setIsUniqueEmail(false);
    //   setIsPrivateEyes(false);
    // },
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
       
        <ProfileMessages/>
      </animated.form>
    ) : null
  );
}

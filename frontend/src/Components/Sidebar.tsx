import { animated, useSpring } from '@react-spring/web';
import '../css/Sidebar.css';

import skyLogo from '../img/skyLogo.svg';
import ButtonForDark from './buttonForDarkBlue';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { setIsLogged, setIsLogIn, setIsSignUp } from '../states/Slice';
import useLogOut from '../hooks/useLogOut';

export default function Sidebar() {
  const isLogged = useAppSelector((state) => state.app.isLogged);
  const loggedNickname = useAppSelector((state) => state.app.loggedNickname);
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<Boolean>(false);

  const [spring, api] = useSpring(() => ({
    config: {
      tension: 450,
      friction: 70,
      precision: 0.0001,
    },
  }));

  return (
    <animated.div className="sidebar" style={{ ...spring }}>
      <div className="sidebar-real">
        <div className="rowify sidebarTitle">
          <img className="  logo " src={skyLogo}></img>
          {isLogged && (
            <div className=" rebringText p64  centerTitle tekturFont greeting ">
              Hi {loggedNickname}!
            </div>
          )}
        </div>
        <div
          className="sidebarToggle"
          onClick={() => {
            api.start({
              from: {
                transform: toggle ? 'translateX(0%)' : 'translateX(-100%)',
              },
              to: {
                transform: !toggle ? 'translateX(0%)' : 'translateX(-100%)',
              },
            });
            setToggle(!toggle);
          }}
        ></div>
        <div className="stripes">
          <hr className="stripe"></hr>
          <hr className="stripe"></hr>
          <hr className="stripe"></hr>
        </div>
        <div className="sidebar-tongue"> </div>
        <div className="buttonSection">
          <ButtonForDark
            content={'Sign Up'}
            handleClick={() => {
              dispatch(setIsSignUp({ data: true }));
              dispatch(setIsLogIn(false));
              setToggle(false);
              api.start({
                from: {
                  transform: toggle ? 'translateX(0%)' : 'translateX(-100%)',
                },
                to: {
                  transform: !toggle ? 'translateX(0%)' : 'translateX(-100%)',
                },
              });
            }}
          />
          <ButtonForDark
            content={'Log In'}
            handleClick={() => {
              dispatch(setIsLogIn({ data: true }));
              dispatch(setIsSignUp({ data: false }));
              setToggle(false);
              api.start({
                from: {
                  transform: toggle ? 'translateX(0%)' : 'translateX(-100%)',
                },
                to: {
                  transform: !toggle ? 'translateX(0%)' : 'translateX(-100%)',
                },
              });
            }}
          />
          {isLogged && (
            <ButtonForDark
              content={'Log Out'}
              handleClick={() => {
                useLogOut().then((data) => {
                  dispatch(setIsLogged(data));
                });
              }}
            />
          )}
        </div>
      </div>
    </animated.div>
  );
}

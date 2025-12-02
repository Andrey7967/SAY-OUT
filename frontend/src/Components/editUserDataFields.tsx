import { EventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../states/Store';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { PCHost } from '../../hostingAdress';
import checkUnique from '../logic/checkUnique';

import axios from 'axios';
import { useEffect } from 'react';
import { toogleUpdateUserData } from '../states/Slice';

export function EditUserDataElement({ setIsToEdit }) {
  const editName = useAppSelector((state) => state.app.loggedNickname);
  const editEmail = useAppSelector((state) => state.app.loggedEmail);
  const dispatch = useAppDispatch();
  const [signUpSectionMessage, setSignUpSectionMessage] = useState('\u00A0');
  const [isUniqueNickname, setIsUniqueNickname] = useState<boolean>(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState<boolean>(false);
  const [profileEdit, setProfileEdit] = useState({
    nickname: editName,
    email: editEmail,
  });
  useEffect(() => {
    setProfileEdit({
      nickname: editName,
      email: editEmail,
    });
  }, [editName, editEmail]);

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
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfileEdit({
      ...profileEdit,
      [name]: value,
    });
  };
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
      (isUniqueNickname === true || profileEdit.nickname === editName) &&
      (isUniqueEmail === true || profileEdit.email === editEmail) &&
      profileEdit.email !== '' &&
      profileEdit.nickname !== '' &&
      profileEdit.email.indexOf('@') !== -1 &&
      checkEmailInput(profileEdit.email)
    ) {
      await axios
        .put(
          PCHost + '/editProfileData',
          { EditEmail: profileEdit.email, EditNickname: profileEdit.nickname },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          dispatch(toogleUpdateUserData());
          dispatch(setIsToEdit());
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setSignUpSectionMessage("input data aren't correct");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p64">
      <div className="mb-3 p64">
        <label htmlFor="editName" className="form-label text-primary p64">
          Nickname
        </label>
        <input
          name="nickname"
          type="text"
          className="form-control p64"
          id="editName"
          value={profileEdit.nickname}
          onChange={(e) => handleChangeUnique(e, setIsUniqueNickname)}
        />

        <label className="form-label text-primary p64">
          {profileEdit.nickname === ''
            ? '\u00A0'
            : profileEdit.nickname +
              (isUniqueNickname ? '  is free' : ' is already exists')}
        </label>
      </div>

      {/* Поле для Почты */}
      <div className="mb-3">
        <label htmlFor="editEmail" className="form-label text-primary">
          email
        </label>
        <input
          name="email"
          type="email"
          className="form-control p64"
          id="editEmail"
          value={profileEdit.email}
          onChange={(e) => handleChangeUnique(e, setIsUniqueEmail)}
        />
        <label className="form-label text-primary p64">
          {profileEdit.email === ''
            ? '\u00A0'
            : profileEdit.email +
              (isUniqueEmail ? '  is free' : ' is already exists')}
        </label>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary p64">
          send data
        </button>
      </div>
    </form>
  );
}

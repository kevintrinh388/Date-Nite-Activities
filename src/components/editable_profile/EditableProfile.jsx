import React, { useState, useEffect } from 'react';
import { InfoCircleFill } from 'react-bootstrap-icons';
import log from 'loglevel';
import {
  AUTH_TYPE_KEY, EMAIL_KEY, IMAGE_KEY, NAME_KEY, PROFILE_KEY, VERIFIED_KEY,
} from '../../constants/AuthConstants';
import showToast, { TOAST_ERROR, TOAST_SUCCESS } from '../../utils/toastHelper';
import LogoutButton from '../auth/LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditableProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isAuthTypeGoogle, setAuthType] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    try {
      let currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      setUsername(currentUserProfile[NAME_KEY]);
      setEmail(currentUserProfile[EMAIL_KEY]);
      setProfilePicture(currentUserProfile[IMAGE_KEY]);
      setAuthType(currentUserProfile[AUTH_TYPE_KEY]);
      setVerified(currentUserProfile[VERIFIED_KEY]);

      fetch('/get_user', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          currentUserProfile[EMAIL_KEY],
        ),
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
            currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
            setUsername(currentUserProfile[NAME_KEY]);
            setVerified(currentUserProfile[VERIFIED_KEY]);
          });
        }
      });
    } catch (e) {
      log.info('There was a problem retrieving the user profile');
    }
  }, []);

  const onUsernameChange = (e) => {
    setUsername(e.target?.value);
  };

  const saveProfile = () => {
    try {
      const user = {
        email, newUsername: username,
      };
      fetch('/update_user', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          user,
        ),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
          });
          showToast('Successfully saved user profile!', TOAST_SUCCESS);
        } else {
          showToast('There was a problem saving the user profile', TOAST_ERROR);
        }
      });
    } catch (e) {
      log.error('There was a problem saving the user profile');
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" alt="profilePicture" width="150px" src={profilePicture} />
            <span className="font-weight-bold">{username}</span>
            <span className="font-weight-bold">{email}</span>
            { verified ? null : (
              <span className="text-black-50">
                <InfoCircleFill color="red" />
                &nbsp;This account is not verified yet
              </span>
            )}
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <label className="labels" htmlFor="name">
                Username
                <input id="name" type="text" className="form-control" placeholder={username} onChange={onUsernameChange} readOnly={isAuthTypeGoogle} />
              </label>
            </div>
            <div className="row mt-3">
              <label className="labels" htmlFor="email">
                Email
                <input id="email" type="text" className="form-control" placeholder={email} readOnly />
              </label>
            </div>
            <div className="mt-5 text-center">
              { isAuthTypeGoogle ? null : <button className="btn btn-primary profile-button" type="button" onClick={saveProfile}>Save Profile</button> }
            </div>
            <div className="mt-5 text-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditableProfile;

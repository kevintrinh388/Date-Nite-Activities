import React, { useState, useEffect } from 'react';
import log from 'loglevel';
import {
  EMAIL_KEY, IMAGE_KEY, NAME_KEY, PROFILE_KEY,
} from '../../constants/AuthConstants';
import LogoutButton from '../auth/LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditableProfile() {
  const [isAuthTypeGoogle, setAuthType] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    try {
      const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      setAuthType(true);
      setName(currentUserProfile[NAME_KEY]);
      setEmail(currentUserProfile[EMAIL_KEY]);
      setProfilePicture(currentUserProfile[IMAGE_KEY]);
    } catch (e) {
      log.info('Handle DB profile for user');
    }
  }, []);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" alt="profilePicture" width="150px" src={profilePicture} />
            <span className="font-weight-bold">{name}</span>
            <span className="text-black-50">{email}</span>
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
                Name
                <input id="name" type="text" className="form-control" placeholder={name} value="" readOnly={isAuthTypeGoogle} />
              </label>
            </div>
            <div className="row mt-3">
              <label className="labels" htmlFor="email">
                Email
                <input id="email" type="text" className="form-control" placeholder={email} value="" readOnly={isAuthTypeGoogle} />
              </label>
            </div>
            <div className="mt-5 text-center">
              { isAuthTypeGoogle ? null : <button className="btn btn-primary profile-button" type="button">Save Profile</button> }
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

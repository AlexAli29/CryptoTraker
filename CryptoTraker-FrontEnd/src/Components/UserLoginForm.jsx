import React from 'react';
import LoginButton from './UI/LoginButton';
import lf from "../Styles/css/loginform.module.css";
import { NavLink } from 'react-router-dom';

const UserLoginForm = ({ children, action }) => {
  return (
    <div className={lf.login}>
      <div className={lf.login__header}><h1>Crypto-Track.com</h1></div>
      <div className={lf.login__form}>
        <div className={lf.login__form__header}>
          <p>{action}</p>
        </div>
        <div className={lf.login__form__content}>
          {children}
        </div>
        <div className={lf.login__form__footer}>
          <p>Not a member? <span>{<NavLink to="/register">Sign Up</NavLink>}</span> </p>
          <LoginButton>{action}</LoginButton>
        </div>
      </div>

    </div>
  );
};

export default UserLoginForm;
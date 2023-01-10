import React from 'react';
import LoginButton from './UI/LoginButton';
import lf from "../Styles/scss/loginform.module.scss";
import { NavLink } from 'react-router-dom';

const UserRegisterForm = ({ children, action }) => {
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
          <p>Have an account? <span>{<NavLink to="/login">Log In</NavLink>}</span> </p>
          <LoginButton>{action}</LoginButton>
        </div>
      </div>

      {/* login
    <NavLink className={loginform.login} to="/main">Main</NavLink> */}
    </div>
  );
};

export default UserRegisterForm;
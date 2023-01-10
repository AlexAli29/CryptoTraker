import React from 'react';
import cl from "../../Styles/scss/loginbutton.module.scss"
const LoginButton = ({ children }) => {
  return (
    <button className={cl.button}>
      {children}
    </button>
  );
};

export default LoginButton;
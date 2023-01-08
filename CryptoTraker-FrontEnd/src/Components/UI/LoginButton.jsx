import React from 'react';
import cl from "../../Styles/css/loginbutton.module.css"
const LoginButton = ({ children }) => {
  return (
    <button className={cl.button}>
      {children}
    </button>
  );
};

export default LoginButton;
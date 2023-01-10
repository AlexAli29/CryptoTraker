import React from 'react';
import cl from "../../Styles/scss/loginforminput.module.scss"

const UserFormInput = ({ label, type, ...props }) => {
  return (
    <div className={cl.txt_field}>
      <input {...props} type={type} ref={props.ref} required />
      <span></span>
      <label>{label}</label>
    </div>
  );
};

export default UserFormInput;
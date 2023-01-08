import React from 'react';
import cl from "../../Styles/css/loginforminput.module.css"

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
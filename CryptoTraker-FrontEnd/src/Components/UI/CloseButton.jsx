import React from 'react';
import closebtn from '../../Styles/css/closebutton.module.css'

const CloseButton = ({ children, ...props }) => {
  return (
    <button {...props} className={closebtn['close-btn']}>
      {children}
    </button>
  );
};

export default CloseButton;
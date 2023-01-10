import React from 'react';
import closebtn from '../../Styles/scss/closebutton.module.scss'

const CloseButton = ({ children, ...props }) => {
  return (
    <button {...props} className={closebtn['close-btn']}>
      {children}
    </button>
  );
};

export default CloseButton;
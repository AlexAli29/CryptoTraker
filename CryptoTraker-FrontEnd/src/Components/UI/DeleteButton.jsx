import React from 'react';


const DeleteButton = ({ children, ...props }) => {
  return (
    <button {...props} className={props.className}>
      {children}
    </button >
  );
};

export default DeleteButton;
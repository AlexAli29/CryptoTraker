import React from 'react';


const AddButton = ({ children, ...props }) => {
  return (
    <button {...props} className={props.className}>
      {children}
    </button >
  );
};

export default AddButton;
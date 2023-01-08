import React from 'react';


const SetCurrencyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={props.className}>
      {children}
    </button >
  );
};

export default SetCurrencyButton;
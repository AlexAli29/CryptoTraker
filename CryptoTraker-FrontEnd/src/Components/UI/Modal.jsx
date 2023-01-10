import React from 'react';
import mdl from '../../Styles/scss/modal.module.scss'
import CloseButton from './CloseButton';
const Modal = ({ children, active, setActive, title }) => {

  const rootClasses = [mdl.modal]

  if (active) {
    rootClasses.push(mdl.active);
  }


  return (
    <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
      <div className={mdl['modal__content']} onClick={e => e.stopPropagation()}>
        <div className={mdl['modal__content__header']}>
          <div className={mdl['modal__content__header__start']}></div>
          <div className={mdl['modal__content__header__middle']}>{title}</div>
          <div className={mdl['modal__content__header__end']}><CloseButton onClick={() => setActive(false)}>x</CloseButton>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
import React from 'react';
import crbtn from '../../Styles/css/currencybutton.module.css'
const CurrencyButton = ({ currentCurrency, currency, ...props }) => {

  const rootClasses = [crbtn.currencyButton]

  if (currentCurrency === currency) {
    rootClasses.push(crbtn.active);
  }

  return (
    <button {...props} className={rootClasses.join(' ')}>
      <img className={crbtn['currency-img']} src={require(`../../assets/img/currency-images/${currency}.png`)}></img>
      {currency}
    </button>
  );
};

export default CurrencyButton;
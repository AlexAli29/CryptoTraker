import React from 'react';
import crgr from '../Styles/css/currencygrid.module.css'
import CurrencyButton from './UI/CurrencyButton';
import { useState } from 'react';

const CurrencyGrid = ({ currencies, setCurrency, setActive, currentCurrency }) => {

  return (
    <div className={crgr["currency-grid"]}>
      {currencies.map((currency) => (
        <CurrencyButton onClick={() => {
          setCurrency(currency);
          setActive(false);
        }}
          key={currency} currency={currency} currentCurrency={currentCurrency} />
      ))}
    </div>
  );
};

export default CurrencyGrid;
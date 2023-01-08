import React from "react";
import CoinsGrid from "../Components/CoinsGrid";
import Header from "../Components/Header";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCoins } from "../hooks/useCoins.js";
import Modal from "../Components/UI/Modal";
import CurrencyGrid from "../Components/CurrencyGrid";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { selectCurrentUser } from "../features/user/userSlice";

function Main() {

  const user = useSelector(selectCurrentUser);

  const [modalActive, setModalActive] = useState(false);
  const [currencies, setCurrencies] = useState(['USD', 'EUR', 'RUB', 'GBP', 'CNY', 'JPY']);
  const [currentCurrency, setCurrentCurrency] = useState('USD')
 
  const coins = useCoins(user.coins, currentCurrency);

  return (
    <div className="App">
      <Header />
      <CoinsGrid coins={coins} setActive={setModalActive} currentCurrency={currentCurrency} />
      <Modal active={modalActive} setActive={setModalActive} title="Choose currency">
        <CurrencyGrid currencies={currencies} setCurrency={setCurrentCurrency} setActive={setModalActive} currentCurrency={currentCurrency} />
      </Modal>
    </div>
  );
}

export default Main;



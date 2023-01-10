import React from "react";
import cl from "../Styles/scss/header.module.scss";
import AddButton from "./UI/AddButton";
import Search from "./UI/Search";
import clbtn from "../Styles/scss/button.module.scss";
import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";
import { useAddCoinMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/user/userSlice";
import { setCoins } from "../features/user/userSlice";

const Header = () => {
	const [coinTicker, setCoinTicker] = useState({ ticker: "" });
	const [addCoin] = useAddCoinMutation();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);


	const addNewCoin = async (e) => {
		e.preventDefault();
		const newCoinTicker = {
			ticker: coinTicker.ticker.toLocaleUpperCase(),
		};

		const { ticker } = newCoinTicker;
		const newCoinList = await addCoin({ ticker, userId: user.userId });

		dispatch(setCoins(newCoinList));
		setCoinTicker({ ticker: "" });
	};
	return (
		<header className={cl.header}>
			<div className={cl.header__box}>
				<div className={cl.header__box__upper}>
					<div className={cl.header__box__upper__start}></div>
					<div className={cl.header__box__upper__center}>
						<h1 className={cl.header__box__upper__center__title}>Crypto-Track.com</h1>
					</div>
					<div className={cl.header__box__upper__end}>
						<img className={cl.header__box__upper__end__user} src={require(`../assets/img/user-images/user (1).png`)}></img>
					</div>
				</div>
				<div className={cl["search-container"]}>
					<Search
						value={coinTicker.ticker}
						onChange={(e) =>
							setCoinTicker({ ...coinTicker, ticker: e.target.value })
						}
						type="text"
					/>
					<AddButton onClick={addNewCoin} className={clbtn["btn-add"]}>
						<BiAddToQueue />
					</AddButton>
				</div>
			</div>
		</header>
	);
};

export default Header;

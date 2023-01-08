import React from "react";
import clgrd from "../Styles/css/grid.module.css";
import GridItem from "./GridItem";
import SetCurrencyButton from "./UI/SetCurrencyButton";
import btn from "../Styles/css/button.module.css";
import { AiFillCaretDown } from "react-icons/ai";
const CoinsGrid = ({ coins, setActive, currentCurrency }) => {
	return (
		<>
			<div className={clgrd["grid-title-container"]}>
				<div className={clgrd["start"]}></div>
				<div className={clgrd["middle"]}>
					<p className={clgrd["grid-title"]}>Your coins</p>
				</div>
				<div className={clgrd["end"]}>
					<SetCurrencyButton className={btn["btn-currency"]} onClick={() => setActive(true)} >
						<img className={btn["currency-image"]} src={require(`../assets/img/currency-images/${currentCurrency}.png`)} />
						{currentCurrency}
						<AiFillCaretDown />
					</SetCurrencyButton>
				</div>

			</div>

			<div className={clgrd["grid"]}>
				{coins.map((coin) => (
					<GridItem key={coin.Name} coin={coin} />
				))}
			</div>
		</>
	);
};

export default CoinsGrid;

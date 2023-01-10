import React from "react";
import clgrd from "../Styles/scss/grid.module.scss";
import DeleteButton from "./UI/DeleteButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveCoinMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { setCoins } from "../features/user/userSlice";


const GridItem = ({ coin }) => {


	const [removeCoin] = useRemoveCoinMutation();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);

	const deleteCoin = async (ticker) => {

		const newCoinList = await removeCoin({ ticker, userId: user.userId });
		dispatch(setCoins(newCoinList));

	};

	return (
		<div className={clgrd["grid__item"]}>
			<div className={clgrd["grid__item__header"]}>
				{coin.Name}
				<div className={clgrd["grid__item__icon-container"]}>
					<img src={coin.coinIcon} alt="d" />
				</div>
			</div>
			<div className={clgrd["grid__item__coinInfo"]}>
				<span className={clgrd["grid__item__coinInfo__param"]}>Price:</span>
				{parseFloat(coin.Price.toFixed(5))}
				<span className={clgrd["grid__item__coinInfo__currencySymbol"]}>{coin.currencySymbol}</span>
			</div>
			<div className={clgrd["grid__item__coinInfo"]}>
				<span className={clgrd["grid__item__coinInfo__param"]}>24h:</span> {parseFloat(coin.Change.toFixed(6))}
				<span className={clgrd["grid__item__coinInfo__currencySymbol"]}>{coin.currencySymbol}</span>
			</div>
			<div className={clgrd["grid__item__coinInfo"]}>
				<span className={clgrd["grid__item__coinInfo__param"]}>Cap:</span> {coin.MarketCap.toFixed(0)}
				<span className={clgrd["grid__item__coinInfo__currencySymbol"]}>{coin.currencySymbol}</span>
			</div>
			<div className={clgrd["delete-btn-container"]}>
				<DeleteButton
					onClick={() => {
						deleteCoin(coin.Name)
					}}
					className={clgrd["btn-delete"]}
				>
					<RiDeleteBin6Line size='2vw' color="aliceblue" />
				</DeleteButton>
			</div>
		</div>
	);
};

export default GridItem;

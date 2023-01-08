import { useMemo } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const useCoins = (tickers, currentCurrency) => {
	const [coins, setCoins] = useState([]);

	// const currency = "USD";
	useEffect(() => {
		const tickerNames = tickers.join(",");
		debugger
		if (!tickerNames) return;

		axios
			.get(
				`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tickerNames}&tsyms=${currentCurrency}`
			)
			.then((res) => {
				//todo : validate incoming data
				const tickersList = [];
				for (const [key, value] of Object.entries(res.data.RAW)) {
					tickersList.push(
						new CoinViewModel(
							key,
							value[currentCurrency].PRICE,
							value[currentCurrency].CHANGE24HOUR,
							value[currentCurrency].MKTCAP,
							res.data.DISPLAY[key],
							currentCurrency
						)
					);
				}
				setCoins(tickersList);
			})
			.catch(console.error);
	}, [tickers, currentCurrency]);

	return coins;
	// const sortedAndSearchedPosts = useMemo(() => {
	//   return sortedPosts.filter(posts => posts.title.toLowerCase().includes(query.toLowerCase()))
	// }, [query, sortedPosts])
	// return sortedAndSearchedPosts;
};

class CoinViewModel {
	constructor(Name, Price, Change, MarketCap, Display, currentCurrency) {
		this.Name = Name;
		this.Price = Price;
		this.Change = Change;
		this.MarketCap = MarketCap;
		this.coinIcon = require(`../assets/img/icon-images/${this.Name}.png`);
		this.currencySymbol = Display[currentCurrency].TOSYMBOL;

	}
}

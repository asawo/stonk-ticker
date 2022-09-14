import { useState, useEffect } from "react";
import Stock from "./Stock";

const REFRESH_INTERVAL = 60000;

const STONKS = [
  "AAPL",
  "GOOG",
  "QQQ",
  "9201.T-JP",
  "4385.T-JP",
  "AFI-AU",
  "BTC.CB=",
  "ETH.CB=",
];

const Stonks = () => {
  const [stonks, setStonks] = useState([]);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    requestStonks();
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), REFRESH_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function requestStonks() {
    let stonkSymbolString = "";
    STONKS.forEach((symbol, i) => {
      if (i < 1) {
        stonkSymbolString += symbol;
      } else {
        stonkSymbolString += `%7C${symbol}`;
      }
    });

    try {
      const response = await fetch(
        `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=${stonkSymbolString}&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1`
      );
      const json = await response.json();

      setStonks(json.FormattedQuoteResult.FormattedQuote);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container">
      <table>
        <tbody>
          {stonks.map((stonk) => (
            <Stock
              key={stonk.name}
              symbol={stonk.symbol}
              name={stonk.name}
              exchange={stonk.exchange}
              countryCode={stonk.countryCode}
              currencyCode={stonk.currencyCode}
              change={stonk.change}
              change_pct={stonk.change_pct}
              last_time={stonk.last_time}
              changetype={stonk.changetype}
              last={stonk.last}
              time={time}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stonks;

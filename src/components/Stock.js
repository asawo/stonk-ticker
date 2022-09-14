import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Stock = (props) => {
  let colour = "";
  let icon = "";

  if (props.changetype === "UP") {
    colour = "hsl(113, 100%, 50%)";
    icon = "▲";
  } else if (props.changetype === "DOWN") {
    colour = "hsl(350, 100%, 50%)";
    icon = "▼";
  } else {
    colour = "hsl(0, 0%, 70%)";
    icon = "–";
  }

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <tr className="stock-detail">
      <td className="triangle" style={{ color: colour }}>
        {icon}
      </td>
      <td>
        <p className="symbol">{props.symbol}</p>
        <p className="name">
          {props.name} - {props.exchange}
        </p>
      </td>
      <td className="price" style={{ color: colour }}>
        {props.last} {props.currencyCode}
        <p className="updated">
          Updated {dayjs(props.last_time).fromNow(time)} ago
        </p>
      </td>
      <td className="change" style={{ color: colour }}>
        <p>
          {props.change} {props.currencyCode}
        </p>
        <p>{props.change_pct}</p>
      </td>
      {/* <td className="last-updated">
        Updated {dayjs(props.last_time).fromNow(time)} ago
      </td> */}
    </tr>
  );
};

export default Stock;

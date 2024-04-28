import "./history.scss";
import { useAccount } from "wagmi";

const History = () => {
  const { address } = useAccount();

  return (
    <div className="history">
      <div className="history__header">
        <h2>
          Transaction <span>History</span>
        </h2>
        <p>View your past transactions, including deposits, withdrawals, and token transfers</p>
      </div>

      <div className="history__body"></div>
    </div>
  );
};

export default History;

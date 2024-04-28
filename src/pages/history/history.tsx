import "./history.scss";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { parseAbiItem, zeroAddress } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { P2P_CONTRACT_ADDRESS, WNGN_CONTRACT_ADDRESS } from "components/app/contracts/data";

const History = () => {
  const { address } = useAccount();
  const client = usePublicClient();
  const [isFetching, setIsFetching] = useState(false);
  const [history, setHistory] = useState([]);

  //   useEffect(() => {
  //     setIsFetching(true);
  //     client
  //       .getLogs({
  //         event: parseAbiItem("event Transfer(address indexed, address indexed, uint256)"),
  //         address: WNGN_CONTRACT_ADDRESS,
  //         fromBlock: 4117692n,
  //         toBlock: 4117692n + 1000n,
  //         args: {
  //           to: [address, zeroAddress],
  //           from: [zeroAddress, address as `0x${string}`],
  //         },
  //       })
  //       .then((result) => setHistory(result))
  //       .catch((err) => toast.error(`rpc error: ${err.details}`));

  //     setIsFetching(false);
  //   }, []);

  return (
    <div className="history">
      <div className="history__header">
        <h2>
          Transaction <span>History</span>
        </h2>
        <p>View your past transactions, including deposits, withdrawals, and peer-to-peer activity</p>
      </div>

      {/* <div className="history__body">
        {isFetching ? (
          <p>No transactions found. Try making a deposit and check again</p>
        ) : (
          history.map((el) => <div>{el}</div>)
        )}
      </div> */}
    </div>
  );
};

export default History;

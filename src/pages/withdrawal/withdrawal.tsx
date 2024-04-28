import "./withdrawal.scss";

import { useState } from "react";
import { Dna } from "lucide-react";
import { parseUnits, formatUnits } from "viem";
import toast from "react-hot-toast";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { ArrowFatLineUp } from "@phosphor-icons/react";
import { P2PExchangeAbi, WNGNAbi } from "components/app/contracts/abis";
import { P2P_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, WNGN_CONTRACT_ADDRESS } from "components/app/contracts/data";
import { ClipLoader } from "react-spinners";

const Withdrawal = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { data: balance, isPending } = useReadContract({
    address: WNGN_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    abi: WNGNAbi,
  });

  const withdraw = async () => {
    if (!amount) return;
    setLoading(true);

    try {
      const tx_hash = await writeContractAsync({
        abi: WNGNAbi,
        functionName: "burn",
        args: [parseUnits(amount, 6)],
        address: WNGN_CONTRACT_ADDRESS,
      });

      toast.success(`Withdrawing ${amount} WNGN. Fiat will be sent to your bank after confirmation.`, {
        duration: 5000,
      });
      console.log(tx_hash);
    } catch (error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdrawal">
      <div className="withdrawal__header">
        <h2>
          Withdraw your <span>WNGN</span> to naira
        </h2>
        <p>Move your WNGN to your bank account</p>
      </div>

      <div className="withdrawal__body">
        <div className="withdrawal-input">
          <div className="wngn-icon">
            <Dna size={20} />
          </div>

          <div className="withdrawal-input__block">
            <input
              min={0}
              type="number"
              value={amount}
              placeholder="Amount to withdraw"
              onChange={(e) => setAmount(e.target.value)}
            />
            <p>Balance: {isPending ? "loading..." : `${formatUnits(balance as bigint, 6).toString()} WNGN`}</p>
          </div>

          <button className="max-btn" onClick={() => setAmount(formatUnits(balance as bigint, 6).toString())}>
            Max
          </button>
        </div>

        <div
          className={`withdrawal-btn ${loading ? "disabled" : ""}`}
          onClick={() => {
            withdraw();
          }}
        >
          <ArrowFatLineUp size={18} />
          <p>Withdraw</p>

          {loading && (
            <div className="c-spinner">
              <ClipLoader size={16} color={"#000"} loading={loading} aria-label="Loading Spinner" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;

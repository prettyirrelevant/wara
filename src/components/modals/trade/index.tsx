import "./trade.scss";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Swap } from "@phosphor-icons/react";

import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";
import { useApp, useModal } from "contexts";
import { P2PExchangeAbi, WNGNAbi } from "components/app/contracts/abis";
import { P2P_CONTRACT_ADDRESS, WNGN_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "components/app/contracts/data";

const TradeAdModal = () => {
  const [qty, setQty] = useState("1");
  const [loading, setLoading] = useState(false);

  const { getAdId, refetchData } = useApp();
  const { advert, closeModal } = useModal();

  const { writeContractAsync } = useWriteContract({});

  const createAd = async () => {
    if (Number(qty) > advert?.quantity || Number(qty) <= 0 || isNaN(Number(qty))) {
      alert("Invalid quantity");
      return;
    }

    setLoading(true);

    try {
      if (advert?.adTypeDisplay === "Buy") {
        await writeContractAsync({
          abi: erc20Abi,
          functionName: "approve",
          address: USDC_CONTRACT_ADDRESS,
          args: [
            P2P_CONTRACT_ADDRESS,
            BigInt(
              Number(10) * //replace with qty
                Math.pow(10, 6),
            ),
          ],
        });

        await writeContractAsync({
          abi: P2PExchangeAbi,
          address: P2P_CONTRACT_ADDRESS,
          functionName: "executeAd",
          args: [getAdId(advert?.validUntil), Number(qty) * Math.pow(10, 6)],
        });
      } else {
        await writeContractAsync({
          abi: WNGNAbi,
          functionName: "approve",
          address: WNGN_CONTRACT_ADDRESS,
          args: [
            P2P_CONTRACT_ADDRESS,
            BigInt(
              Number(10) * //replace with qty
                Math.pow(10, 6),
            ),
          ],
        });

        await writeContractAsync({
          abi: P2PExchangeAbi,
          address: P2P_CONTRACT_ADDRESS,
          functionName: "executeAd",
          args: [getAdId(advert?.validUntil), Number(qty) * Math.pow(10, 6)],
        });
      }

      await refetchData();

      alert("Transaction processing ...");
      closeModal();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="base-modal">
      <div className="base-modal__header">
        <div className="base-modal__header-block">
          <h2>{advert?.adTypeDisplay} USDC</h2>
          <p>{advert?.adTypeDisplay === "Sell" ? "Trade your USDC for NGN" : "Trade your NGN for USDC"}</p>
        </div>
      </div>

      <div className="base-modal__body">
        <div className="currencies">
          <div className="currency base-currency">
            <p className="currency-header">Price</p>
            <p className="currency-header">{advert?.price}</p>
          </div>

          <div className="currency quote-currency">
            <p className="currency-header">Available Unit</p>
            <p className="currency-header">{advert?.quantity}</p>
          </div>
        </div>

        <div className="base-input">
          <div className="base-input__block">
            <input min={0} value={qty} type="number" placeholder="Amount" onChange={(e) => setQty(e.target.value)} />
          </div>
        </div>
      </div>

      <div
        className={`base-btn ${loading ? "disabled" : ""}`}
        onClick={() => {
          if (loading) return;
          createAd();
        }}
      >
        <Swap size={18} weight="bold" />
        <p>{advert?.adTypeDisplay} USDC</p>

        {loading && (
          <div className="c-spinner">
            <ClipLoader size={16} color={"#000"} loading={loading} aria-label="Loading Spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeAdModal;

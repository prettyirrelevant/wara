import "./create-ad.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import useAppMenu from "hooks/useMenu";
import { ClipLoader } from "react-spinners";
import { CaretDown, Plus } from "@phosphor-icons/react";

import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";
import { useApp, useModal } from "contexts";
import { P2PExchangeAbi, WNGNAbi } from "components/app/contracts/abis";
import { P2P_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, WNGN_CONTRACT_ADDRESS } from "components/app/contracts/data";

const CreateAdModal = () => {
  const { refetchData } = useApp();
  const { closeModal } = useModal();
  const [qty, setQty] = useState("10");
  const [price, setPrice] = useState("1239.18");
  const [adtype, setAdtype] = useState("buy");

  const [loading, setLoading] = useState(false);
  const [TokenMenu, selectedToken] = useAppMenu("usdc", ["usdt", "usdc"], () => {}, true, true);

  // Generate a savings contract from the factory
  const { writeContractAsync } = useWriteContract({});

  const createAd = async () => {
    if (!qty || !price) return;
    setLoading(true);

    try {
      if (adtype === "buy") {
        await writeContractAsync({
          abi: WNGNAbi,
          functionName: "approve",
          address: WNGN_CONTRACT_ADDRESS,
          args: [P2P_CONTRACT_ADDRESS, BigInt(Number(qty) * Math.pow(10, 6))],
        });

        await writeContractAsync({
          abi: P2PExchangeAbi,
          address: P2P_CONTRACT_ADDRESS,
          functionName: "createAd",
          args: [
            192145,
            0,
            USDC_CONTRACT_ADDRESS,
            Number(qty) * Math.pow(10, 6),
            new Date().setMinutes(new Date().getMinutes() + 15),
          ],
        });
      } else {
        await writeContractAsync({
          abi: erc20Abi,
          functionName: "approve",
          address: USDC_CONTRACT_ADDRESS,
          args: [P2P_CONTRACT_ADDRESS, BigInt(Number(qty) * Math.pow(10, 6))],
        });

        await writeContractAsync({
          abi: P2PExchangeAbi,
          address: P2P_CONTRACT_ADDRESS,
          functionName: "createAd",
          args: [
            192145,
            1,
            USDC_CONTRACT_ADDRESS,
            Number(qty) * Math.pow(10, 6),
            new Date().setMinutes(new Date().getMinutes() + 15),
          ],
        });
      }

      await refetchData();
      toast.success(`${adtype.toUpperCase()} advert created successfully.`);
      closeModal();
    } catch (e) {
      console.log(e);
      toast.error(`Unable to create ad due to: ${JSON.stringify(e).substring(0, 100)}...`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="base-modal">
      <div className="base-modal__header">
        <div className="base-modal__header-block">
          <h2>New Advert</h2>
          <p>Create an ad to buy or sell WNGN</p>
        </div>
      </div>

      <div className="base-modal__body">
        <div className="c-toggle-btns full">
          {["Buy", "Sell"].map((item, index) => {
            return (
              <button
                key={index}
                className="c-toggle-btns__btn ad-toggle-btn"
                data-active={item.toLowerCase() === adtype ? "true" : "false"}
                data-type={item.toLowerCase()}
                onClick={() => setAdtype(item.toLowerCase())}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="currencies">
          <div className="currency base-currency">
            <p className="currency-header">Crypto</p>

            <TokenMenu>
              <div className="currency-btn base">
                <p>{selectedToken}</p>
                <CaretDown size={14} weight="bold" />
              </div>
            </TokenMenu>
          </div>

          <div className="currency quote-currency">
            <p className="currency-header">For</p>

            <div className="currency-btn">
              <p>
                <span>🇳🇬</span> NGN
              </p>
            </div>
          </div>
        </div>

        <div className="base-input">
          <div className="base-input__block">
            <input
              min={0}
              type="number"
              value={price}
              placeholder="Unit Price (NGN)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="base-input">
          <div className="base-input__block">
            <input min={0} value={qty} type="number" placeholder="Quantity" onChange={(e) => setQty(e.target.value)} />
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
        <Plus size={18} weight="bold" />
        <p>Create Ad</p>

        {loading && (
          <div className="c-spinner">
            <ClipLoader size={16} color={"#000"} loading={loading} aria-label="Loading Spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAdModal;

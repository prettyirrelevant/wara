import "./success.scss";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus } from "@phosphor-icons/react";

const SuccessModal = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [adtype, setAdtype] = useState("buy");

  return (
    <div className="base-modal">
      <div className="base-modal__header">
        <div className="base-modal__header-block">
          <h2>New Advert</h2>
          <p>Create an ad to buy or sell WNGN</p>
        </div>
      </div>

      <div className="base-modal__body"></div>

      <div className="base-btn" onClick={() => {}}>
        <Plus size={18} weight="bold" />
        <p>Create Ad</p>
      </div>
    </div>
  );
};

export default SuccessModal;

import "./topbar.scss";
import { useAccount } from "wagmi";
import { useApp, useModal } from "contexts";
import { Eye, GasPump, Plus } from "@phosphor-icons/react";

const Topbar = () => {
  const { gasPrice } = useApp();

  const { isConnected } = useAccount();

  const { openModal } = useModal();

  return (
    <div className="c-topbar">
      <div className="c-topbar__connect">
        {/* <div className="c-button c-button--border c-button--rounded">
          Connect wallet
        </div> */}
        <w3m-account-button />
      </div>

      <div className="c-topbar__btns">
        <div
          className="gas-price c-topbar__btn"
          onClick={() => {
            openModal("create");
          }}
        >
          <Plus size={18} />
          <p>New order</p>
        </div>

        <div className="gas-price c-topbar__btn">
          <GasPump size={18} weight="fill" />
          <p>{gasPrice} GWEI</p>
        </div>

        <div className="gas-price c-topbar__btn">
          <Eye size={18} weight="bold" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

import "./p2p.scss";

import useAppMenu from "hooks/useMenu";
import P2PTable from "components/p2p/p2p-table";
import { ArrowsClockwise, Plus, StackPlus } from "@phosphor-icons/react";
import { useState } from "react";

type IAdType = "buy" | "sell";

const P2P = () => {
  const [adtype, setAdtype] = useState<IAdType>("buy");
  const [RefreshMenu, refreshOption] = useAppMenu("manual", ["manual", "every 20s", "every 1m"]);

  return (
    <div className="p2p">
      <div className="p2p__header">
        <h2>
          Buy and sell <span>NGN</span> using your favorite methods
        </h2>
        <p>We support bank transfers, mobile money, and more.</p>
      </div>

      <div className="p2p__body">
        <div className="p2p__body-header">
          <div className="c-toggle-btns">
            {["Buy", "Sell"].map((item, index) => {
              return (
                <button
                  key={index}
                  className="c-toggle-btns__btn"
                  onClick={() => setAdtype(item.toLowerCase() as IAdType)}
                  data-active={item.toLowerCase() === adtype ? "true" : "false"}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="p2p__body-header__btns">
            {/* <div
              className="refresh-btn"
              onClick={() => {
                console.log("Create");
              }}
            >
              <Plus size={14} weight="bold" />
              <p>New order</p>
            </div> */}

            <RefreshMenu>
              <div className="refresh-btn">
                <ArrowsClockwise size={14} weight="bold" />
                <p>{refreshOption}</p>
              </div>
            </RefreshMenu>
          </div>
        </div>

        <hr className="divider" />

        <P2PTable displayType={adtype} />
      </div>
    </div>
  );
};

export default P2P;

import "./settings.scss";
import { CreditCard } from "@phosphor-icons/react";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__header">
        <h2>
          Link your <span>bank account</span>
        </h2>
        <p>Add your bank account for easy deposits and withdrawals</p>
      </div>

      <div className="settings__body">
        <div className="settings__body-header">
          <div className="settings__body-header__btns">
            <div className="header-btn" onClick={() => {}}>
              <CreditCard size={18} weight="bold" />
              <p>Link account</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="linked-list">
          <div className="linked-card">
            <div className="linked-card__animation">
              <img src="./assets/images/shadergradient.gif" alt="" />
            </div>

            <div className="card-details">
              <div className="info">
                <p>Vitalik Buterin</p>
                <span className="linked-card-icon"></span>
              </div>

              <div className="info">
                <p>20******72</p>
                <p>KUDA BANK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

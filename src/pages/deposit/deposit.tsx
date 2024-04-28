import "./deposit.scss";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Dna } from "lucide-react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { usePaystackPayment } from "react-paystack";
import { ArrowFatLineDown, ArrowFatLineUp } from "@phosphor-icons/react";

const Deposit = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const onSuccess = (reference: any) => {
    setLoading(false);
    toast.success(`${amount} NGN deposited! $WNGN will be minted and sent after confirmation.`, { duration: 5000 });
  };

  const onClose = () => {
    setLoading(false);
    toast.error("Payment modal was closed");
  };

  const initializePayment = usePaystackPayment({
    email: "johndoe@mail.com",
    amount: Number(amount) * 100,
    reference: new Date().getTime().toString(),
    publicKey: import.meta.env.VITE_PAYSTACK_CLIENT_KEY,
    metadata: {
      custom_fields: [
        {
          value: btoa(address!),
          display_name: "Address",
          variable_name: "address",
        },
      ],
    },
  });

  return (
    <div className="deposit">
      <div className="deposit__header">
        <h2>
          Deposit <span>Naira</span> to your account
        </h2>
        <p>Your deposits will be converted to wrapped naira and added to your wallet</p>
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
              placeholder="Amount to deposit"
              onChange={(e) => setAmount(e.target.value)}
            />
            <p>Balance: ~ &#8358;</p>
          </div>

          <p className="max-btn">&#8358;</p>
        </div>

        <div
          className={`withdrawal-btn ${loading ? "disabled" : ""}`}
          onClick={() => {
            setLoading(true);
            initializePayment({
              onSuccess,
              onClose,
            });
          }}
        >
          <ArrowFatLineDown size={18} />
          <p>Deposit</p>

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

export default Deposit;

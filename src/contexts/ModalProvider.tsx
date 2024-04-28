import Modal from "react-modal";
import { useState, ReactNode, ReactElement, createContext } from "react";

import TradeAdModal from "components/modals/trade";
import SuccessModal from "components/modals/success";
import CreateAdModal from "components/modals/create-ad";
import { IAdvert } from "./AppProvider";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Modals = "create" | "trade" | "success" | "error";

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [advert, updateAdvert] = useState<IAdvert | null>(null);
  const [activeModal, setActiveModal] = useState<Modals>("create");

  const openModal = (modal: Modals) => {
    setActiveModal(modal);
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
    advert && updateAdvert(null);
  };

  const setAdvert = (advert: any) => {
    updateAdvert(advert);
  };

  return (
    <ModalContext.Provider
      value={{
        advert,
        activeModal,

        openModal,
        setAdvert,
        closeModal,
      }}
    >
      <>
        <Modal style={customStyles} isOpen={modalStatus} onRequestClose={closeModal} bodyOpenClassName={"modal-open"}>
          {activeModal === "trade" ? (
            <TradeAdModal />
          ) : activeModal === "create" ? (
            <CreateAdModal />
          ) : activeModal === "success" ? (
            <SuccessModal />
          ) : null}
        </Modal>

        {children}
      </>
    </ModalContext.Provider>
  );
};

export default ModalProvider;

interface ModalProviderProps {
  children: ReactElement[] | ReactElement | ReactNode;
}

interface ModalContextType {
  advert: IAdvert | null;
  activeModal: string;

  setAdvert: (advert: any) => void;
  openModal: (modal: Modals) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

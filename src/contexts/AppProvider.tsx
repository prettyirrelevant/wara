import { useGasPrice, useReadContract, useReadContracts, useSignMessage } from "wagmi";
import { useMemo, ReactNode, ReactElement, createContext, useEffect } from "react";
import { formatGwei } from "viem";
import { P2PExchangeAbi } from "components/app/contracts/abis";
import { P2P_CONTRACT_ADDRESS } from "components/app/contracts/data";
import { useStorage } from "hooks/useStorage";

const AppProvider = ({ children }: AppProviderProps) => {
  const { data: gas } = useGasPrice();
  const gasPrice = useMemo(() => (gas ? Number(formatGwei(gas!, "wei")).toFixed(0).toString() : "0"), [gas]);

  const { signMessageAsync } = useSignMessage();

  const [signature, setSignature] = useStorage<string | null>("signature");

  const getSignature = async () => {
    const sig = await signMessageAsync({
      message: "Message: Welcome to Wrapped Naira!\nURI: https://wrapped-naira.vercel.app",
    });

    setSignature(sig);

    return sig;
  };

  useEffect(() => {
    if (!signature) getSignature();
  }, []);

  const { data: adCount, refetch: refetchAdCount } = useReadContract({
    abi: P2PExchangeAbi,
    functionName: "adCounter",
    address: P2P_CONTRACT_ADDRESS,
  });

  const result = useReadContracts({
    contracts: Array.from({ length: Number(adCount) }).map((_, i) => ({
      args: [i],
      abi: P2PExchangeAbi,
      functionName: "ads",
      address: P2P_CONTRACT_ADDRESS,
    })) as any,
  });

  const refetchData = async () => {
    await refetchAdCount();
    await result.refetch();
  };

  const adverts = useMemo(() => {
    const ads = result?.data?.map((ad: any) => {
      return {
        token: ad?.result?.[2],
        adType: ad?.result?.[1],
        merchant: ad?.result?.[3],
        validUntil: Number(ad?.result?.[5]),
        quantity: Number(ad?.result?.[4]) / Math.pow(10, 6),
        price: (Number(ad?.result?.[0]) ?? 0) / 100,
        adTypeDisplay:
          Number(ad?.result?.[4]) / Math.pow(10, 6) < 1 ? "Sold Out" : ad?.result?.[1] === 0 ? "Sell" : "Buy",
        adTypeText: Number(ad?.result?.[1]) === 0 ? "Buy" : "Sell",
      } as IAdvert;
    });

    return ads;
  }, [result?.data]);

  const getAdId = (timestamp: number) => {
    // get the index of the ad with the timestamp
    const id = adverts?.findIndex((ad) => {
      return ad?.validUntil === timestamp;
    });

    return id === -1 ? undefined : id;
  };

  const buyAds = useMemo(() => adverts?.filter((ad) => ad.adTypeText === "Sell") || [], [adverts]);
  const sellAds = useMemo(() => adverts?.filter((ad) => ad.adTypeText === "Buy") || [], [adverts]);

  return (
    <AppContext.Provider
      value={{
        buyAds,
        sellAds,
        gasPrice,
        signature,

        getAdId,
        refetchData,
        getSignature,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export interface IAdvert {
  adType: any;
  token: any;
  price: number;
  merchant: any;
  quantity: any;
  validUntil: any;
  adTypeText: "Buy" | "Sell";
  adTypeDisplay: "Buy" | "Sell";
}

interface AppProviderProps {
  children: ReactElement[] | ReactElement | ReactNode;
}

interface AppContextType {
  buyAds: IAdvert[];
  sellAds: IAdvert[];
  gasPrice: string;
  signature: string | null;
  refetchData: () => Promise<void>;
  getSignature: () => Promise<string>;
  getAdId: (timestamp: number) => number | undefined;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

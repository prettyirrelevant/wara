import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const metadata = {
  name: "Wrapped Naira",
  url: "https://wrapped-naira.vercel.app",
  description: "Wrapped Naira P2P Exchange",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const scrollSepoliaAnkr = defineChain({
  blockExplorers: {
    default: {
      apiUrl: "https://sepolia-blockscout.scroll.io/api",
      url: "https://sepolia-blockscout.scroll.io",
      name: "Blockscout",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9473,
    },
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/scroll_sepolia_testnet"],
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  name: "Scroll Sepolia",
  id: 534_351,
});

export const config = createConfig({
  chains: [scrollSepoliaAnkr],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Wrapped Naira" }),
    walletConnect({
      metadata,
      showQrModal: false,
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
  ],
  transports: {
    [scrollSepoliaAnkr.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

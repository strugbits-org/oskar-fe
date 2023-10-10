import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import Connect from "./connect";

const projectId = "8654d24dbf703daa6f712cc77648b5ad";

function App() {
  const { chains, publicClient } = configureChains(
    [mainnet],
    [walletConnectProvider({ projectId }), publicProvider()]
  );

  const metadata = {
    title: "Flat For Flip",
    name: "Flat For Flip",
    description: "Flat For Flip",
    url: "https://strugbitstech.wixsite.com/flat-for-flip-demo",
    icons: [
      "https://static.wixstatic.com/media/489682_ce04408606e342d9a80ae04fa8de9e38~mv2.png/v1/fill/w_92,h_93,al_c,q_85,enc_auto/image%207.png",
    ],
  };
  const wagmiConfig = createConfig({
    autoConnect: false,
    connectors: [
      new WalletConnectConnector({
        chains,
        options: { projectId, showQrModal: true, metadata },
      }),
    ],
    publicClient,
  });

  createWeb3Modal({ wagmiConfig, projectId, chains });

  return (
    <WagmiConfig config={wagmiConfig}>
      <Connect />
    </WagmiConfig>
  );
}

export default App;

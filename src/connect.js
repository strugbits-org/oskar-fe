import { useEffect } from "react";
import { useAccount, useConnect, useContractRead, useDisconnect } from "wagmi";
import ABI from "./contractABI";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function Connect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect, isSuccess } = useDisconnect();

  const { data } = useContractRead({
    address: contractAddress,
    abi: ABI,
    functionName: "balanceOf",
    args: [address],
    keepPreviousData: false,
  });

  const route = (url) => {
    window.location.assign(url);
  };

  const disconnectAcc = () => {
    disconnect();
  };

  const existingAcc = () => {
    if (isConnected === true) {
      if (data && Number(data) > 0) {
        route(`${process.env.REACT_APP_SITE_BASE_URL}/home?redirect=true`);
      } else {
        route(
          `${process.env.REACT_APP_SITE_BASE_URL}/nft-not-found?redirect=true`
        );
      }
    }
  };

  const connectWallet = () => connect({ connector: connectors[0] });

  useEffect(() => {
    if (!isConnected) {
      connectWallet();
    } else {
      if (isSuccess) {
        if (data && Number(data) > 0) {
          route(`${process.env.REACT_APP_SITE_BASE_URL}/home?redirect=true`);
        } else {
          route(
            `${process.env.REACT_APP_SITE_BASE_URL}/nft-not-found?redirect=true`
          );
        }
      }
    }
    // eslint-disable-next-line
  }, [isConnected]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <br />
      {isConnected ? (
        <>
          <h3 style={{ fontSize: 20, color: "#A3A6C2", textAlign: "center" }}>
            Do you want to change your account?
          </h3>
          <div
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "1px solid black",
                fontSize: 20,
                width: 100,
                height: 45,
                marginRight: 3,
                backgroundColor: "#181A20",
                color: "#fff",
                borderRadius: 12,
              }}
              onClick={disconnectAcc}
            >
              Yes
            </button>
            <button
              style={{
                background: "transparent",
                border: "1px solid black",
                fontSize: 20,
                width: 100,
                height: 45,
                marginRight: 3,
                backgroundColor: "#181A20",
                color: "#fff",
                borderRadius: 12,
              }}
              onClick={existingAcc}
            >
              No
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: 27, color: "#A3A6C2" }}>Please Login First</h1>
          <button
            style={{
              background: "transparent",
              border: "1px solid black",
              fontSize: 20,
              width: 200,
              height: 45,
              marginTop: 10,
              backgroundColor: "#181A20",
              color: "#fff",
              borderRadius: 12,
            }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US&pli=1"
              target="_playstore"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Install Metamask
            </a>
          </button>
        </>
      )}
    </div>
  );
}

export default Connect;

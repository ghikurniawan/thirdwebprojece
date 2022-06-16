import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Layout from "../../../components/dashboard/Layout";

export default function Wallet() {
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const router = useRouter();
    const address = useAddress();
    useEffect(() => {
        !address ? router.push(`/dashboard`) : null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [address]);
  return (
    <div>
        {!address ? (
           <button onClick={connectWithMetamask}>Connect with Metamask</button>
        ) : (
            <>
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
              <p>Your address: {address}</p>
            </>
        )}
    </div>
  )
}

Wallet.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
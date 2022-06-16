import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../../components/dashboard/Layout";

export default function Dashboard() {
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const router = useRouter();
    const address = useAddress();

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

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
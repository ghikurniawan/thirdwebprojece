import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "../../components/dashboard/Layout";
import NoWallet from "../../components/dashboard/NoWallet";

export default function Dashboard() {
    const disconnectWallet = useDisconnect();
    const router = useRouter();
    const address = useAddress();

  return (
    <div>
        {!address ? (
            <NoWallet />
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
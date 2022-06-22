import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { Flex} from "@chakra-ui/react";
import MintCard from "@/components/dashboard/MintCard";

export default function Mint() {
    const router = useRouter();
    const address = useAddress();
    
  return (
    <div>
        {!address ? (
          <Flex direction="column" justify="center" height="100vh">
            <NoWallet />
          </Flex>
          ) : 
            <Flex direction="column" justify="center" height="100vh">
                <MintCard />
            </Flex>
          }
    </div>
  )
}

Mint.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
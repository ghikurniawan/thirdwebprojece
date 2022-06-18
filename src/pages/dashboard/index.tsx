import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { HomepageSection } from "@/components/homepage/Section";
import { Flex} from "@chakra-ui/react";
import MintCard from "@/components/dashboard/MintCard";

export default function Dashboard() {
    const router = useRouter();
    const address = useAddress();

    const  [{
      data: { chain, chains },
      loading,
      error,
    },
    switchNetwork,
  ] = useNetwork();

  useEffect(() => {
    console.log(loading)
  }, [loading]);

  return (
    <div>
        {!address && !loading ? (
            <NoWallet />
          ) : 
          <HomepageSection topGradient>
            <Flex direction="column" justify="center" height="100vh">
                <MintCard />
            </Flex>
          </HomepageSection>
          }
    </div>
  )
}

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
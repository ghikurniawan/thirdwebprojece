import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { HomepageSection } from "@/components/homepage/Section";
import { Button, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import MintCard from "@/components/dashboard/MintCard";

export default function Dashboard() {
    const disconnectWallet = useDisconnect();
    const router = useRouter();
    const address = useAddress();

  return (
    <div>
        {!address ? (
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
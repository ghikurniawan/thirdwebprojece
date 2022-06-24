import { useAddress, useBalance } from "@thirdweb-dev/react";
import { ReactElement } from "react";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { Container, Flex, SimpleGrid} from "@chakra-ui/react";
import { HomepageSection } from "@/components/homepage/Section";
import NFT from "@/components/card/NFT";
import NFTSkeleton from "@/components/card/NFTSkeleton";
import { NftConsumer } from "@/contexts/nftContext";
import Banner from "@/components/dashboard/Banner";
import Profile from "@/components/dashboard/Profile";

export default function Dashboard() {
  const address = useAddress();
  const {data: balance} = useBalance()
  console.log(balance)

  return (
    <HomepageSection>
      <Container maxWidth="container.xl" mt={{sm : '80px', md : '150px', lg : '180px'}} mb= {'20px'}>
          {!address ? (
            <Flex direction="column" justify="center" >
              <NoWallet />
            </Flex>
            ) : (
            <Flex direction={'column'} justify="center" >
              <Banner />
              <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px' mt={'20px'}>
                <NftConsumer>
                  {consumer => consumer.isLoading || consumer.isFetching || consumer.isRefetching || consumer.skeleton || consumer.nftOwned.length == 0 && !consumer.noNFT ? (
                      <>
                      <NFTSkeleton />
                      <NFTSkeleton />
                      <NFTSkeleton />
                      <NFTSkeleton />
                      </>
                  ):(
                    <>
                    <Profile
                      gridArea='1 / 1 / 2 / 2'
                      banner={'/assets/img/auth/banner.png'}
                      avatar={'/assets/img/avatars/avatar4.png'}
                      address={address?.slice(0,6)+'...'+address.slice(-4) || '...'}
                      job='Product Designer'
                      posts={consumer.nftOwned.length || 0}
                      balance={balance?.displayValue?.slice(0, 4) || '...'}
                      balanceSymbol={balance?.symbol || '...'}
                      following='274'
                    />
                      {consumer.nftOwned.length > 0 ? (
                        <NFT 
                          metadata={consumer.nftOwned}
                          from={'dashboard'}
                        /> 
                      ) : null
                      }
                    </>
                  )}
                </NftConsumer>
              </SimpleGrid>
            </Flex>
          )}
      </Container>
    </HomepageSection>
  )
}

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;


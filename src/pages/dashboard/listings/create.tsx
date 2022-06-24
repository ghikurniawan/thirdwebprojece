import NFT from "@/components/card/NFT";
import NFTSkeleton from "@/components/card/NFTSkeleton";
import SellNftCard from "@/components/card/SellNftCard";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { NftConsumer } from "@/contexts/nftContext";
import { settings } from "@/utils/settings";
import { Container, Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { ReactElement } from "react";


export default function CreateListings(){
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const address = useAddress();
    return (
      <>
        <Container maxWidth="container.xl" minH={'70vh'} mt={{sm : '80px', md : '150px', lg : '180px'}} mb="20px">
        <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
               Create Listings {settings.appName}
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  passHref
                  href='#art'>
                  <Text fontSize='sm' me={{ base: "34px", md: "44px" }} fontWeight='500' color={textColorBrand}>Art</Text>
                </Link>
              </Flex>
            </Flex>
          {!address ? (
            <Flex direction="column" justify="center" >
              <NoWallet />
            </Flex>
            ) : (
            <Flex direction={'column'} justify="center" >
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
                      {consumer.nftOwned.length > 0 ? (
                        <SellNftCard 
                          metadata={consumer.nftOwned}
                          from={'dashboard/listings/create'}
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
      </>
    );
}

CreateListings.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
import { ReactElement} from "react";
import Layout from "@/components/dashboard/Layout";
import { Container, Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import NFT from "@/components/card/NFT";
import { HomepageSection } from "@/components/homepage/Section";
import NFTSkeleton from "@/components/card/NFTSkeleton";
import { NftConsumer } from "@/contexts/nftContext";
import Pagination from "@choc-ui/paginator";
import Link from "next/link";
import { settings } from "@/utils/settings";


export default function Gallery() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <>
      <HomepageSection>
        <Container maxWidth="container.xl" minH={'100vh'} mt={{sm : '80px', md : '150px', lg : '180px'}}>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Gallery {settings.appName}
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
                <Link
                  passHref
                  href='#art'>
                  <Text fontSize='sm' me={{ base: "34px", md: "44px" }} fontWeight='500' color={textColorBrand}>Music</Text>
                </Link>
                <Link
                  passHref
                  href='#art'>
                  <Text fontSize='sm' me={{ base: "34px", md: "44px" }} fontWeight='500' color={textColorBrand}>Collectible</Text>
                </Link>
                <Link
                  passHref
                  href='#art'>
                  <Text fontSize='sm' fontWeight='500' color={textColorBrand}>Sport</Text>
                </Link>
              </Flex>
            </Flex>
          <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px'  >
            <NftConsumer>
                {consumer => consumer.isLoading|| consumer.isFetching || consumer.isFetching || consumer.skeleton ? (
                  <>
                    <NFTSkeleton />
                    <NFTSkeleton />
                    <NFTSkeleton />
                    <NFTSkeleton />
                  </>
                ):(
                  <>
                  
                    <NFT 
                      metadata={consumer.nftAll}
                      from={'dashboard/gallery'}
                      /> 
                  </>
                )}
            </NftConsumer>
          </SimpleGrid>
          <Flex
            w="full"
            p={50}
            alignItems="center"
            justifyContent="center"
          >
            <Pagination
              defaultCurrent={5}
              total={500}
              paginationProps={{ display: "flex" }}
              pageNeighbours={2}
            />
          </Flex>
        </Container>
      </HomepageSection>
    </>
  )
}

Gallery.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
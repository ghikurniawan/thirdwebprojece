import ListingCards from "@/components/card/ListingCards";
import NFTSkeleton from "@/components/card/NFTSkeleton";
import Layout from "@/components/dashboard/Layout";
import { HomepageSection } from "@/components/homepage/Section";
import { MarketplaceConsumer } from "@/contexts/MarketplaceProvider";
import React, { ReactElement } from "react";
import { Container, Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { settings } from "@/utils/settings";
import Link from "next/link";


export default function Listings() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (

    <HomepageSection>
    <Container maxWidth="container.xl" minH={'100vh'}  mt={{sm : '80px', md : '150px', lg : '180px'}}>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Listings {settings.appName}
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
      <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px' >
        <MarketplaceConsumer>
          {marketplace => marketplace.isLoading|| marketplace.isFetching ? (
            <>
            <NFTSkeleton />
            <NFTSkeleton />
            <NFTSkeleton />
            <NFTSkeleton />
            </>
          ) : (
            <ListingCards data={marketplace.allListings} from="dashboard/listings" />
          )}
        </MarketplaceConsumer>
      </SimpleGrid>
    </Container>
    </HomepageSection>
  );
}

Listings.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
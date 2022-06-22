import { useAddress, useContract} from "@thirdweb-dev/react";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import NoWallet from "@/components/dashboard/NoWallet";
import { Box, Container, Flex, SimpleGrid, Text} from "@chakra-ui/react";
import { HomepageSection } from "@/components/homepage/Section";
import NFT from "@/components/card/NFT";
import { settings } from "@/utils/settings";
import NFTSkeleton from "@/components/card/NFTSkeleton";


const NFTContract = settings.contractAddress

export default function Dashboard() {
  const address = useAddress()
  const [metadataOwned, setMetadataOwned] =  useState(Array<any>())
  const [noNFT, setNoNFT] = useState(true)
  const [skeleton, setSkeleton] = useState(true)

  const {
    contract,
    data,
    isLoading,
    isFetching,
    status,
    isFetched,
  } = useContract(NFTContract)

  useEffect(() => {
    if(!address) return;
    if(status === "success" && metadataOwned.length === 0){
      const a = contract?.nft?.query?.owned?.all()
      .then(res => {
        if(res.length !== 0){
          setSkeleton(false)
          setMetadataOwned(res)
          setNoNFT(false)
          console.log("nft Count ", res.length)
        }else{
          console.log("nft Count -> ", res.length)
          setNoNFT(true)
          setSkeleton(false)
        }
      })
      .catch(err => {
        console.log("refetch")
      })
    }
  }, [address, contract, noNFT, status, data, metadataOwned]);


  return (
    <HomepageSection>
    <Container maxWidth="container.xl" minH="100vh">
        {!address ? (
          <Flex direction="column" justify="center" >
            <NoWallet />
          </Flex>
          ) : isFetching || isLoading || skeleton ? (
                <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px'  mt={{sm : '80px', md : '150px', lg : '180px'}}>
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px'  mt={{sm : '80px', md : '150px', lg : '180px'}}>
              { noNFT && isFetched ? (
                  <Text>No NFTs</Text>
                ) : 
                metadataOwned?.map((metadata, index) => ( 
                  <Box key={index}>
                    <NFT 
                      name={metadata.metadata.name}
                      image={metadata.metadata.image as string}
                      description={metadata.metadata.description as string}
                      owner={metadata.owner as string}
                      id={metadata.metadata.id}
                      from="dashboard"
                    />
                  </Box>
                )
            )}
            </SimpleGrid>
        )}
    </Container>
    </HomepageSection>
  )
}

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;


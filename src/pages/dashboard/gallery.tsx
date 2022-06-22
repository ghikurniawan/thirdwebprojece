import {useContract} from "@thirdweb-dev/react";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Box, Container, SimpleGrid} from "@chakra-ui/react";
import { settings } from "@/utils/settings";
import NFT from "@/components/card/NFT";
import { HomepageSection } from "@/components/homepage/Section";
import NFTSkeleton from "@/components/card/NFTSkeleton";


const NFTContract = settings.contractAddress

export default function Gallery() {
  const [metadataAll, setMetadataAll] = useState(Array<any>())
  
  const {
    contract,
    isLoading,
    isFetching,
    status,
    isRefetching
  } = useContract(NFTContract)

  useEffect(() => {
    if(status === "success" && metadataAll.length === 0){
      const a = contract?.nft?.query?.all({ start: 0, count: 50 })
      .then(res => {
        setMetadataAll(res)
        console.log("Refetch", res?.length)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [status , metadataAll, contract]);

  return (
    <>
      <HomepageSection>
        <Container maxWidth="container.xl" minH={'100vh'}>
        
        {isFetching || isLoading || isRefetching || metadataAll.length === 0 ? (
                <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px'  mt={{sm : '80px', md : '150px', lg : '180px'}}>
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                  <NFTSkeleton />
                </SimpleGrid>
          ) : (
          <SimpleGrid columns={{ base: 1, sm : 1, md: 2, lg: 4 }} gap='20px'  mt={{sm : '80px', md : '150px', lg : '180px'}}>
            {metadataAll.map((metadata, index) => (
                <Box key={index}>
                  <NFT 
                    name={metadata.metadata.name}
                    image={metadata.metadata.image as string}
                    description={metadata.metadata.description as string}
                    owner={metadata.owner as string}
                    id={metadata.metadata.id}
                    from="dashboard/gallery"
                  /> 
                </Box>
              ))}
          </SimpleGrid>
        )}

        </Container>
      </HomepageSection>
    </>
  )
}

Gallery.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
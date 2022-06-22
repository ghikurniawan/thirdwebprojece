// Chakra imports
import {
    Box,
    Flex,
    Skeleton,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "./Card";

  
  export default function NFTSkeleton() {

    return (
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
          <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
            <Skeleton 
                px='24px'
                py='5px'
                mb={'5px'}
                height='250px'
            />
          </Box>
          <Flex flexDirection='column' justify='space-between' h='100%'>
            <Flex
              justify='space-between'
              direction={{
                base: "row",
                md: "row",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
              mb='auto'>
              <Flex direction='column'>
                <Skeleton 
                    px='50px'
                    py='10px'
                    mb={'15px'}
                />
                <Skeleton 
                    px='35px'
                    py='10px'
                />
              </Flex>
            </Flex>
            <Flex
              justify='end'
              direction='row'
              mt='25px'>
                <Skeleton 
                  px='40px'
                  py='20px'
                  borderRadius='lg'
                  />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }
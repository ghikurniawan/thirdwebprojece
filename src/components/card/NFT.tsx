// Chakra imports
import {
    Box,
    Button,
    Flex,
    LinkBox,
    LinkOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useStyleConfig,
    useToast,
  } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { BigNumber, BigNumberish } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
  // Custom components
  import Card from "./Card";

  interface INFT {
    image: string;
    name: string;
    description: string;
    owner: string;
    id: BigNumber;
    from: string;
  }
  
  export default function NFT(props : INFT) {
    const router = useRouter();
    const { image, name, description, owner , id , from} = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();

    const handleModalClose = () => {
      router.push(`/${from}`);
    }

    return (
      <>
      {router.query.id && (
        <NFTDetail id={router.query.id} close={handleModalClose}/>
      )}
      <LinkBox>
      <Card p='20px'>
        <Flex direction={{ base: "column" }} justify='center'>
          <Box 
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            mb={{ base: "20px", "2xl": "20px" }} position='relative'
          >
            <MediaRenderer
              alt={name}
              src={image}
              style={{borderRadius: '20px'}}
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
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px'>
                  {name}
                </Text>
                <Link passHref href={`/${from}?id=${id}`} as={`/${from}/${id}`}>
                <LinkOverlay >
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                  {description}
                </Text>
                </LinkOverlay>
                </Link>
              </Flex>
            </Flex>
            <Flex
              justify='end'
              direction='row'
              mt='25px'>
                <Button
                  variant='outline'
                  color={textColor}
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='lg'
                  px='24px'
                  py='5px'
                  onClick={() => {
                    navigator.clipboard.writeText(owner || "")
                    toast({
                        title: "Copied",
                        description: "Owner address copied to clipboard",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                  }}
                  >
                  {owner?.slice(0,5) + '...' + owner?.slice(-3)}
                </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      </LinkBox>
      </>
    );
  }


  const NFTDetail = (props : any) => {
    const {id, close} = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();
    const styles = useStyleConfig("Card", { undefined });
    return (
      <>
      <Modal size={'lg'} blockScrollOnMount={false} isOpen onClose={close} isCentered motionPreset='slideInBottom'>
        <ModalOverlay
        bg='blackAlpha.100'
        backdropFilter='blur(10px)'
        />
        <ModalContent >
        <Flex direction={{ base: "row" }} justify='center'>
          <Box 
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            mb={{ base: "20px", "2xl": "20px" }} position='relative'
          >
            <MediaRenderer
              alt={'name'}
              src={'image'}
              style={{borderRadius: '20px'}}
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
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px'>
                  {'name'}
                </Text>
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                  {'description'}
                </Text>
              </Flex>
            </Flex>
            <Flex
              justify='end'
              direction='row'
              mt='25px'>
                <Button
                  variant='outline'
                  color={textColor}
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='lg'
                  px='24px'
                  py='5px'
                  onClick={() => {
                    navigator.clipboard.writeText('owner' || "")
                    toast({
                        title: "Copied",
                        description: "Owner address copied to clipboard",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                  }}
                  >
                  {/* {owner?.slice(0,5) + '...' + owner?.slice(-3)} */}
                </Button>
            </Flex>
          </Flex>
        </Flex>
        </ModalContent>
      </Modal>
      </>
    );  
  }
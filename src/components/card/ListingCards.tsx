// Chakra imports
import { Ethereum } from "@/utils/Logo";
import { CloseIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    Flex,
    Heading,
    Icon,
    LinkBox,
    LinkOverlay,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Tag,
    Text,
    useColorModeValue,
    useDisclosure,
    useStyleConfig,
    useToast,
  } from "@chakra-ui/react";
import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
  // Custom components
  import Card from "./Card";

  interface INFT {
    data: Array<any>;
    from: string;
  }
  
  export default function ListingCards(props : INFT) {
    const router = useRouter();
    const { data , from } = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();

    const handleModalClose = () => {
      router.push(`/${from}`);
    }

    return (
      <>
      {router.query.id && (
        <NFTDetail id={router.query.id} close={handleModalClose} metadata={data}/>
      )}
      {data.map((item: any , index) => (
        <Box key={item.asset.id}>
        <LinkBox >
        <Card p='20px'>
          <Flex direction={{ base: "column" }} justify='center'>
            <Box 
              w={{ base: "100%", "3xl": "100%" }}
              h={{ base: "100%", "3xl": "100%" }}
              mb={{ base: "20px", "2xl": "20px" }} position='relative'
            >
               <Image
                    width={'100%'}
                    height={'100%'}
                    layout="responsive"
                    alt={item.asset.name}
                    src={item.asset.image}
                    style={{borderRadius: '20px'}}
                    priority
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
                    {item.asset.name}
                  </Text>
                  <Link passHref href={`/${from}?id=${index}`} as={`/${from}/${index}`}>
                  <LinkOverlay >
                  <Text
                    color='secondaryGray.600'
                    fontSize={{
                      base: "sm",
                    }}
                    fontWeight='400'
                    me='14px'>
                    {item.asset.description}
                  </Text>
                  </LinkOverlay>
                  </Link>
                </Flex>
              </Flex>
              <Flex
                justify='space-between'
                direction='row'
                mt='25px'>
                    <Tag size={'md'} variant={'solid'}>
                        <Icon as={Ethereum} /> {item.buyoutCurrencyValuePerToken.displayValue + " " + item.buyoutCurrencyValuePerToken.symbol}
                    </Tag>
                  <Button
                    variant='outline'
                    color={textColor}
                    fontSize='sm'
                    fontWeight='500'
                    borderRadius='lg'
                    px='24px'
                    py='5px'
                    onClick={() => {
                      navigator.clipboard.writeText(item.sellerAddress || "")
                      toast({
                          title: "Copied",
                          description: "Owner address copied to clipboard",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                      })
                    }}
                    >
                    {item.sellerAddress?.slice(0,5) + '...' + item.sellerAddress?.slice(-3)}
                  </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        </LinkBox>
        </Box>
       ))}
      </>
    );
  }


  const NFTDetail = (props : any) => {
    const address = useAddress()
    const {id, close, metadata} = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();
    const { asset : {attributes, description, image, name, edition }, sellerAddress : owner, buyoutCurrencyValuePerToken } = metadata[id];
    return (
      <>
      <Modal size={'6xl'} isOpen onClose={close} isCentered motionPreset='slideInBottom'>
        <ModalOverlay
        bg='blackAlpha.100'
        backdropFilter='blur(10px)'
        />
        <ModalContent css={{background :'transparent'}} margin="10">
          <Card p='20px'>
            <SimpleGrid columns={[1, 1, 1, 1 ,2]} spacing={'4'}>
                  <Image
                    width={'100%'}
                    height={'100%'}
                    layout="responsive"
                    alt={name}
                    src={image}
                    style={{borderRadius: '20px'}}
                  />
                  <Flex flexDirection='column' justify='space-between'>
                    <Flex direction='row' justify={'space-between'}>
                      <Box>
                      <Text
                        color={textColor}
                        fontSize={'sm'}
                        mb='5px'
                        fontWeight='bold'
                        me='14px'>
                        {name}
                      </Text>
                      <Text
                      color='secondaryGray.600'
                      fontSize={{
                        base: "sm",
                      }}
                      fontWeight='400'
                      me='14px'>
                      {description}
                    </Text>
                    </Box>
                      <Text
                        color={textColor}
                        fontSize={'xx-large'}
                        mb='5px'
                        fontWeight='bold'
                        me='14px'>
                        # {edition}
                      </Text>
                    </Flex>
                      <SimpleGrid minChildWidth='200px' spacing={2}>
                        {attributes.map((item: any, index: any) => (
                          <Flex
                            key={index}
                            maxW="sm"
                            w="full"
                            mx="auto"
                            bg="white"
                            _dark={{
                              bg: "gray.800",
                            }}
                            rounded="lg"
                            overflow="hidden"
                          >
                            <Flex justifyContent="center" alignItems="center" w={12} bg="gray.600">
                              <Icon as={StarIcon} color="white" boxSize={6} />
                            </Flex>
                            <Box mx={-3} py={2} px={4}>
                              <Box mx={3}>
                               
                                <Text as='p'
                                  color="gray.600"
                                  _dark={{
                                    color: "gray.500",
                                  }}
                                  fontSize="sm"
                                >
                                  {item.trait_type}
                                </Text>
                                <Text as='span'
                                  color="gray.500"
                                  _dark={{
                                    color: "gray.400",
                                  }}
                                  fontWeight="bold"
                                >
                                  {item.value}
                                </Text>
                              </Box>
                            </Box>
                          </Flex>
                        ))}
                      </SimpleGrid>
                      <Flex justify={'space-between'} mt={'10px'}>
                    <Tag size={'md'} variant={'solid'}>
                        <Icon as={Ethereum} /> {buyoutCurrencyValuePerToken.displayValue + " " + buyoutCurrencyValuePerToken.symbol}
                    </Tag>
                        <Button
                        disabled={!address}
                        variant='outline'
                        color={textColor}
                        fontSize='sm'
                        fontWeight='500'
                        borderRadius='lg'
                        px='24px'
                        py='5px'
                        rightIcon={<ExternalLinkIcon />}
                        >
                          Buy 
                        </Button>
                      </Flex>
                      <Flex justify={'space-between'} mt={'10px'}>
                        <Button
                        variant='outline'
                        color={textColor}
                        fontSize='sm'
                        fontWeight='500'
                        borderRadius='lg'
                        px='24px'
                        py='5px'
                        onClick={close}
                        leftIcon={<CloseIcon />}
                        >
                          Close
                        </Button>
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
            </SimpleGrid>
          </Card>
        </ModalContent>
      </Modal>
      </>
    );  
  }
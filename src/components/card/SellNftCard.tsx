// Chakra imports
import { Ethereum } from "@/utils/Logo";
import { settings } from "@/utils/settings";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Collapse,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    LinkBox,
    LinkOverlay,
    Modal,
    ModalContent,
    ModalOverlay,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
  // Custom components
  import Card from "./Card";

  interface INFT {
    metadata: Array<any>;
    from: string;
  }
  
  export default function SellNftCard(props : INFT) {
    const router = useRouter();
    const { metadata, from } = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();

    const handleModalClose = () => {
      router.push(`/${from}`);
    }

    return (
      <>
      {router.query.id && (
        <SellDrawer id={router.query.id} close={handleModalClose} metadata={metadata}/>
      )}
      {metadata.map((item: any , index) => (
        <Box key={item.metadata.id}>
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
                    alt={item.metadata.name}
                    src={item.metadata.image}
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
                    {item.metadata.name}
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
                    {item.metadata.description}
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
                      navigator.clipboard.writeText(item.owner || "")
                      toast({
                          title: "Copied",
                          description: "Owner address copied to clipboard",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                      })
                    }}
                    >
                    {item.owner?.slice(0,5) + '...' + item.owner?.slice(-3)}
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
    const {id, close, metadata} = props;
    const textColor = useColorModeValue("navy.700", "white");
    const toast = useToast();
    const { metadata : {name, description, image, id: metadataId, attributes, edition}, owner } = metadata[id];
    return (
      <>
      <Modal size={'6xl'} isOpen onClose={close} isCentered motionPreset='slideInBottom'>
        <ModalOverlay
        bg='blackAlpha.100'
        backdropFilter='blur(10px)'
        />
        <ModalContent css={{background :'transparent'}} margin='10'>
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
                        <Button
                        variant='outline'
                        color={textColor}
                        fontSize='sm'
                        fontWeight='500'
                        borderRadius='lg'
                        px='24px'
                        py='5px'
                        onClick={close}
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




function SellDrawer(props : any) {
    const toast = useToast();
    const marketplace = useMarketplace(settings.marketplace)
    const {id, close, metadata} = props;
    const { metadata : {name, description, image, id: metadataId, attributes, edition}, owner } = metadata[id];
    const textColor = useColorModeValue("navy.700", "white");

    const [inputType, setInputType] = useState('direct')
    const [inputPrice, setInputPrice] = useState('')
    const [loading, setLoading] = useState(false)
    
    const priceColor = useColorModeValue("gray.700", "white");
    
    const handleChangePrice = (event : any) => setInputPrice(event.target.value)

    const handleInputListingType= (e : any) => {
        setInputType(e.target.value)
    }

    const isPriceError = inputPrice === ''

    const listing = {
        // address of the NFT contract the asset you want to list is on
        assetContractAddress: settings.contractAddress,
        // token ID of the asset you want to list
        tokenId: metadataId?.toString(),
       // when should the listing open up for offers
        startTimestamp: new Date(),
        // how long the listing will be open for
        listingDurationInSeconds: 86400 * 7,
        // how many of the asset you want to list
        quantity: 1,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        // how much the asset will be sold for
        buyoutPricePerToken: inputPrice,
      }

    const handleTxListing = async () => {
        setLoading(true)
        try{
            const tx = await marketplace?.direct.createListing(listing);
            const receipt = tx?.receipt; // the transaction receipt
            const listingId = tx?.id; // the id of the newly created listing
            if(listingId){
                toast({
                    title: "Listing created",
                    description: "Listing created successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                close()
            }
            setLoading(false)
            console.log(receipt)
            console.log(listingId)
        }catch(e){
            setLoading(false)
            console.log(e)
        }
      
      // And on the buyers side:
      // Quantity of the asset you want to buy
    //   const quantityDesired = 1;
    //   await marketplace.direct.buyoutListing(listingId, quantityDesired);
    }


    return (
      <>
        <Drawer
          isOpen
          placement='right'
          size={'md'}
          onClose={close}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create Listings</DrawerHeader>
  
            <DrawerBody>
            <Flex direction={'column'} justify={'space-around'} gap={4}>
                <Box maxW={'300'} >
                  <Image
                    width={'100%'}
                    height={'100%'}
                    layout="responsive"
                    alt={name}
                    src={image}
                    style={{borderRadius: '20px'}}
                  />
                </Box>
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
                <Stack spacing={6}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='type'>Listing Type</FormLabel>
                        <Select
                        id='type'
                        value={'direct'} 
                            onChange = {handleInputListingType}
                        >
                            <option value={'direct'}>Direct</option>
                        </Select>
                        <FormHelperText>
                            Please select a listing type
                        </FormHelperText>
                    </FormControl>
                    <InputGroup>
                        <InputLeftElement
                            color='gray.300'
                            pointerEvents='none'
                            fontSize='1.2em'
                            // eslint-disable-next-line react/no-children-prop
                            children={<Ethereum />}
                        />
                        <Input type={'number'} placeholder='Enter price' color={priceColor} onChange={handleChangePrice}/>
                        {/* eslint-disable-next-line react/no-children-prop */}
                        <InputRightElement children={ !isPriceError ? <CheckIcon color='green.500' /> : null} />
                    </InputGroup>
                </Stack>
            </Flex>
            </DrawerBody>
            <DrawerFooter justifyContent={'space-between'}>
              <Button variant='outline' mr={3} onClick={close}>
                Cancel
              </Button>
              <Button isLoading={loading} isDisabled={!inputPrice || !inputType} colorScheme='blue' width={'sm'} onClick={handleTxListing}>Create Listing</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
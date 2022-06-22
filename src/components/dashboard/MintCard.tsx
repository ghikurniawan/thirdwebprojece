import useWeb3Contract from '@/hooks/useWeb3Contract';
import { Ethereum } from '@/utils/Logo';
import { settings } from '@/utils/settings';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import {
    Box,
    Center,
    useColorModeValue,
    Text,
    Stack,
    Button,
    IconButton,
    Input,
    useToast,
    Heading,
  } from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import airdrop from '@/utils/airdrop.json';
import { RiContrastDropLine } from 'react-icons/ri';

  
  export default function MintCard() {
    const address = useAddress();
    const toast = useToast();

    const [publicSale, setPublicSale] = useState(false) 
    const [isWhitelistMint, setIsWhitelistMint] = useState(false)
    const [mintPaused, setMintPaused ] = useState(false)
    const [whitelisPriceSale, setWhitelisPriceSale] = useState<string>('0')
    const [whitelisPriceSaleUnit, setWhitelisPriceSaleUnit] = useState(0)
    const [publicPriceSale, setPublicPriceSale]= useState<string>('0')
    const [publicPriceSaleUnit, setPublicPriceSaleUnit] = useState(0)
    const [totalSupply, setTotalSupply]= useState(0)
    const [maxSupply, setMaxSupply]= useState(0)
    const [maxWhitelistMint, setMaxWhitelistMint]= useState(0)
    const [nftBalance, setNftBalance]= useState(0)
    const [nftConllectionName, setNftConllectionName]= useState(null)
    const [amount, setAmount] = useState<number>(1)

    const {
      loading,
      isLoading,
      error,
      isError,
      mintSuccess,
      data,
      getBalanceOf,
      refreshState,
      checkWhitelistSale, 
      checkPublicSale, 
      checkPausedMint, 
      getWhitelistPriceSale, 
      getPublicPriceSale, 
      getSupplyMint, 
      getMaxOfSupply, 
      handleWhitelistMint,
      getNftCollectionName,
      handlePublicMint,
      getMaxOfWhitelistMint} = useWeb3Contract()

      useEffect(() => {
        if(isError){
          console.error('raw error ->', error)
          toast({
            title: 'Transaction failed',
            description: error[0]?.reason || error[0]?.message || error?.message || 'Something went wrong, view console for more info',
            status: 'error',
            duration: 9000,
            isClosable: true,

          })
          refreshState()
        }
        if(mintSuccess){
          console.log('raw data ->', data)
          toast({
            title: 'Mint Success',
            description: `BlockHash: ${data?.blockHash}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          refreshState()
        }
      }, [error, isError, mintSuccess, data, toast, refreshState])

      useEffect(()=> {
        if(!address) return;
        if(!isLoading || mintSuccess){
          checkWhitelistSale().then(res => {
            setIsWhitelistMint(res)
          })
          checkPublicSale().then(res => {
            setPublicSale(res)
          })
          checkPausedMint().then(res => {
            setMintPaused(res)
          })
          getNftCollectionName().then(res => {
            setNftConllectionName(res)
          })
          getWhitelistPriceSale().then(res => {
            setWhitelisPriceSaleUnit(res?.toString())
            setWhitelisPriceSale(ethers.utils.formatEther(res))
          })
          getPublicPriceSale().then(res => {
            setPublicPriceSaleUnit(res?.toString())
            setPublicPriceSale(ethers.utils.formatEther(res))
          })
          getSupplyMint().then(res => {
            setTotalSupply(res?.toNumber())
          })
          getMaxOfSupply().then(res => {
            setMaxSupply(res?.toNumber())
          })
          getMaxOfWhitelistMint().then(res => {
            setMaxWhitelistMint(res?.toNumber())
          })
          getBalanceOf(address).then(res => {
            setNftBalance(res?.toNumber())
          })
          
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isLoading, address, mintSuccess])

  
    const handleButtonWhitelistMint = async () => {
      if(!address) return;
      refreshState()
      handleWhitelistMint({airdrop, address , whitelisPriceSaleUnit, amount}).then(res => {
        console.log("whitelist minting...")
      }).catch(err => {
        console.log(err)
      })
    }

    const handleButtonPublicMint = async () => {
      if(!address) return;
      refreshState()
      handlePublicMint({address, publicPriceSaleUnit, amount}).then(res => {
        console.log("minting...")
      }).catch(err => {
        console.log(err)
      })
    }

    const updateAmount = (newAmount : number) => {
      if (!publicSale && newAmount <= maxWhitelistMint && newAmount >= 1) {
        setAmount(newAmount)
      }
      if (publicSale && newAmount <= 10 && newAmount >= 1){
        setAmount(newAmount)
      }
    };

    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Box
                rounded={'lg'}
                objectFit={'cover'}
                as='video'
                src={'/assets/conyverse.webm'}
                draggable={false}
                controls={false}
                autoPlay
                loop={true}
                playsInline={true}
                muted={true}
              />
          <Stack pt={10} align={'center'}>
            <Text color={'gray.400'} fontSize={'md'} textTransform={'uppercase'}>
              {totalSupply}/{maxSupply}
            </Text>
            <Stack isInline spacing={2}>
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                You have 
              </Text>
              <Heading size={'sm'}> {nftBalance} </Heading> 
              <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                {settings.appName}
              </Text>
            </Stack>
            
            <Stack direction={'row'} align={'center'}>
              <IconButton onClick={() => updateAmount(amount - 1)} rounded="full" aria-label='Decrement ' icon={<MinusIcon />} />
                <Input readOnly value={amount} htmlSize={14} width='auto' color="HighlightText" />
              <IconButton onClick={() => updateAmount(amount + 1)} rounded="full" aria-label='Increment ' icon={<AddIcon />} />
            </Stack>
            <Stack direction={'row'} align={'stretch'}>
              <Text fontWeight={800} fontSize={'md'}>
                <Ethereum /> {isWhitelistMint && !publicSale ? whitelisPriceSale : publicPriceSale}
              </Text>
              <Text textDecoration={'line-through'} fontWeight="medium" color={'gray.400'}>
                {!publicSale ? publicPriceSale : null}
              </Text>
            </Stack>
            <Button
              isLoading = {loading || isLoading}
              loadingText={loading ? 'Minting...' : 'Loading...'}
              disabled={mintPaused || loading || isLoading }
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'Black'}
              bgColor="green.400"
              rounded={'md'}
              onClick={() => {
                if(isWhitelistMint && !publicSale && !mintPaused){
                  handleButtonWhitelistMint()
                }
                if(publicSale && !mintPaused){
                  handleButtonPublicMint()
                }
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              {isWhitelistMint && !mintPaused && !publicSale ? 'Whitelist Mint' : publicSale ? 'Public Mint' : 'Mint Paused'}
            </Button>
          </Stack>
        </Box>
       
      </Center>
    );
  }
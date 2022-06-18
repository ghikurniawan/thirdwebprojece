import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Button,
    Stack,
    Flex,
    ButtonGroup,
    IconButton,
    Text,
    PopoverHeader,
    Container,
    Badge,
    PopoverFooter,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiShutDownLine } from 'react-icons/ri';
import { useActiveChainId, useAddress, useBalance, useDisconnect, useNetwork , useNetworkMismatch } from '@thirdweb-dev/react';
import { ArrowDownIcon, CopyIcon } from '@chakra-ui/icons';
import { MdNetworkWifi } from 'react-icons/md';
import { GnosisSafe, MetaMask } from '@/utils/Logo';
import { IndicatorActive } from '../dashboard/ActiveIndicator';
  


  export default function Connected() {
      const address  = useAddress()
      const disconnectWallet = useDisconnect()
      const {data: balance} = useBalance()
      const [balanceOf, setBalanceOf] = useState("")
      const [copy, setCopy] = useState(false)
      const activeChain = useActiveChainId()
      const networkMisMatch = useNetworkMismatch()
      const [
        {
          data: { chain, chains },
          loading,
          error,
        },
        switchNetwork,
      ] = useNetwork();

      const handleSwitchNetwork = async () => {
        // @ts-ignore - this is a valid chain id
        await switchNetwork(activeChain);
      }
      useEffect(() => {
        if(loading || error) {
          console.log(loading, error)
        }
      }, [loading, error])

      useEffect(() => {
        if(balance) {
          setBalanceOf(balance?.displayValue)
        }
      }, [balance])

      useEffect(() => {
        if(copy) {
            setTimeout(() => {
                setCopy(false)
            }, 1000)
        }
      }, [copy])


    return (
      /**
       * You may move the Popover outside Flex.
       */
      <Flex justifyContent="center" mt={4}>
        <Popover placement="bottom" isLazy matchWidth>
          <PopoverTrigger>
            <ButtonGroup size='md' isAttached variant='outline' borderColor={useColorModeValue('gray.400', 'gray.600')}>
                <Button leftIcon={<IndicatorActive active />} colorScheme='gray' variant='outline' rightIcon={<MetaMask />} width="min-content">
                    <Stack spacing={0}>
                        <Text fontSize='xs'>{balanceOf.slice(0, 4) + " " + balance?.symbol}</Text>
                        <Text fontSize='xs'>{address?.slice(0,5) + '...' + address?.slice(-3) + `(${chain?.name})`}</Text>
                    </Stack>
                </Button>
                <IconButton aria-label='Add to friends' icon={<ArrowDownIcon />} />
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
            <PopoverArrow />
            <PopoverHeader fontWeight="bold">
                <Container>
                    Status : 
                <Badge variant='solid' colorScheme='green'>
                    {address ? " Connected" : null }
                </Badge>
                </Container>
            </PopoverHeader>
            <PopoverBody>
              <Stack>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<CopyIcon />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={() => {
                      navigator.clipboard.writeText(address || "")
                      setCopy(true)
                    }}
                  fontSize="sm">
                   {!copy ? "Copy wallet address" : "Copyed"}
                </Button>
                {networkMisMatch ? 
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<MdNetworkWifi />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={() => handleSwitchNetwork()}
                  fontSize="sm">
                    Switch network
                </Button> : <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<MdNetworkWifi />}
                  justifyContent="start"
                  fontWeight="normal"
                  fontSize="sm">
                    {/* @ts-ignore ts-message: Valid Chain id */}
                    {chain?.name}
                </Button>
                }
                
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<GnosisSafe />}
                  justifyContent="start"
                  fontWeight="normal"
                  fontSize="sm">
                  Gnosis Safe
                </Button>
              </Stack>
            </PopoverBody>
            <PopoverFooter>
              <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<RiShutDownLine />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={disconnectWallet}
                  fontSize="sm">
                    Disconnect
                </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  }



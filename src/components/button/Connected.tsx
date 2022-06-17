import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Button,
    Stack,
    Flex,
    createIcon,
    ButtonGroup,
    IconButton,
    Text,
    PopoverHeader,
    Container,
    Badge,
    PopoverFooter,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiShutDownLine, RiRestartLine } from 'react-icons/ri';
import { useAddress, useBalance, useDisconnect } from '@thirdweb-dev/react';
import { ArrowDownIcon, CopyIcon } from '@chakra-ui/icons';
import { MdNetworkWifi } from 'react-icons/md';
import { Ethereum, MetaMask } from '@/utils/Logo';
import { IndicatorActive } from '../dashboard/ActiveIndicator';
  
  export default function Connected() {
      const address  = useAddress()
      const disconnectWallet = useDisconnect()
      const {data} = useBalance()
      const [balanceOf, setBalanceOf] = useState("")
      const [copy, setCopy] = useState(false)

      useEffect(() => {
        if(data) {
          setBalanceOf(data?.displayValue)
        }
      }, [data])
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
            <ButtonGroup size='md' isAttached variant='outline' backgroundColor="gray.900">
                <Button leftIcon={<IndicatorActive active={address ? true : false}/>} colorScheme='gray' variant='outline' rightIcon={<MetaMask />} width="min-content">
                    <Stack spacing={0}>
                        <Text fontSize='xs'>{balanceOf.slice(0, 4) + " " + data?.symbol}</Text>
                        <Text fontSize='xs'>{address?.slice(0,5) + '...' + address?.slice(-3)}</Text>
                    </Stack>
                </Button>
                <IconButton aria-label='Add to friends' icon={<ArrowDownIcon />} />
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }} backgroundColor="gray.900">
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
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<MdNetworkWifi />}
                  justifyContent="start"
                  fontWeight="normal"
                  fontSize="sm">
                  WalletConnect
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<RiRestartLine />}
                  justifyContent="start"
                  fontWeight="normal"
                  fontSize="sm">
                  Coinbase Wallet
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



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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiShutDownLine, RiRestartLine } from 'react-icons/ri';
import { useAddress, useBalance, useDisconnect } from '@thirdweb-dev/react';
import { ArrowDownIcon, CopyIcon } from '@chakra-ui/icons';
import { MdNetworkWifi } from 'react-icons/md';
import { MetaMask } from '../../utils/Logo';
  
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
            <ButtonGroup size='md' isAttached variant='outline'>
                <Button leftIcon={<Ethereum />} colorScheme='gray' variant='outline' rightIcon={<MetaMask />} width="min-content">
                    <Stack spacing={0}>
                        <Text fontSize='xs'>{balanceOf.slice(0, 4) + " " + data?.symbol}</Text>
                        <Text fontSize='xs'>{address?.slice(0,5) + '...' + address?.slice(-3)}</Text>
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
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  }


  const Ethereum = createIcon({
    displayName: 'Ethereum',
    viewBox: '0 0 784.37 1277.39',
    path: (
        <g>
            <polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
            <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
            <polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
            <polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
            <polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
            <polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
       </g>
    ),
  });


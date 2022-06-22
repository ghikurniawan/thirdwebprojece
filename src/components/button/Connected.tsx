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
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    FormLabel,
    Input,
    ModalFooter,
    Modal,
    ModalBody,
    FormControl,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiShutDownLine } from 'react-icons/ri';
import { useActiveChainId, useConnect ,useAddress, useBalance, useDisconnect, useGnosis, useNetwork , useNetworkMismatch, useProvider } from '@thirdweb-dev/react';
import { ArrowDownIcon, CopyIcon } from '@chakra-ui/icons';
import { MdAccountBalanceWallet, MdNetworkWifi } from 'react-icons/md';
import { Coinbase, GnosisSafe, MagicLink, MetaMask, Walletconnect } from '@/utils/Logo';
import { IndicatorActive } from '../dashboard/ActiveIndicator';
import { useRef } from 'react';
import { createRef } from 'react';
  


  export default function Connected() {
      const address  = useAddress()
      const disconnectWallet = useDisconnect()
      const {data: balance} = useBalance()
      const [balanceOf, setBalanceOf] = useState("")
      const [copy, setCopy] = useState(false)
      const activeChain = useActiveChainId()
      const networkMisMatch = useNetworkMismatch()
      const connectWithGnosis = useGnosis()

      const { isOpen, onOpen, onClose } = useDisclosure()
      const safeRef = useRef(null)
      const [safeAddress, setSafeAddress] = useState("")
      const [loading, setLoading] = useState(false)

      const [{data : {
        connected, 
        connector,
        connectors,

      }, 
      error : connectError,

    }]= useConnect()

      const  [{
          data: { chain, chains }
        },
        switchNetwork,
      ] = useNetwork();


      // useEffect(() => {
      //   console.log("from useNetwork -> ",connectError, connected , connector?.name , connectors)
        
      // }, [connectError, connected, connector, connectors])

      const handleSwitchNetwork = async () => {
        // @ts-ignore - this is a valid chain id
        await switchNetwork(activeChain);
      }

      const handlePaste = (e : any) => {
        var clipboardData, pastedData;

        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData;
        pastedData = clipboardData.getData('Text');
        
        // Do whatever with pasteddata
        let pattern = /0x[a-fA-F0-9]{40}/g
        let match = pattern.exec(pastedData)
        // @ts-ignore
        safeRef.current.value = match
        setSafeAddress(match?.input as any)
      }

      const handleConnectWithGnosis = () => {
        setLoading(true)
        connectWithGnosis({ safeAddress: safeAddress, safeChainId: chain?.id as number })
        .then(data => {
          setLoading(false)
          onClose()
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
      }
      

      

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

      function showLogo () {
        switch(connector?.name) {
          case "MetaMask":
            return <MetaMask />
          case "WalletConnect":
            return <Walletconnect />
          case "Coinbase Wallet":
            return <Coinbase />
          case "Gnosis Safe":
            return <GnosisSafe />
          case "Magic":
            return <MagicLink />
          default:
            return <MdAccountBalanceWallet />
        }
      }

    return (
      /**
       * You may move the Popover outside Flex.
       */
      <Flex justifyContent="center" mt={4}>
        <Popover placement="bottom" isLazy matchWidth>
          <PopoverTrigger>
            <ButtonGroup size='md' isAttached variant='outline' borderColor={useColorModeValue('gray.400', 'gray.600')}>
                <Button leftIcon={<IndicatorActive active />} colorScheme='gray' variant='outline' rightIcon={showLogo()} width="min-content">
                    <Stack spacing={0}>
                        {balance ? 
                        <Text fontSize='xs'>
                          {balanceOf.slice(0, 4) + " " + balance?.symbol}
                        </Text>: null }
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
                  colorScheme={connector?.name === "Gnosis Safe" ? "green" : "gray"}
                  leftIcon={<GnosisSafe />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={onOpen}
                  disabled={connector?.name === "Gnosis Safe"}
                  fontSize="sm">
                  Gnosis Safe {connector?.name === "Gnosis Safe" ? "Connected" : null}
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

        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connect With Gnosis Safe</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Safe Address</FormLabel>
                <Input required type="text" ref={safeRef} placeholder='net:0x000000000000000000000000000000000000' onChange={(e) => setSafeAddress(e.target.value as any)} onPaste={(e) => handlePaste(e)}/>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={loading} colorScheme='blue' mr={3} onClick={() => handleConnectWithGnosis()}>
                Connect
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }



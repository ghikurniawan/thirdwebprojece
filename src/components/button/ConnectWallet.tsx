import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Button,
    Stack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useDisclosure,
    FormHelperText,
    PopoverFooter,
  } from '@chakra-ui/react';
import {MdAccountBalanceWallet} from 'react-icons/md'
import { useMagic, useMetamask, useWalletConnect, useWalletLink, useConnect } from '@thirdweb-dev/react';
import { Coinbase, GnosisSafe, MagicLink, MetaMask, Walletconnect } from '@/utils/Logo';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

  export default function ConnectWallet() {
    const [{data, loading : connectLoading, error}] = useConnect();
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const connectWithMetamask = useMetamask()
    const connectWtihWalletConnect = useWalletConnect()
    const connetWtihWalletLink = useWalletLink()
    const connectWithemail = useMagic()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //   console.log(data, connectLoading, error)
    // }, [data, connectLoading, error])

        const handleSubmitMagic = async (email : string) => {
            console.log(email)
            setLoading(true)
            if(email) {
              connectWithemail({email})
              .then((data) => {
                setLoading(false)
                onClose()
              })
              .catch((error) => {
                setLoading(false)
              })
              .finally(() => {
                setLoading(false)
                onClose()
              })
            }
        }

    return (
      /**
       * You may move the Popover outside Flex.
       */
      <>
      <Flex justifyContent="center" mt={4}>
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
                <Button isLoading={connectLoading} leftIcon={<MdAccountBalanceWallet />} colorScheme='gray' variant='solid'>
                    Connect Wallet
                </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<MetaMask />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={connectWithMetamask}
                  fontSize="sm">
                 MetaMask
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<Walletconnect />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={connectWtihWalletConnect} 
                  fontSize="sm">
                  WalletConnect
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<Coinbase />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={connetWtihWalletLink}
                  fontSize="sm">
                  Coinbase Wallet
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<MagicLink />}
                  justifyContent="start"
                  fontWeight="normal"
                  onClick={onOpen}
                  // disabled
                  fontSize="sm">
                  Email Wallet (magic)
                </Button>
              </Stack>
            </PopoverBody>
            <PopoverFooter>
                <Button
                  w="194px"
                  variant="ghost"
                  leftIcon={<GnosisSafe />}
                  justifyContent="start"
                  fontWeight="normal"
                  disabled
                  fontSize="sm">
                  Gnosis Safe
                </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connet With Magic link { <MagicLink /> }</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input id='email' required type="email" ref={initialRef} placeholder='mail@example.com' 
                  onChange={(e) => {
                  setEmail(e.target.value as string)
                }} 
                />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={loading} colorScheme='blue' mr={3} onClick={() => handleSubmitMagic(email as string)}>
                Connect
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
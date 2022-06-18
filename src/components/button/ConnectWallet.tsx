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
  } from '@chakra-ui/react';
import {MdAccountBalanceWallet} from 'react-icons/md'
import { useMagic, useMetamask, useWalletConnect, useWalletLink } from '@thirdweb-dev/react';
import { Coinbase, MagicLink, MetaMask, Walletconnect } from '@/utils/Logo';
import { useRef } from 'react';
import { useState } from 'react';

  export default function ConnectWallet() {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

      const connectWithMetamask = useMetamask()
      const connectWtihWalletConnect = useWalletConnect()
        const connetWtihWalletLink = useWalletLink()
        const connectWithemail = useMagic()
        const [email, setEmail] = useState()

    return (
      /**
       * You may move the Popover outside Flex.
       */
      <>
      <Flex justifyContent="center" mt={4}>
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <Stack direction='row' spacing={4}>
                <Button leftIcon={<MdAccountBalanceWallet />} colorScheme='gray' variant='solid'>
                    Connect Wallet
                </Button>
            </Stack>
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
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input required type="email" ref={initialRef} placeholder='mail@example.com' onChange={(e) => setEmail(e.target.value as any)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => connectWithemail({email})}>
                Connect
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
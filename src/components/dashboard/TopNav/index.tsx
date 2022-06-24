import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Container,
  ButtonGroup,
  Center,
  Tabs,
  TabList,
  Tab,
  Spacer,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';

import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Logo } from '@/components/logo';
import {  useEffect, useState } from 'react';
import { useAddress, useNetworkMismatch, useActiveChainId , ChainId } from '@thirdweb-dev/react';
import Connected from '@/components/button/Connected';
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function TopNav() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const address = useAddress()
  const networkMisMatch = useNetworkMismatch()
  const activeChain = useActiveChainId()
  const bgNav = useColorModeValue("#ffffff", "navy.800")

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -5) {
        setIsScrolled(true);
      } else if (currPos.y >= -5) {
        setIsScrolled(false);
      }
    },
    [isMobile],
    undefined,
    false,
    33,
  );

  return (
    <>
    <Box
      transition="all 100ms ease"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex="overlay"
      as="header"
      boxShadow={isScrolled ? "md" : undefined}
      bg={isScrolled ? bgNav : "transparent"}
      backdropFilter="blur(10px)"
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.400', 'gray.600')}
    >
      {networkMisMatch ? (
        <Box
        background="red" 
        zIndex="overlay">
              <Container maxW={'container.lg'}>
            {/* @ts-ignore ts-message: Unreachable code error */}
            <marquee width="100%" direction="right" >
              <Text fontSize="large" color="white">
                Wrong Network !! Please switch to {ChainId[activeChain || 1]}
              </Text>
            {/* @ts-ignore ts-message: Unreachable code error */}
            </marquee>
              </Container>
        </Box>
      ) : null}
      <Container
        maxWidth='container.xl'
        bg={"transparent"}
      >
        
      <Flex
        bg="transparent"
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextLink href="/" passHref>
            <ChakraLink>
            <Logo color='var(--chakra-colors-chakra-body-text)' />
            </ChakraLink>
          </NextLink>
        </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <ButtonGroup variant="ghost">
                    <ChakraLink href="https://twitter.com" isExternal>
                        <Button aria-label="Twitter Link" iconSpacing={0} leftIcon={<SiTwitter fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                    </ChakraLink>
                    <ChakraLink href="https://discord.gg/" isExternal>
                        <Button aria-label="Discord Link" iconSpacing={0} leftIcon={<SiDiscord fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                    </ChakraLink>
                    <ChakraLink href="https://www.instagram.com" isExternal>
                        <Button aria-label="Instagram Link" iconSpacing={0} leftIcon={<SiInstagram fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                    </ChakraLink>
                    <ChakraLink href="https://github.com" isExternal>
                        <Button aria-label="Github Link" iconSpacing={0} leftIcon={<SiGithub fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                    </ChakraLink>
                </ButtonGroup>
            </Flex>
            <Button aria-label='Toggle Darkmode' onClick={toggleColorMode} variant="ghost">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
              {address ? (
                <Connected />
              ) : null}
          </Stack>
        </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      </Container>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        borderTop={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.400', 'gray.600')}
      >
        <Container
          maxWidth='container.xl'
          py={4}
        >
           <DesktopNav />
        </Container>
      </Flex>
    </Box>
    
    </>
  );
}

const DesktopNav = () => {
  const router = useRouter();
  const [tabIndex , setTabIndex] = useState(0)
  let menuBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const path = router.pathname
useEffect(() => {
  function getTabIndex() : number {
    switch(path){
      case '/dashboard':
        setTabIndex(0)
        return 0
        case '/dashboard/gallery':
        setTabIndex(1)
        return 1
        case '/dashboard/listings':
        setTabIndex(2)
        return 2
        case '/dashboard/listings/create':
        setTabIndex(2)
        return 2

        default:
          return 0
    }
  }
  getTabIndex()
}, [path])

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mx={2}
      borderWidth={0}
      overflowX="auto"
    >
      <Tabs defaultIndex={tabIndex} borderBottomColor="transparent">
        <TabList>
        {NAV_ITEMS.map((navItem) => (
          <Popover key={navItem.label} trigger={'click'} placement={'bottom-start'}>
            <NextLink href={navItem.href ?? '#'} passHref>
              <a>
                <PopoverTrigger>
                    <Tab
                      py={4}
                      m={0}
                      _focus={{
                        boxShadow: "none",
                      }}
                    >
                    {navItem.label}
                  </Tab>
                </PopoverTrigger>
              </a>
            </NextLink>

            {navItem.children && (
              <PopoverContent
                boxShadow={shadow}
                p='20px'
                me={{ base: "30px", md: "unset" }}
                borderRadius='20px'
                bg={menuBg}
                border='none'
                mt='22px'
                minW={{ base: "unset" }}
                maxW={{ base: "360px", md: "unset" }}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}

          </Popover>
        ))}
        </TabList>
      </Tabs>
        <Spacer />
        <HStack spacing={3} alignItems="center">
          <InputGroup
            display={{
              base: "none",
              lg: "block",
            }}
            ml="auto"
          >
            <InputLeftElement pointerEvents="none">
              <Search2Icon />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
          <NextLink href="/dashboard/mint">
          <Button size="md" variant="action" minW="100">
            Mint
          </Button>
      </NextLink>
</HStack>
    </Flex>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href as any} passHref>
    <ChakraLink
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.200', 'navy.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <ChakraLink key={child.label} py={2} href={child.href}>
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Gallery',
    href: '/dashboard/gallery',
  },
  {
    label: 'Listings',
    children:[
      {
        label: 'Browser',
        subLabel: 'Browse all listings',
        href: '/dashboard/listings',
      },
      {
        label: 'Create',
        subLabel: 'Create a new listing',
        href: '/dashboard/listings/create',
      },
    ],
  }
];



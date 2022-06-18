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
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Logo } from '@/components/logo';
import {  useState } from 'react';
import { useAddress, useNetworkMismatch, useActiveChainId , ChainId, useNetwork } from '@thirdweb-dev/react';
import Connected from '@/components/button/Connected';
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';

export default function TopNav() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const address = useAddress()
  const networkMisMatch = useNetworkMismatch()
  const activeChain = useActiveChainId()

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
      bg={isScrolled ? "blackAlpha.500" : "transparent"}
      backdropFilter="blur(10px)"
      borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.400', 'gray.600')}
    >
      {networkMisMatch ? (
        <Box
        background="red" 
        zIndex="overlay">
          <Center>
            {/* @ts-ignore ts-message: Unreachable code error */}
            <marquee width="100%" direction="right" >
              <Text fontSize="large" color="white">
                Wrong Network !! Please switch to {ChainId[activeChain || 1]}
              </Text>
            {/* @ts-ignore ts-message: Unreachable code error */}
            </marquee>
          </Center>
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
          <Logo color='var(--chakra-colors-chakra-body-text)' />
        </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <ButtonGroup variant="ghost" >
                  <ChakraLink href="https://twitter.com" isExternal>
                      <Button iconSpacing={0} leftIcon={<SiTwitter fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                  </ChakraLink>
                  <ChakraLink href="https://discord.gg/" isExternal>
                      <Button iconSpacing={0} leftIcon={<SiDiscord fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                  </ChakraLink>
                  <ChakraLink href="https://www.instagram.com" isExternal>
                      <Button iconSpacing={0} leftIcon={<SiInstagram fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                  </ChakraLink>
                  <ChakraLink href="https://github.com" isExternal>
                      <Button iconSpacing={0} leftIcon={<SiGithub fontSize="1rem" />} colorScheme='gray' variant='ghost' />
                  </ChakraLink>
              </ButtonGroup>
            </Flex>
            <Button onClick={toggleColorMode} variant="ghost">
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
      >
        <Container
          maxWidth='container.xl'
          pb={4}
        >
          <Center>
            <DesktopNav />
          </Center>
        </Container>
      </Flex>
    </Box>
    
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <ChakraLink
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
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
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
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
    label: 'Section 1',
    href: '#section1',
  },
  {
    label: 'Section 2',
    href: '#section2',
  },
  {
    label: 'Dropdown1',
    children: [
      {
        label: 'Link1',
        subLabel: 'Description',
        href: '#',
      },
      {
        label: 'Link2',
        subLabel: 'Description',
        href: '#',
      },
    ],
  },
  {
    label: 'Dropdown2',
    children: [
      {
        label: 'Link1',
        subLabel: 'Description',
        href: '#',
      },
      {
        label: 'Link2',
        subLabel: 'Description',
        href: '#',
      },
    ],
  },
];
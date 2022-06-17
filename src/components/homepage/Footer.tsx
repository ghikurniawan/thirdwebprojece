import {
    Box,
    Button,
    ButtonGroup,
    Container,
    DarkMode,
    Divider,
    Flex,
    Link as ChakraLink,
    Heading,
    SimpleGrid,
    Stack,
    useToast,
  } from "@chakra-ui/react";
  import { Logo } from "../logo";
  import {
    SiDiscord,
    SiGithub,
    SiInstagram,
    SiTwitter,
  } from "react-icons/si";
import { LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
  
  export const HomepageFooter: React.FC = () => {
    const toast = useToast();
  
    return (
      <Box bgColor="#111315" zIndex="100">
        <Container as="footer" maxW="container.xl" color="gray.500">
          <DarkMode>
            <Divider borderColor="rgba(255,255,255,0.1)" />
          </DarkMode>
          <Stack
            spacing="8"
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            py={{ base: "12", md: "16" }}
          >
            <Stack spacing={{ base: "6", md: "8" }} align="start">
              <Logo color="#fff" />
              <ButtonGroup variant="ghost">
                <ChakraLink href="https://twitter.com" isExternal>
                    <Button iconSpacing={0} leftIcon={<SiTwitter fontSize="1.25rem" />} colorScheme='purple' variant='ghost' />
                </ChakraLink>
                <ChakraLink href="https://discord.gg/" isExternal>
                    <Button iconSpacing={0} leftIcon={<SiDiscord fontSize="1.25rem" />} colorScheme='purple' variant='ghost' />
                </ChakraLink>
                <ChakraLink href="https://www.instagram.com" isExternal>
                    <Button iconSpacing={0} leftIcon={<SiInstagram fontSize="1.25rem" />} colorScheme='purple' variant='ghost' />
                </ChakraLink>
                <ChakraLink href="https://github.com" isExternal>
                    <Button iconSpacing={0} leftIcon={<SiGithub fontSize="1.25rem" />} colorScheme='purple' variant='ghost' />
                </ChakraLink>
              </ButtonGroup>
            </Stack>
            <Flex
              direction={{ base: "column-reverse", md: "column", lg: "row" }}
              gap={{ base: "12", md: "8" }}
            >
              <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="8">
                <Stack spacing="4" minW="36" flex="1">
                  <Heading size="md">Product</Heading>
                  <Stack spacing="3" shouldWrapChildren>
                    <Link
                      href="#"
                      passHref
                    >
                        <ChakraLink>
                             Features
                        </ChakraLink>
                    </Link>
                    <Link
                      href="#"
                      passHref
                    >
                        <ChakraLink>
                             Some
                        </ChakraLink>
                    </Link>
                    <Link
                      href="/dashboard"
                      passHref
                    >
                        <ChakraLink>
                             Dashboard
                        </ChakraLink>
                    </Link>
                  </Stack>
                </Stack>
              </SimpleGrid>
            </Flex>
          </Stack>
        </Container>
      </Box>
    );
  };
  
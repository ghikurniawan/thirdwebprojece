import { Button, ButtonGroup, Container, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider, IpfsStorage} from "@thirdweb-dev/react";
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from "react-icons/si";
import TopNav from "@/components/dashboard/TopNav";
import { settings } from '@/utils/settings'

type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
};

export default function Layout(props : LayoutProps) {

    const connector = [
        "walletConnect", 
        { name: "injected", 
            options: { 
            shimDisconnect: false 
        } 
        },
        {
            name: "walletLink",
            options: {
                appName: settings.appName,
            }
        },
        {
            name: "magic",
            options: {
              apiKey: process.env.NEXT_PUBLIC_MAGIC_KEY,
            }
        },
        {
            name: "gnosis",
            options: {
                safeAddress: "",
                safeChainId: settings.chain_id,
            }
        },
    ]

return (
    <>
        <ThirdwebProvider
            desiredChainId={settings.chain_id}
            chainRpc={{ [ChainId[settings.chain_id]]: settings.rpcUrl}}
            dAppMeta={{
                name: settings.appName,
                description: settings.appDescription,
                isDarkMode: true,
                logoUrl: settings.logoUrl,
                url: settings.websiteUrl,
            }}
            // supportedChains={[ChainId.Mainnet]}
            storageInterface={new IpfsStorage(settings.ipfsGateway)}
            sdkOptions={{
                gasSettings: { maxPriceInGwei: 500, speed: "fast" },
                readonlySettings: {
                chainId: settings.chain_id,
                rpcUrl: settings.rpcUrl,
                },
            }}
            // @ts-ignore
            walletConnectors={connector}
        >
            <TopNav/>
            {props.children}

        </ThirdwebProvider>

        <Container zIndex="overlay" as="footer" maxW="container.page" w="100%" py={4} position="fixed" bottom="0" borderTop="1px" borderColor="gray.600">
            <Stack direction="row" spacing="4" align="center" justify="center">
                <Text alignSelf="center">
                    {settings.appName} &copy; {new Date().getFullYear()}
                </Text>
                <ButtonGroup variant="ghost">
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
            </Stack>
        </Container>
    </>
)
}
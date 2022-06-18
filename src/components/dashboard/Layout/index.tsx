import { Button, ButtonGroup, Container, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider, IpfsStorage} from "@thirdweb-dev/react";
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from "react-icons/si";
import TopNav from "@/components/dashboard/TopNav";
import settings from '@/utils/settings.json'
type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
};

export default function Layout(props : LayoutProps) {

return (
    <>
        <ThirdwebProvider
                desiredChainId={settings.chain_id}
                chainRpc={{ [ChainId[settings.chain_id]]: settings.rpcUrl}}
                dAppMeta={{
                    name: "Awesome DApp",
                    description: "This is an example awesome dapp",
                    isDarkMode: false,
                    logoUrl: "@/assets/thirdweb.svg",
                    url: "https://awesome.com",
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
            walletConnectors={[
                "walletConnect", 
                { name: "injected", 
                options: { 
                    shimDisconnect: false 
                } 
                },
                {
                name: "walletLink",
                options: {
                    appName: "Example App",
                }
                },
                {
                name: "magic",
                options: {
                    apiKey: "pk_live_73DD69426B8E2A24",
                    rpcUrls: {
                    [ChainId[settings.chain_id]]: settings.rpcUrl,
                    },
                },
                },
            ]}
        >
            <TopNav/>
            {props.children}

        </ThirdwebProvider>

        <Container zIndex="overlay" as="footer" maxW="container.page" w="100%" py={4} position="fixed" bottom="0" borderTop="1px" borderColor="gray.600">
            <Stack direction="row" spacing="4" align="center" justify="center">
                <Text alignSelf="center">
                    Nitrous Oxide Snail &copy; {new Date().getFullYear()}
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
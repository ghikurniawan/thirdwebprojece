import { Button, ButtonGroup, Container, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider, IpfsStorage, useContract} from "@thirdweb-dev/react";
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from "react-icons/si";
import TopNav from "@/components/dashboard/TopNav";
import { settings } from '@/utils/settings'
import NftProviders from "../NftProviders";
import MarketplaceProvider from "@/contexts/MarketplaceProvider";

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
            connectors={connector}
            storage={new IpfsStorage(settings.ipfsGateway)}
            autoConnect={true}
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
            <NftProviders>
                <MarketplaceProvider>
                    <TopNav/>
                    {props.children}
                </MarketplaceProvider>
            </NftProviders>

        </ThirdwebProvider>

        <Container as="footer" maxW="container.page" w="100%" py={4} borderTop="1px" borderColor="gray.600">
            <Stack direction="row" spacing="4" align="center" justify="center">
                <Text alignSelf="center">
                    {settings.appName} &copy; {new Date().getFullYear()}
                </Text>
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
            </Stack>
        </Container>
    </>
)
}
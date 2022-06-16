import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import TopNav from "../TopNav";

type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };
  
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

export default function Layout(props : LayoutProps) {
return (
    <>
        <TopNav/>
        <ThirdwebProvider desiredChainId={activeChainId}>
            {props.children}
        </ThirdwebProvider>
    </>
)
}
import { createContext } from "react";

const NftContext = createContext({
    nftOwned : Array<any>(),
    nftAll : Array<any>(),
    isLoading : false || undefined,
    isFetching : false || undefined,
    isRefetching : false || undefined,
    noNFT : true || undefined,
    skeleton : true || undefined
});

const NftProvider = NftContext.Provider;
const NftConsumer = NftContext.Consumer;

export { NftProvider, NftConsumer };

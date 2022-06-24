import { settings } from "@/utils/settings";
import { useToast } from "@chakra-ui/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { createContext, useEffect, useState } from "react";


export const marketplaceContext = createContext({
    allListings: [],
    isLoading: false,
    isFetching: false,
    buyoutListing: (listingId : string) => {},
    buyoutLoading: false,
});

const Provider = marketplaceContext.Provider;
export const MarketplaceConsumer = marketplaceContext.Consumer;



interface IMarketplaceProvider {
    children: React.ReactNode;
}

export default function MarketplaceProvider(props : IMarketplaceProvider) {
    const marketplace = useMarketplace(settings.marketplace)
    const [allListings, setAllListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [buyoutLoading, setBuyoutLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if(allListings.length === 0) {
        setIsLoading(true);
        marketplace?.getAllListings().then(listings => {
            setAllListings(listings as any);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }
    }, [marketplace,allListings])

    const buyoutListing = (listingId: string) : void => {
            setBuyoutLoading(true);
            marketplace?.buyoutListing(listingId, 1).then((r) => {
                console.log(r);
                setAllListings([])
                setBuyoutLoading(false);
                toast({
                    title: "Success",
                    description: "Listing has been bought out",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }).catch(err => {
                console.log(err);
                setBuyoutLoading(false);
                toast({
                    title: "Error",
                    description: "Listing could not be bought out",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        )
    }
    
    const value = {
        allListings,
        isLoading,
        isFetching,
        buyoutListing,
        buyoutLoading,
    }

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}


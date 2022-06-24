import { settings } from "@/utils/settings";
import { useMarketplace } from "@thirdweb-dev/react";
import { createContext, useEffect, useState } from "react";


const marketplace = createContext({
    allListings: [],
    isLoading: false,
    isFetching: false,
});

const Provider = marketplace.Provider;
export const MarketplaceConsumer = marketplace.Consumer;



interface IMarketplaceProvider {
    children: React.ReactNode;
}

export default function MarketplaceProvider(props : IMarketplaceProvider) {
    const marketplace = useMarketplace(settings.marketplace)
    const [allListings, setAllListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if(allListings.length === 0) {
        console.log("marketplace", marketplace);
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
    
    const value = {
        allListings,
        isLoading,
        isFetching,
    }

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}


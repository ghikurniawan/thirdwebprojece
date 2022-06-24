import { NftProvider } from "@/contexts/nftContext";
import { settings } from "@/utils/settings";
import { useAddress, useContract, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
  
type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
};


export default function NftProviders (props : LayoutProps) {
const [metadataAll, setMetadataAll] = useState(Array<any>())
const signer = useSigner();
const address = useAddress();
const [metadataOwned, setMetadataOwned] =  useState(Array<any>())
const [noNFT, setNoNFT] = useState(true)
const [skeleton, setSkeleton] = useState(true)

const {
    contract,
    isLoading,
    isFetching,
    status,
    isRefetching
  } = useContract(settings.contractAddress)

  useEffect(() => {
    if(signer) {
        setMetadataOwned([])
        setNoNFT(true)
        setSkeleton(true)
        console.log('signer', signer)
    }
  }, [signer])

useEffect(() => {
  if(!address) return;
  if(!signer) return;
  if(status === "success" && metadataOwned.length === 0){
    contract?.nft?.query?.owned?.all(address)
    .then(res => {
      if(res.length !== 0){
        setMetadataOwned(res)
        setSkeleton(false)
        setNoNFT(false)
        console.log("nft Count ", res.length)
      }else{
        console.log("nft Count -> ", res.length)
        setNoNFT(true)
        setSkeleton(false)
      }
    })
    .catch(err => {
      console.log("refetch")
    })
  }
}, [address, metadataOwned, contract, status, signer]);


  useEffect(() => {
    if(status === "success" && metadataAll.length === 0){
      contract?.nft?.query?.all({ start: 0, count: 50 })
      .then(res => {
        setMetadataAll(res)
        setSkeleton(false)
        console.log("All NFT", res?.length)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [status , metadataAll, contract]);

    const nftValue = {
        nftOwned: metadataOwned,
        nftAll : metadataAll,
        isLoading,
        isFetching,
        isRefetching,
        noNFT,
        skeleton
    }
  return (
    <NftProvider value={nftValue as any}>
      {props.children}
    </NftProvider>
  );
}
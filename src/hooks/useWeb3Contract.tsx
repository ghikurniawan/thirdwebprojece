import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import MerkleTree from "merkletreejs";
import {settings} from "@/utils/settings";

import { useState } from "react";

export default function useWeb3Contract(){
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isError, setIsError] = useState(false)
    const [mintSuccess, setMintSuccess] = useState(false)
    const [data, setData] = useState(null)

    const {contract, isLoading } = useContract(settings.contractAddress);

    const refreshState = () => {
      setError('')
      setIsError(false)
      setData(null)
      setMintSuccess(false)
    }

    interface whitelistMintArgs {
      amount: number,
      airdrop: Array<string>,
      address: string,
      whitelisPriceSaleUnit: number,
    }

    const handleWhitelistMint = async ({airdrop, address, whitelisPriceSaleUnit, amount} : whitelistMintArgs) => {
      if(!address) return;
      setLoading(true)
      const leaves = airdrop.map(x => ethers.utils.keccak256(x))
      const tree = new MerkleTree(leaves, ethers.utils.keccak256, {
          sortLeaves: true,
          sortPairs: true
      })
  
      const root = tree.getHexRoot()
      const leaf = ethers.utils.keccak256(address)
      const hexProof = tree.getHexProof(leaf)
      let verif = tree.verify(hexProof, leaf, root)
  
      console.log("verify Wl -> ", verif)

      const merkeRootFromBlockChain = await getMerkleRoot()
      const balance = await getBalanceOf(address)
      const maxWl = await getMaxOfWhitelistMint()

      if(verif && merkeRootFromBlockChain === root){

        if(balance?.toNumber() <= maxWl?.toNumber() && balance?.toNumber() + amount <= maxWl.toNumber()){

            console.log("root -> ", root)
            console.log("proof -> ", JSON.stringify(hexProof))

            let costBN = ethers.BigNumber.from(String(whitelisPriceSaleUnit * amount))
            const gas = await contract?.estimator.currentGasPriceInGwei()
            contract?.interceptor.overrideNextTransaction(() => ({
              gasPrice: gas,
              value: ethers.utils.hexValue(costBN).toString(),
            }));

            contract?.call("whitelistMint", hexProof, amount)
                    .then(res => {
                      setLoading(false)
                      setMintSuccess(true)
                      setData(res.receipt)
                    }).catch(err => {
                      const e = [err]
                      setLoading(false)
                      setIsError(true)
                      setError(e[0].reason || err.message)
                      setData(e[0].transaction)
                      console.error("err -> ", e[0].reason || err.message)
                    })

          }else{
            setLoading(false)
            setIsError(true)
            setError("Max whitelist mint reached")
          }

      }else{
        setLoading(false)
        setIsError(true)
        setError("You are not whitelisted")
        console.log("merkeRootFromBlockChain -> ", merkeRootFromBlockChain)
        console.log("merkleRootLocal -> ", root)
      }
    }

    interface handlePublicMintArgs {
      address: string,
      publicPriceSaleUnit: number,
      amount: number,
    }

    const handlePublicMint = async ({address, publicPriceSaleUnit, amount} : handlePublicMintArgs) => {
      if(!address) return;
      setLoading(true)

      let costBN = ethers.BigNumber.from(String(publicPriceSaleUnit * amount))
      const gas = await contract?.estimator.currentGasPriceInGwei()
      contract?.interceptor.overrideNextTransaction(() => ({
        gasPrice: gas,
        value: ethers.utils.hexValue(costBN).toString(),
      }));

      contract?.call("mint", amount)
      .then(res => {
        setLoading(false)
        setMintSuccess(true)
      }).catch(err => {
        setLoading(false)
        setIsError(true)
        setError(err.message)
      })
    }
    
    
    const checkPublicSale = async () => {
        try{
            const res = await contract?.call("publicSale")
            return res
        }catch(e){
          console.log("checkPublicSale ->", e)
        }
      }

    const getNftCollectionName = async () => {
        try{
            const res = await contract?.call("name")
            return res
        }catch(e){
          console.log("getNftCollectionName ->", e)
        }
      }

    const getBalanceOf = async (address: string) => {
        try{
            const res = await contract?.call("balanceOf", address)
            return res
        }catch(e){
          console.log("balanceOF ->", e)
        }
      }
    
    const checkWhitelistSale = async () => {
      try{
          const res = await contract?.call("whiteListSale")
          return res
      }catch(e){
        console.log("isWhitelistMint ->", e)
      }
    }

    const getMerkleRoot = async () => {
      try{
          const res = await contract?.call("getMerkleRoot")
          return res
      }catch(e){
        console.log("isWhitelistMint ->", e)
      }
    }
    
      const checkPausedMint = async () => {
        try{
            const res = await contract?.call("pause")
            return res  
        }catch(e){
          console.log("checkPausedMint ->", e)
        }
      }
    
      const getWhitelistPriceSale = async () => {
        try{
          const res = await contract?.call("WHITELIST_SALE_PRICE")
            return res
        }catch(e){
          console.log("getWhitelistPriceSale ->", e)
        }
      }
    
      const getPublicPriceSale = async () => {
        try{
          const res = await contract?.call("PUBLIC_SALE_PRICE")
          return res
        }catch(e){
          console.log("getPublicPriceSale ->", e)
        }
      }
    
      const getSupplyMint = async () => {
        try{
          const res = await contract?.call("totalSupply")
          return res
        }catch(e){
          console.log("getSupplyMint catch ->", e)
        }
      }
      
      const getMaxOfSupply = async () => {
        try{
          const res = await contract?.call("MAX_SUPPLY")
          return res
        }catch(e){
          console.log("getMaxOfSupply catch ->", e)
        }
      }
    
      const getMaxOfWhitelistMint = async () => {
        try{
          const res = await contract?.call("MAX_WHITELIST_MINT")
            return res
        }catch(e){
          console.log("getMaxOfWhitelistMint catch ->", e)
        }
      }

      return {loading, isLoading, error, isError, mintSuccess, data,
        getBalanceOf,
        getNftCollectionName,
        refreshState , handleWhitelistMint, handlePublicMint, checkWhitelistSale, 
        checkPublicSale, checkPausedMint, getWhitelistPriceSale, getPublicPriceSale, 
        getSupplyMint, getMaxOfSupply, getMaxOfWhitelistMint}
}
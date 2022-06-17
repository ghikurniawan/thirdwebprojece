import { ChainId, IpfsStorage, SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";

export const alchemyUrlMap: Record<SUPPORTED_CHAIN_ID, string> = {
    [ChainId.Mainnet]:
      process.env.NEXT_PUBLIC_RPC_MAINNET ||
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Rinkeby]:
      process.env.NEXT_PUBLIC_RPC_RINKEBY ||
      `https://eth-rinkeby.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Goerli]:
      process.env.NEXT_PUBLIC_RPC_GOERLI ||
      `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Polygon]:
      process.env.NEXT_PUBLIC_RPC_POLYGON ||
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Mumbai]:
      process.env.NEXT_PUBLIC_RPC_MUMBAI ||
      `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Fantom]:
      process.env.NEXT_PUBLIC_RPC_FANTOM || "https://rpc.ftm.tools",
    [ChainId.FantomTestnet]:
      process.env.NEXT_PUBLIC_RPC_FANTOM_TESTNET ||
      "https://rpc.testnet.fantom.network",
    [ChainId.Avalanche]:
      process.env.NEXT_PUBLIC_RPC_AVALANCHE || "https://rpc.ankr.com/avalanche",
    [ChainId.AvalancheFujiTestnet]:
      process.env.NEXT_PUBLIC_RPC_AVALANCHE_FUJI_TESTNET ||
      "https://api.avax-test.network/ext/bc/C/rpc",
    [ChainId.Optimism]:
      process.env.NEXT_PUBLIC_RPC_OPTIMISM ||
      `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.OptimismTestnet]:
      process.env.NEXT_PUBLIC_RPC_OPTIMISM_TESTNET ||
      `https://opt-kovan.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.Arbitrum]:
      process.env.NEXT_PUBLIC_RPC_ARBITRUM ||
      `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    [ChainId.ArbitrumTestnet]:
      process.env.NEXT_PUBLIC_RPC_ARBITRUM_TESTNET ||
      `https://arb-rinkeby.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  };

  export const StorageSingleton = new IpfsStorage(
    process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
  );
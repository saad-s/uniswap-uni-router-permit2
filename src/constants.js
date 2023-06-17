import { ethers } from 'ethers';
import { Token, ChainId } from '@uniswap/sdk-core';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk';
import 'dotenv/config';

export const walletAddress = process.env.WALLET_ADDRESS;

export function getEthersProvider() {
  return new ethers.providers.JsonRpcProvider(`${process.env.RPC_URL}`);
}

export function getSigner() {
  return new ethers.Wallet(`${process.env.WALLET_SECRET}`, getEthersProvider());
}

export const chainId =
  (await getEthersProvider().getNetwork().chainId) === 1
    ? ChainId.MAINNET
    : ChainId.GOERLI;

export const uniswapRouterAddress =
  process.env.UNISWAP_ROUTER === 'UNIVERSAL'
    ? UNIVERSAL_ROUTER_ADDRESS(chainId)
    : SWAP_ROUTER_02_ADDRESSES(chainId);

export const WETH = new Token(
  chainId,
  chainId === ChainId.MAINNET
    ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    : '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // goerli
  18,
  'WETH',
  'Wrapped Ether'
);

export const UNI = new Token(
  chainId,
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  18,
  'UNI',
  'Uniswap'
);

export const USDT = new Token(
  chainId,
  chainId === ChainId.MAINNET
    ? '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    : '0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49', // goerli
  6,
  'USDT',
  'USD Tether'
);

export const DAI = new Token(
  chainId,
  chainId === ChainId.MAINNET
    ? ''
    : '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844', // goerli
  18,
  'DAI',
  'Dai Stablecoin'
);

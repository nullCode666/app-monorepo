
import { type GraphPoint } from 'react-native-graph';

import type { ApprovalItemData } from '@/core/views/wallet/containers/ApprovalItem';
import type { HistoryActivityItemData } from '@/core/views/wallet/containers/HistoryActivityItem';
import type { TokenItemData } from '@/core/views/wallet/containers/TokenItem';

export const NETWORK_LIST = [
  { id: 'bitcoin', name: 'Bitcoin', logo: 'https://i.meee.com.tw/WhPy9gB.png' },
  { id: 'ethereum', name: 'Ethereum', logo: 'https://i.meee.com.tw/KYz6bvu.png' },
  { id: 'bnb', name: 'BNB Smart Chain', logo: 'https://i.meee.com.tw/7H1mnlX.png' },
  { id: 'solana', name: 'Solana', logo: 'https://i.meee.com.tw/whBEfyB.png' },
  { id: 'tron', name: 'Tron', logo: 'https://i.meee.com.tw/lwe499I.png' },
  { id: 'arb', name: 'Arbitrum', logo: 'https://i.meee.com.tw/7BqnLw8.png' },
  { id: 'base', name: 'Base', logo: 'https://i.meee.com.tw/w2QIPH3.png' },
  { id: 'polygon', name: 'Polygon', logo: 'https://i.meee.com.tw/Dvx2udU.png' },
  { id: 'sui', name: 'Sui', logo: 'https://i.meee.com.tw/UxgRIdC.png' },
] as const;

const NETWORK_LOGOS = NETWORK_LIST.map(network => network.logo);

export const POINTS = [
  {'date': new Date('2024-12-31T16:00:00.000Z'),'value':111.15},
  {'date': new Date('2024-12-31T17:00:00.000Z'),'value':62.0},
  {'date': new Date('2024-12-31T18:00:00.000Z'),'value':82.0},
  {'date': new Date('2024-12-31T19:00:00.000Z'),'value':77.86},
  {'date': new Date('2024-12-31T20:00:00.000Z'),'value':118.92},
  {'date': new Date('2024-12-31T21:00:00.000Z'),'value':114.14},
  {'date': new Date('2024-12-31T22:00:00.000Z'),'value':131.37},
  {'date': new Date('2024-12-31T23:00:00.000Z'),'value':66.96},
  {'date': new Date('2025-01-01T00:00:00.000Z'),'value':93.75},
  {'date': new Date('2025-01-01T01:00:00.000Z'),'value':62.38},
  {'date': new Date('2025-01-01T02:00:00.000Z'),'value':77.49},
  {'date': new Date('2025-01-01T03:00:00.000Z'),'value':100.43},
] as GraphPoint[];

const RAW_TOKEN_LIST: TokenItemData[] = [
  // ---------- Bitcoin ----------
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    multiple: true,
    price: '$110,632.00',
    change: 0.64,
    balance: '0',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
  },
  // ---------- Tron ----------
  {
    id: 'trx-tron',
    symbol: 'TRX',
    name: 'Tron',
    price: '$0.2963',
    change: 0.35,
    balance: '7.000002',
    balanceFiat: '$2.07',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address--1720669765494.png',
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    price: '$0.9998',
    multiple: true,
    change: 0.00,
    balance: '0',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address-TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8-1720669173910.png',
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    multiple: true,
    price: '$0.9998',
    change: 0.02,
    balance: '2.1',
    balanceFiat: '$2.10',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address-TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t-1720668500740.png',
  },
  {
    id: 'strx-tron',
    symbol: 'sTRX',
    price: '$0.3727',
    name: 'Sun TRX',
    multiple: false,
    change: 1.52,
    balance: '57.314190872130258348',
    balanceFiat: '$21.36',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address-TU3kjFuhtEo42tsCBtfYUAZxoqQ4yuSLQ5.png',
  },
  // ---------- Ethereum (evm--1) ----------
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,901.15',
    change: 1.26,
    multiple: false,
    balance: '0.005237245064042411',
    balanceFiat: '$20.43',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address--1751363512633.png',
  },
  {
    id: 'usde',
    symbol: 'USDe',
    price: '$0.9990',
    name: 'Sun USD',
    change: 0.03,
    multiple: false,
    balance: '10.008592327741303105',
    balanceFiat: '$10.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x4c9edd5852cd905f086c759e8383e09bff1e68b3-1750909859995.png',
  },
  {
    id: 'usdc-eth',
    symbol: 'USDC',
    name: 'USD Coin',
    price: '$0.9998',
    change: 0.01,
    multiple: false,
    balance: '10',
    balanceFiat: '$9.998',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-1749190981666.png',
  },
  {
    id: 'husdt',
    symbol: 'hUSDT',
    name: 'Heco USDT',
    price: '$1.0266',
    change: 0.02,
    multiple: false,
    balance: '7.648706601320636828',
    balanceFiat: '$7.85',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xa71d08a159258553a5ac190d60fa919425ff02ea-1737423880025.png',
  },
  {
    id: 'hwbct',
    symbol: 'hWBTC',
    name: 'Heco WBTC',
    price: '$110,971.89',
    change: 0.41,
    multiple: false,
    balance: '0.000063413677975981',
    balanceFiat: '$7.04',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xc82b74bc114d7e2d4047ccf14f7a6109b654ab91-1737424007151.png',
  },
  {
    id: 'weth',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    price: '$3,901.35',
    change: 1.27,
    multiple: false,
    balance: '0.001252938085448325',
    balanceFiat: '$4.89',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-1720667871986.png',
  },
  {
    id: 'husdc',
    symbol: 'hUSDC',
    name: 'Heco USD Coin',
    price: '$1.0536',
    change: 0.01,
    multiple: false,
    balance: '4.108573266486921288',
    balanceFiat: '$4.33',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x974c8fbf4fd795f66b85b73ebc988a51f1a040a9-1737423811931.png',
  },
  {
    id: 'steth',
    symbol: 'stETH',
    name: 'Lido Staked Ether',
    price: '$3,900.11',
    change: 1.30,
    multiple: false,
    balance: '0.001032505708852301',
    balanceFiat: '$4.03',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png',
  },
  {
    id: 'hcb-btc',
    symbol: 'hcbBTC',
    name: 'Heco BTC',
    price: '$221,819.39',
    change: 0.68,
    multiple: false,
    balance: '0.000016592144647156',
    balanceFiat: '$3.68',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xba04de02ed8cecc3befb8575a95d56d901c9c602-1737423972373.png',
  },
  {
    id: 'hdai',
    symbol: 'hDAI',
    price: '$1.0410',
    name: 'Heco DAI',
    change: -0.03,
    multiple: false,
    balance: '3.226864557542895011',
    balanceFiat: '$3.36',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x42d425fb918acbbd73b10b851979e8fc469b3e9a-1737423910689.png',
  },
  {
    id: 'hweth',
    symbol: 'hWETH',
    price: '$3,960.75',
    name: 'Heco WETH',
    change: 1.27,
    multiple: false,
    balance: '0.000749748128825082',
    balanceFiat: '$2.97',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x6aca9d74215e9512d9608aff3e87dac0d9ce6218-1737423936412.png',
  },
  {
    id: 'dai-eth',
    symbol: 'DAI',
    price: '$0.9995',
    name: 'Ethereum DAI',
    change: -0.02,
    multiple: false,
    balance: '2.756516900436872851',
    balanceFiat: '$2.76',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x6b175474e89094c44da98b954eedeac495271d0f.png',
  },
  {
    id: 'wbtc-eth',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    price: '$110,603.00',
    change: 0.41,
    multiple: false,
    balance: '0.00002121',
    balanceFiat: '$2.35',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
  },
  {
    id: 'aethusdt',
    symbol: 'aEthUSDT',
    name: 'aEthUSDT',
    price: '$0.9995',
    change: -0.02,
    multiple: false,
    balance: '2.039622',
    balanceFiat: '$2.04',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x23878914efe38d27c4d67ab83ed1b93a74d4086a.png',
  },
  {
    id: 'reusdc',
    symbol: 'reUSDC',
    name: 'Renzo USD Coin',
    price: '$1.0920',
    change: 0.03,
    multiple: false,
    balance: '0.932920905697583013',
    balanceFiat: '$1.02',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x0f359fd18bda75e9c49bc027e7da59a4b01bf32a-1734422400405.png',
  },
  {
    id: 'morpho',
    symbol: 'MORPHO',
    name: 'Morpho',
    price: '$2.02',
    change: 0.76,
    multiple: false,
    balance: '0.450297674979350567',
    balanceFiat: '$0.91',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x58d97b57bb95320f9a05dc918aef65434969c2b2-1732155300090.png',
  },
  {
    id: 'ftm-eth',
    symbol: 'FTM',
    price: '$0.1432',
    name: 'Fantom',
    change: 0.22,
    multiple: false,
    balance: '0.7206594280496844',
    balanceFiat: '$0.10',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0x4e15361fd6b4bb609fa63c81a2be19d873717870.png',
  },

  // ---------- Solana ----------
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: '$187.40',
    change: 1.03,
    multiple: false,
    balance: '0.01185488',
    balanceFiat: '$2.22',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address--1758104080638.png',
  },
  {
    id: 'pst-sol',
    symbol: 'PST',
    name: 'PST',
    price: '$1.0560',
    change: 0.09,
    multiple: false,
    balance: '1.497355',
    balanceFiat: '$1.58',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-59obFNBzyTBGowrkif5uK7ojS58vsuWz3ZCvg6tfZAGw-1758105840400.png',
  },
  {
    id: 'ray',
    symbol: 'RAY',
    name: 'Raydium',
    price: '$1.6800',
    change: 2.41,
    multiple: false,
    balance: '0.253929',
    balanceFiat: '$0.43',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R-1758104080638.png',
  },
  {
    id: 'jup',
    symbol: 'JUP',
    name: 'Jupiter',
    price: '$0.4165',
    change: 2.04,
    multiple: false,
    balance: '0.827822',
    balanceFiat: '$0.34',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN-1758104080638.png',
  },
  {
    id: 'huma-sol',
    symbol: 'HUMA',
    name: 'Huma',
    price: '$0.024111',
    change: 0.35,
    multiple: false,
    balance: '7.447945',
    balanceFiat: '$0.18',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-HUMA1821qVDKta3u2ovmfDQeW2fSQouSKE8fkF44wvGw-1758104099246.png',
  },
  {
    id: 'zbcn',
    symbol: 'ZBCN',
    name: 'ZBCN',
    price: '$0.003603',
    change: -2.94,
    multiple: false,
    balance: '3.3',
    balanceFiat: '$0.01',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-ZBCNpuD7YMXzTHB2fhGkGi78MNsHGLRXUhRewNRm9RU-1758104092150.png',
  },
  {
    id: 'bonk',
    symbol: 'Bonk',
    name: 'Bonk',
    price: '$0.000014',
    change: 2.03,
    multiple: false,
    balance: '21',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263-1758104092150.png',
  },
  {
    id: 'wen',
    symbol: 'WEN',
    name: 'WEN',
    price: '$0.00002669',
    change: -1.40,
    multiple: false,
    balance: '0.71525',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk-1758104096089.png',
  },
  {
    id: 'jto',
    symbol: 'JTO',
    name: 'JTO',
    price: '$0.956857',
    change: 4.24,
    multiple: false,
    balance: '0.000000001',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL-1758104124917.png',
  },
  {
    id: 'usdt-sol',
    symbol: 'USDT',
    name: 'Solana USDT',
    price: '$0.9998',
    change: 0.02,
    multiple: false,
    balance: '0',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB-1758104080638.png',
  },
  {
    id: 'usdc-sol',
    symbol: 'USDC',
    name: 'Solana USDC',
    price: '$0.9998',
    change: 0.01,
    multiple: false,
    balance: '0',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address-EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v-1758104080638.png',
  },

  // ---------- BSC (evm--56) ----------
  {
    id: 'pusdt-bsc',
    symbol: 'pUSDT',
    price: '$1.0227',
    change: -0.00,
    name: 'PancakeSwap USDT',
    multiple: false,
    balance: '4.873144481416634137',
    balanceFiat: '$4.98',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-0xeb4f6ffb1038e1cca701e7d53083b37ec5b6ba33-1760692297893.png',
  },
  {
    id: 'usdc-bsc',
    symbol: 'USDC',
    price: '$0.9998',
    change: -0.00,
    name: 'BSC USDC',
    multiple: false,
    balance: '0.960037',
    balanceFiat: '$0.96',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d-1720669239205.png',
  },
  {
    id: 'dusd-bsc',
    symbol: 'DUSD',
    price: '$0.9992',
    change: 0.02,
    name: 'DUSD',
    multiple: false,
    balance: '0.36349',
    balanceFiat: '$0.36',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-0xaf44a1e76f56ee12adbb7ba8acd3cbd474888122-1757703795960.png',
  },
  {
    id: 'corx-bsc',
    symbol: 'CORX',
    price: '$0.007178',
    change: 4.03,
    name: 'CORX',
    multiple: false,
    balance: '1',
    balanceFiat: '$0.01',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-0xf9a2e332b1ecd3d6ab51618432d68c8d5995c992-1757703762513.png',
  },
  {
    id: 'btcb-bsc',
    symbol: 'BTCB',
    price: '$110,646.00',
    change: 0.56,
    name: 'BSC BTCB',
    multiple: false,
    balance: '0.000000003281274412',
    balanceFiat: '$0.00',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png',
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    price: '$1,091.44',
    change: 0.62,
    name: 'BSC BNB',
    multiple: false,
    balance: '0.000786661270000016',
    balanceFiat: '$0.86',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--56/tokens/address-.png',
  },

  // ---------- Polygon (evm--137) ----------
  {
    id: 'pol',
    symbol: 'POL',
    price: '$0.1947',
    change: 5.61,
    multiple: false,
    balance: '27.59583840360658493',
    balanceFiat: '$5.37',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--137/tokens/address--1720669850773.png',
  },
  {
    id: 'usdc-polygon',
    symbol: 'USDC',
    price: '$0.9998',
    change: 0.01,
    name: 'Polygon USDC',
    multiple: false,
    balance: '1.026876',
    balanceFiat: '$1.03',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--137/tokens/address-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359-1720669265327.png',
  },
  {
    id: 'usdt-polygon',
    symbol: 'USDT',
    price: '$0.9999',
    change: 0.02,
    name: 'Polygon USDT',
    multiple: false,
    balance: '0.036975',
    balanceFiat: '$0.04',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--137/tokens/address-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-1720668692077.png',
  },
  // ---------- HyperEVM (evm--999) ----------
  {
    id: 'hype',
    symbol: 'HYPE',
    price: '$43.20',
    change: -0.44,
    name: 'Hype',
    multiple: false,
    balance: '0.351442138057932663',
    balanceFiat: '$15.18',
    image: 'https://uni.onekey-asset.com/server-service-onchain/evm--999/tokens/native.png',
  },
];

export const TOKEN_LIST: TokenItemData[] = RAW_TOKEN_LIST.map((token, index) => ({
  ...token,
  networkLogo: NETWORK_LOGOS[index % NETWORK_LOGOS.length],
}));

export const NFTS = [
  {
    id: 'ten-years',
    name: 'Ten Years Of Ethereum',
    collection: 'Ten Years Of Ethereum',
    backgroundColor: '#F4D1FF',
    artworkLabel: 'ETH',
    badgeLabel: 'L2',
  },
  {
    id: 'lido-withdrawal',
    name: 'Lido Withdrawal NFT',
    collection: 'Lido: stETH Withdrawal',
    backgroundColor: '#1C1C1E',
    badgeLabel: 'L2',
  },
  {
    id: 'paper',
    name: 'Paper',
    collection: 'ERC1155',
    backgroundColor: '#FDE68A',
    artworkLabel: 'PPR',
    quantity: 'x10',
    badgeLabel: 'L2',
  },
  {
    id: 'bit-fox',
    name: 'BIT FOX NFT v1.02',
    collection: 'All Art Collection',
    backgroundColor: '#BFDBFE',
    artworkLabel: 'FOX',
    badgeLabel: 'L2',
  },
  {
    id: 'placeholder-one',
    name: 'Mystery Collectible',
    collection: 'Unknown',
    backgroundColor: '#2F2F33',
    artworkLabel: '---',
  },
  {
    id: 'placeholder-two',
    name: 'Coming Soon',
    collection: 'Unknown',
    backgroundColor: '#2F2F33',
    artworkLabel: '---',
  },
  {
    id: 'placeholder-3',
    name: 'Mystery Collectible',
    collection: 'Unknown',
    backgroundColor: '#2F2F33',
    artworkLabel: '---',
  },
  {
    id: 'placeholder-4',
    name: 'Coming Soon',
    collection: 'Unknown',
    backgroundColor: '#2F2F33',
    artworkLabel: '---',
  },
  {
    id: 'placeholder-5',
    name: 'Coming Soon',
    collection: 'Unknown',
    backgroundColor: '#2F2F33',
    artworkLabel: '---',
  },
] as const;

export type ReceiveTokenOption = {
  id: string;
  symbol: string;
  name: string;
  network: string;
  amount: string;
  fiatValue: string;
  image: string;
};

export const RECEIVE_TOKEN_OPTIONS: ReceiveTokenOption[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    network: 'Multichain',
    amount: '0.004821',
    fiatValue: '$16.83',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address--1751363512633.png',
  },
  {
    id: 'btc-xpub',
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'Bitcoin',
    amount: '0.0001136',
    fiatValue: '$11.86',
    image: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
  },
  {
    id: 'trx-tron',
    symbol: 'TRX',
    name: 'Tron',
    network: 'Tron',
    amount: '37.1619',
    fiatValue: '$10.41',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address--1720669765494.png',
  },
  {
    id: 'rbtc-rootstock',
    symbol: 'RBTC',
    name: 'Rootstock Mainnet',
    network: 'Rootstock',
    amount: '0.00007776',
    fiatValue: '$8.08',
    image: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
  },
  {
    id: 'btc-merlin',
    symbol: 'BTC',
    name: 'BTC',
    network: 'Merlin',
    amount: '0.00006969',
    fiatValue: '$7.27',
    image: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
  },
  {
    id: 'usdc-eth',
    symbol: 'USDC',
    name: 'USD Coin',
    network: 'Multichain',
    amount: '6.5822',
    fiatValue: '$6.58',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-1749190981666.png',
  },
  {
    id: 'astr-astar',
    symbol: 'ASTR',
    name: 'Astar',
    network: 'Astar',
    amount: '445.3208',
    fiatValue: '$6.36',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--592/tokens/address-0x577d296678535e4903d59a4c929b718e1d575e0a-1720668478295.png',
  },
  {
    id: 'kas',
    symbol: 'KAS',
    name: 'Kaspa',
    network: 'Kaspa',
    amount: '129.8687',
    fiatValue: '$5.73',
    image: 'https://uni.onekey-asset.com/server-service-indexer/kaspa--0/tokens/address--1723005440376.png',
  },
  {
    id: 'usdt-eth',
    symbol: 'USDT',
    name: 'Tether',
    network: 'Multichain',
    amount: '4.7136',
    fiatValue: '$4.71',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address-0xdac17f958d2ee523a2206206994597c13d831ec7-1720668559737.png',
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'Ripple',
    network: 'Ripple',
    amount: '2.0659',
    fiatValue: '$4.63',
    image: 'https://uni.onekey-asset.com/server-service-indexer/xrp--0/tokens/address--1720668851198.png',
  },
  {
    id: 'bch',
    symbol: 'BCH',
    name: 'Bitcoin Cash',
    network: 'Bitcoin Cash',
    amount: '0.008181',
    fiatValue: '$4.07',
    image: 'https://uni.onekey-asset.com/server-service-indexer/bch--0/tokens/address--1720668152194.png',
  },
];

export type AddressNetworkAddress = {
  id: string;
  name: string;
  address: string;
  note?: string;
};

export type AddressNetwork = {
  id: string;
  label: string;
  network: string;
  description?: string;
  image: string;
  addresses: AddressNetworkAddress[];
};

export const ADDRESS_NETWORKS: AddressNetwork[] = [
  {
    id: 'evm',
    label: '以太坊及 EVM 网络',
    network: 'Ethereum Mainnet',
    description: '适用于 EVM 生态的地址，包括以太坊、Arbitrum、Base 等网络。',
    image: 'https://uni.onekey-asset.com/server-service-indexer/evm--1/tokens/address--1751363512633.png',
    addresses: [
      {
        id: 'evm-primary',
        name: '主地址',
        address: '0x5618…B4b7',
        note: '常规收款地址，可用于大部分 EVM 网络。',
      },
      {
        id: 'evm-hardware',
        name: '硬件钱包',
        address: '0xA1c9…87F2',
        note: '连接硬件钱包生成的安全地址。',
      },
    ],
  },
  {
    id: 'btc',
    label: '比特币网络',
    network: 'Bitcoin',
    description: '根据需求选择 Taproot 或 SegWit 地址进行收款。',
    image: 'https://uni.onekey-asset.com/server-service-indexer/btc--0/tokens/address-.png',
    addresses: [
      {
        id: 'btc-taproot',
        name: 'Taproot 地址',
        address: 'bc1p9h…q2nx',
        note: '推荐用于低手续费与更佳的隐私保护。',
      },
      {
        id: 'btc-segwit',
        name: 'SegWit 地址',
        address: 'bc1q4l…s9af',
        note: '兼容性最佳，可在大部分交易所使用。',
      },
    ],
  },
  {
    id: 'tron',
    label: '波场网络',
    network: 'Tron Mainnet',
    description: '用于接收 TRX、USDT-TRC20 等波场资产。',
    image: 'https://uni.onekey-asset.com/server-service-indexer/tron--0x2b6653dc/tokens/address--1720669765494.png',
    addresses: [
      {
        id: 'tron-main',
        name: '主地址',
        address: 'TNz5d…V3Ue',
        note: 'TRX 与 TRC20 通用地址。',
      },
    ],
  },
  {
    id: 'sol',
    label: '索拉纳网络',
    network: 'Solana Mainnet',
    description: 'Solana 生态资产（如 SOL、USDC-SPL）的统一地址。',
    image: 'https://uni.onekey-asset.com/server-service-indexer/sol--101/tokens/address--1758104080638.png',
    addresses: [
      {
        id: 'sol-main',
        name: '主地址',
        address: '6VJf…d3qK',
        note: '请确保发送 SPL 资产以避免损失。',
      },
    ],
  },
];

export type WalletSelectorTag = {
  id: string;
  label: string;
  tone?: 'default' | 'positive' | 'negative';
};

export type WalletSelectorWarning = {
  id: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
};

export type WalletSelectorWallet = {
  id: string;
  name: string;
  type: 'hot' | 'watch' | 'hardware';
  balanceFiat: string;
  iconColor: string;
  iconSymbol: string;
  isCurrent?: boolean;
  tags?: WalletSelectorTag[];
  warnings?: WalletSelectorWarning[];
};

export const WALLET_SELECTOR_WALLETS: WalletSelectorWallet[] = [
  {
    id: 'my-wallet',
    name: 'My Wallet',
    type: 'watch',
    balanceFiat: '¥0',
    iconColor: '#F59E0B',
    iconSymbol: 'MW',
    tags: [
      { id: 'watch', label: '无私钥' },
      { id: 'backup', label: '已备份', tone: 'positive' },
    ],
  },
  {
    id: 'wallet-1',
    name: 'Wallet 1',
    type: 'hot',
    balanceFiat: '¥3.27',
    iconColor: '#34D399',
    iconSymbol: 'W1',
    isCurrent: true,
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-1-warning', message: '1 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-2',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-3',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-4',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-5',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-6',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
  {
    id: 'wallet-7',
    name: 'Wallet 2',
    type: 'hot',
    balanceFiat: '¥418.69',
    iconColor: '#F97316',
    iconSymbol: 'W2',
    tags: [{ id: 'mnemonic', label: '助记词' }],
    warnings: [
      { id: 'wallet-2-warning', message: '2 个高风险授权', severity: 'high' },
    ],
  },
];

export const WALLET_SELECTOR_TOTAL = {
  title: '投资组合',
  amount: '¥3.27',
};

export const APPROVALS: ApprovalItemData[] = [
  {
    id: 'usdc-risk',
    token: { symbol: 'USDC', color: '#2775CA', badge: 'Wallet 2' },
    amount: '0.099994',
    asset: 'USDC',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: '未知',
    spender: '0x0000…C22734',
    riskMessage: '此项授权具有较高风险。',
    actionLabel: '撤销',
  },
  {
    id: 'dai-risk',
    token: { symbol: 'DAI', color: '#F5AC37', badge: 'Wallet 2' },
    amount: '0.019354',
    asset: 'DAI',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: '未知',
    spender: '0x0000…C22734',
    riskMessage: '此项授权具有较高风险。',
    actionLabel: '撤销',
  },
  {
    id: 'bfp-risk',
    token: { symbol: 'BFP', color: '#F43F5E', badge: 'Wallet 1' },
    amount: '2,990,564,425.59266',
    asset: 'BFP',
    wallet: 'Wallet 1 (0x73d0…36A8)',
    protocol: '未知',
    spender: '0x1B19…E69046',
    riskMessage: '此项授权具有较高风险。',
    actionLabel: '撤销',
  },
  {
    id: 'usdc-unlimited',
    token: { symbol: 'USDC', color: '#2775CA', badge: 'Wallet 2' },
    amount: '无上限',
    asset: 'USDC',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: '1inch',
    spender: '0x1111…842A65',
  },
  {
    id: 'usdt-okx',
    token: { symbol: 'USDT', color: '#26A17B', badge: 'Wallet 2' },
    amount: '0.037963',
    asset: 'USDT',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: 'OKX DEX',
    spender: '0x2c34…b7cDD6',
  },
  {
    id: 'usdc-okx',
    token: { symbol: 'USDC', color: '#2775CA', badge: 'Wallet 2' },
    amount: '0.62372',
    asset: 'USDC',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: 'OKX DEX',
    spender: '0x2c34…b7cDD6',
  },
  {
    id: 'dai-okx',
    token: { symbol: 'DAI', color: '#F5AC37', badge: 'Wallet 2' },
    amount: '无上限',
    asset: 'DAI',
    wallet: 'Wallet 2 (0x5618…B4b7)',
    protocol: 'OKX DEX',
    spender: '0x2c34…b7cDD6',
  },
];

export type TokenDetailActionId =
  | 'send'
  | 'receive'
  | 'swap'
  | 'bridge'
  | 'defi'
  | 'buy'
  | 'cashout';

export type TokenDetailAction = {
  id: TokenDetailActionId;
  label: string;
  disabled?: boolean;
};

export type TokenDetailShortcut = {
  id: string;
  label: string;
  icon: TokenDetailActionId;
};

export type TokenDetailActivity = {
  id: string;
  type: 'send' | 'receive';
  title: string;
  address: string;
  amount: string;
  fiatValue: string;
  date: string;
};

export type TokenDetailTemplate = {
  symbol: string;
  name: string;
  logoColor: string;
  balance: string;
  fiatValue: string;
  change: string;
  changeColor: 'positive' | 'negative' | 'neutral';
  actions: TokenDetailAction[];
  shortcuts: TokenDetailShortcut[];
  address: string;
  activities: TokenDetailActivity[];
  market: {
    price: string;
    change: string;
    changeColor: 'positive' | 'negative' | 'neutral';
  };
};

export const TOKEN_DETAIL_TEMPLATES: Record<string, TokenDetailTemplate> = {
  trx: {
    symbol: 'TRX',
    name: 'Tron',
    logoColor: '#FF060A',
    balance: '37.1619',
    fiatValue: '$10.41',
    change: '+5.21%',
    changeColor: 'positive',
    actions: [
      { id: 'send', label: 'Send' },
      { id: 'receive', label: 'Receive' },
      { id: 'swap', label: 'Swap' },
      { id: 'defi', label: 'Defi' },
    ],
    shortcuts: [],
    address: 'TF9yaMo6m6V22HyLXCvcQvN4iEdRbQWrbW',
    activities: [
      {
        id: 'trx-send-1',
        type: 'send',
        title: 'Send',
        address: 'TSbeJQ1R...fmezE5',
        amount: '-1 TRX',
        fiatValue: '$0.28',
        date: '2025/08/05',
      },
      {
        id: 'trx-send-2',
        type: 'send',
        title: 'Send',
        address: 'TEvVLNr1...9oV2SM',
        amount: '-0.1 TRX',
        fiatValue: '$0.03',
        date: '2025/08/04',
      },
      {
        id: 'trx-send-3',
        type: 'send',
        title: 'Send',
        address: 'TSbeJQ1R...fmezE5',
        amount: '-0.1 TRX',
        fiatValue: '$0.03',
        date: '2025/08/04',
      },
      {
        id: 'trx-send-4',
        type: 'send',
        title: 'Send',
        address: 'TFEFXHpg...U479TG',
        amount: '-1 TRX',
        fiatValue: '$0.28',
        date: '2025/08/03',
      },
    ],
    market: {
      price: '$0.28',
      change: '+5.21%',
      changeColor: 'positive',
    },
  },
};

export type HistorySection = {
  type: 'section';
  id: string;
  date: string;
};

export type HistoryEntry = {
  type: 'item';
  id: string;
} & HistoryActivityItemData;

export type HistoryRow = HistorySection | HistoryEntry;

export const HISTORY_ACTIVITY: HistoryRow[] = [
  { type: 'section', id: '2025-10-28', date: '2025/10/28' },
  {
    type: 'item',
    id: 'execute',
    title: 'Execute',
    subtitle: '0x3bf197...f37b98',
    rightTop: '+0.0002243 ETH',
    rightBottom: '-1 USDT',
    tone: 'positive',
    secondaryTone: 'negative',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'permit',
    title: 'Approval',
    subtitle: 'Uniswap Permit2',
    rightTop: 'Tether USD',
    rightBottom: 'Unlimited',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdt',
    title: 'Revoke USDT allowance',
    subtitle: 'Uniswap Permit2',
    rightTop: 'Tether USD',
    rightBottom: '0 USDT',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  { type: 'section', id: '2025-10-27', date: '2025/10/27' },
  {
    type: 'item',
    id: 'revoke-usdt-okx',
    title: 'Revoke USDT allowance',
    subtitle: 'OKX DEX',
    rightTop: 'Tether',
    rightBottom: '0 USDT',
    badges: [
      { label: 'USDT', color: '#26A17B' },
      { label: 'OKX', color: '#6958D6' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdce',
    title: 'Revoke USDC.e allowance',
    subtitle: 'OKX DEX',
    rightTop: 'Bridged USDC',
    rightBottom: '0 USDC.e',
    badges: [
      { label: 'USDC', color: '#2775CA' },
      { label: 'OKX', color: '#6958D6' },
    ],
  },
  {
    type: 'item',
    id: 'send-bnb',
    title: 'Send',
    subtitle: '0xf501ee...4abafa',
    rightTop: '-0.0007947 BNB',
    rightBottom: '$0.90',
    tone: 'negative',
    badges: [
      { label: 'BNB', color: '#F3BA2F' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdc',
    title: 'Revoke USDC allowance',
    subtitle: 'Morpho',
    rightTop: 'USD Coin',
    rightBottom: '0 USDC',
    badges: [
      { label: 'USDC', color: '#2775CA' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdf',
    title: 'Revoke USDF allowance',
    subtitle: 'Falcon Finance',
    rightTop: 'Falcon USD',
    rightBottom: '0 USDF',
    badges: [
      { label: 'USDF', color: '#1C1C1E' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdf1',
    title: 'Revoke USDF allowance',
    subtitle: 'Falcon Finance',
    rightTop: 'Falcon USD',
    rightBottom: '0 USDF',
    badges: [
      { label: 'USDF', color: '#1C1C1E' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdf2',
    title: 'Revoke USDF allowance',
    subtitle: 'Falcon Finance',
    rightTop: 'Falcon USD',
    rightBottom: '0 USDF',
    badges: [
      { label: 'USDF', color: '#1C1C1E' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
  {
    type: 'item',
    id: 'revoke-usdf3',
    title: 'Revoke USDF allowance',
    subtitle: 'Falcon Finance',
    rightTop: 'Falcon USD',
    rightBottom: '0 USDF',
    badges: [
      { label: 'USDF', color: '#1C1C1E' },
      { label: 'ETH', color: '#627EEA' },
    ],
  },
];

export const TOKEN_DETAIL_ACTIVITY: HistoryRow[] = HISTORY_ACTIVITY;

export type TokenDistributionEntry = {
  id: string;
  label: string;
  share: number;
  amount: string;
  fiatValue: string;
  color: string;
  subLabel?: string;
};

export type TokenDistributionDataset = {
  symbol: string;
  totalAmount: string;
  totalFiatValue: string;
  segments: TokenDistributionEntry[];
};

export const TOKEN_DETAIL_DISTRIBUTION: Record<string, TokenDistributionDataset> = {
  btc: {
    symbol: 'BTC',
    totalAmount: '0.0284',
    totalFiatValue: '¥16,800',
    segments: [
      { id: 'taproot', label: 'Taproot', share: 0.48, amount: '0.0136', fiatValue: '¥8,064', color: '#FF9F0A', subLabel: 'bc1pw8tt****33puph' },
      { id: 'nested-segwit', label: 'Nested SegWit', share: 0.26, amount: '0.0074', fiatValue: '¥4,368', color: '#FF9F0A', subLabel: '3Eo9DgJs****RRydyBiD' },
      { id: 'native-segwit', label: 'Native SegWit', share: 0.16, amount: '0.0045', fiatValue: '¥2,688', color: '#FF9F0A', subLabel: 'bc1q****d698' },
      { id: 'legacy', label: 'Legacy', share: 0.1, amount: '0.0029', fiatValue: '¥1,680', color: '#FF9F0A', subLabel: '17jb****xoJE' },
    ],
  },
  usdt: {
    symbol: 'USDT',
    totalAmount: '7.0095958',
    totalFiatValue: '¥49.98',
    segments: [
      { id: 'arbitrum', label: 'Arbitrum One', share: 0.32, amount: '2.23582', fiatValue: '¥15.94', color: '#6577FF' },
      { id: 'ethereum', label: 'Ethereum', share: 0.26, amount: '1.85310', fiatValue: '¥13.21', color: '#60A5FA' },
      { id: 'solana', label: 'Solana', share: 0.25, amount: '1.75284', fiatValue: '¥12.50', color: '#A855F7' },
      { id: 'base', label: 'Base', share: 0.1, amount: '0.67241', fiatValue: '¥4.79', color: '#38BDF8' },
      { id: 'polygon', label: 'Polygon', share: 0.04, amount: '0.29365', fiatValue: '¥2.09', color: '#F472B6' },
      { id: 'avalanche', label: 'Avalanche C-Chain', share: 0.01, amount: '0.09518', fiatValue: '¥0.68', color: '#F97316' },
      { id: 'sui', label: 'Sui', share: 0.01, amount: '0.05033', fiatValue: '¥0.36', color: '#2DD4BF' },
      { id: 'bnb', label: 'BNB Smart Chain', share: 0.01, amount: '0.03547', fiatValue: '¥0.25', color: '#FCD34D' },
    ],
  },
};

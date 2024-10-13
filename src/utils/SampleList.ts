import { ActionType } from "../redux/slices/TransactionSlice";
import { SampleCardType } from "../types";
import { CryptoList } from "./CryptoList";

export const sampleList: SampleCardType[] = [
  {
    id: "1",
    title: "Swap APT for USDC and Stake",
    description:
      "Begin by swapping APT for USDC to enhance your liquidity position. Once the swap is complete, stake both APT and USDC in the designated liquidity pool to earn rewards and liquidity provider (LP) tokens.",
    actionList: [
      {
        action: ActionType.SWAP,
        token1: CryptoList[2], // APT
        token2: CryptoList[3], // USDC
      },
      {
        action: ActionType.STAKE,
        token1: CryptoList[2], // APT
        token2: CryptoList[3], // USDC
      },
    ],
  },
  {
    id: "2",
    title: "Claim APT & BTC from pool, Swap BTC to USDC, provide liquidity to APT/USDC Pool",
    description:
      "Start by withdrawing APT and BTC from the APT/BTC liquidity pool. After the withdrawal, automatically swap BTC for USDC to increase your stablecoin holdings. Finally, stake the APT and USDC into the APT/USDC pool to continue earning rewards and liquidity provider (LP) tokens.",
    actionList: [
      {
        action: ActionType.WITHDRAW,
        token1: CryptoList[2], // APT
        token2: CryptoList[0], // BTC
      },
      {
        action: ActionType.SWAP,
        token1: CryptoList[0], // BTC
        token2: CryptoList[3], // USDC
      },
      {
        action: ActionType.STAKE,
        token1: CryptoList[2], // APT
        token2: CryptoList[3], // USDC
      },
    ],
  },
//   {
//     id: "3",
//     title: "Swap APT for USDC, Claim AMAPT & BTC, provide liquidity to WEM/APT Pool",
//     description:
//       "Start by swapping BTC for USDC, followed by swapping APT for USDC. After the swaps, withdraw WEM and BTC from the pool. Finally, stake WEM and APT into the WEM/APT pool for liquidity provider tokens.",
//     actionList: [
  
//       {
//         action: ActionType.SWAP,
//         token1: CryptoList[2], // APT
//         token2: CryptoList[3], // USDC
//       },
//       {
//         action: ActionType.WITHDRAW,
//         token1: CryptoList[1], // AMAPT
//         token2: CryptoList[0], // BTC
//       },
//       {
//         action: ActionType.STAKE,
//         token1: { name: "WEM", subname: "Wemical", icon: "/crypto/wem.png", type: "WEM-type" }, // WEM
//         token2: CryptoList[2], // APT
//       },
//     ],
//   },
  {
    id: "4",
    title: "Swap  APT to BTC, Claim amAPT & USDC, Provide liquidity to amAPT/BTC Pool",
    description:
      "Start by swapping WEM for USDC, followed by swapping APT for BTC. Withdraw amAPT and USDC, then stake amAPT and BTC into the amAPT/BTC pool.",
    actionList: [
 
      {
        action: ActionType.SWAP,
        token1: CryptoList[2], // APT
        token2: CryptoList[0], // BTC
      },
      {
        action: ActionType.WITHDRAW,
        token1: CryptoList[1], // amAPT
        token2: CryptoList[3], // USDC
      },
      {
        action: ActionType.STAKE,
        token1: CryptoList[1], // amAPT
        token2: CryptoList[0], // BTC
      },
    ],
  },
  {
    id: "5",
    title: "Swap USDC for APT, then provide liquidity to Wemical Money Market with APT & USDC",
    description:
      "Begin by swapping USDC for APT to increase your APT holdings. Then, add liquidity to Wemical Money Market with APT and USDC into the APT/USDC pool for liquidity provision and rewards.",
    actionList: [
      {
        action: ActionType.SWAP,
        token1: CryptoList[3], // USDC
        token2: CryptoList[2], // APT
      },
      {
        action: ActionType.STAKE,
        token1: CryptoList[2], // APT
        token2: CryptoList[3], // USDC
      },
    ],
  },
  {
    id: "6",
    title: "Withdraw APT & AMAPT, Swap AMAPT to USDC, Stake in APT/USDC Pool",
    description:
      "Start by withdrawing APT and AMAPT from the APT/AMAPT liquidity pool. After the withdrawal, swap AMAPT for USDC. Finally, stake APT and AMAPT in the APT/AMAPT pool to earn rewards.",
    actionList: [
      {
        action: ActionType.WITHDRAW,
        token1: CryptoList[2], // APT
        token2: CryptoList[1], // amAPT
      },
      {
        action: ActionType.SWAP,
        token1: CryptoList[1], // amAPT
        token2: CryptoList[3], // USDC
      },
      {
        action: ActionType.STAKE,
        token1: CryptoList[2], // APT
        token2: CryptoList[1], // amAPT
      },
    ],
  },
];

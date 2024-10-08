import { IToken } from "../types";

const path = "/crypto"
export const CryptoList:IToken[] = [{
    //0
    name: "BTC",
    subname:"Bitcoin",
    icon: `${path}/btc.png`,
    type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::BTC"
},
{
    //1
    name: "AMAPT",
    subname:"Amnis Aptos",
    icon: `${path}/amAPT.jpg`,
    type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::AMAPT"
},
{
    //2
    name: "APT",
    subname:"Aptos",
    icon: `${path}/apt.png`,
     type:"0x1::aptos_coin::AptosCoin"
},
{
    //3
    name: "USDC",
    subname:"USD Coin",
    icon: `${path}/usdc.png`,
     type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC"
},

// {
//     name: "ETH", 
//     subname:"Ethereum",
//     icon: `${path}/eth.png`,
//      type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::ETH"
// },
]
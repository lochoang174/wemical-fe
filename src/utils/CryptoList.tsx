import { IToken } from "../types";

const path = "/crypto"
export const CryptoList:IToken[] = [{
    name: "BTC",
    icon: `${path}/btc.png`,
    type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::BTC"
},
{
    name: "AMAPT",
    icon: `${path}/amAPT.jpg`,
    type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::AMAPT"
},
{
    name: "ETH", 
    icon: `${path}/eth.png`,
     type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::ETH"
},
{
    name: "USDC",
    icon: `${path}/usdc.png`,
     type:"0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC"
},
{
    name: "APT",
    icon: `${path}/apt.png`,
     type:"0x1::aptos_coin::AptosCoin"
},

]
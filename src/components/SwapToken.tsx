import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineSwapVert } from "react-icons/md";
import InputValue from "./InputValue";
import { IToken } from "../types";
import { CryptoList } from "../utils/CryptoList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { handleCloseSelectToken, setAmountFrom, swapTokens } from "../redux/slices/SwapSlice";
import SelectToken from "./SelectToken";
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../Var";
type Coin = { coin: { value: string } };

const SwapToken = () => {
  const {amountFrom,amountTo,tokenFrom,tokenTo}=useAppSelector(state=>state.swap)
  const {openSelectToken}=useAppSelector((state)=>state.swap)
  const {account,signAndSubmitTransaction }=useWallet()
  const dispatch=useAppDispatch()
  const [isDone,setIsDone]=useState(false)
  // const [AccountF, setAccountF] = useState<Account>()
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const handleSwap=()=>{
    dispatch(swapTokens())
  }
  const handleClose = useCallback(() => {
    dispatch(handleCloseSelectToken());
  }, []);
  useEffect(()=>{
  
    fetchAccountTokens()
  },[])
  useEffect(()=>{
    console.log(isDone)
    if(isDone){
      transaction2()

    }
  },[isDone])
  const fetchAccountTokens = async () => {
    try {
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const aptos = new Aptos(aptosConfig);
  
      const privateKey = new Ed25519PrivateKey(
        "0x93e7f0308d8b5c8fc9829ced8569a7bd1166c1c3e4f464ff4486aec82eb23a05"
      );
      const account = await Account.fromPrivateKey({ privateKey });
      const accountAddress = account.accountAddress;
  
      console.log(`Account Address: ${accountAddress}`);
      // setAccountF(account)
      const resource = await aptos.getAccountResource<Coin>({
        accountAddress: accountAddress,
        resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
      });
  
      const value = resource.coin.value;
  
      console.log('Tokens: ', value);
    } catch (error) {
      console.error('Error fetching account tokens: ', error);
    }
  }
  const transactions = [
    {
      function: `${MODULE_ADDRESS}::scripts_v3::swap`,
      typeArguments: [
        "0x1::aptos_coin::AptosCoin", // coin to swap
        "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC", // coin to swap to
        "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated" // curves (static)
      ],
      functionArguments: [
        100000, // amount of coin to swap
        10000   // minimum amount of coin to swap to
      ],
    },
    {
      function: `${MODULE_ADDRESS}::scripts_v3::swap`,
      typeArguments: [
        "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC", // coin to swap
        "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::BTC", // coin to swap to
        "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated" // curves (static)
      ],
      functionArguments: [
        100000, // amount of coin to swap
        1       // minimum amount of coin to swap to
      ],
    }
  ];


  

  const transaction1 = async(onSuccess: ()=> Promise<void>)=>{
    console.log("tran1")
    try {
      const response = await signAndSubmitTransaction({
        data: {
          function: `${MODULE_ADDRESS}::scripts_v3::swap`,
          typeArguments: [
            "0x1::aptos_coin::AptosCoin" , //coin to swap
            "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC", //coin to swap to
            "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated" //curves (static) 
          ],
          functionArguments: [
            100000, // amount of coin to swap
            10000  // minimum amount of coin to swap to
          ],
        },
      });
      const committedTransaction=await aptos.waitForTransaction({ transactionHash: response.hash });
            // console.log(committedTransaction)

      onSuccess()
     } catch (error) {
      console.log(error)
     }
  }

  const transaction2 = async()=>{
    console.log("tran2")

    try {
      const response = await signAndSubmitTransaction({
        data: {
          function: `${MODULE_ADDRESS}::scripts_v3::swap`,
          typeArguments: [
            "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::USDC", //coin to swap 
            "0x97f28f805f9e8ab3928488d8efc903c347328ba584558b4eb6a8ea7483dc7b11::coins::BTC" , //coin to swap to
            "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated" //curves (static) 
          ],
          functionArguments: [
            100000 , // amount of coin to swap
            1 // minimum amount of coin to swap to
          ],
        },
      });
      const committedTransaction=await aptos.waitForTransaction({ transactionHash: response.hash });
  
      console.log(committedTransaction)
     } catch (error) {
      console.log(error)
     }
  }
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-wwhite">
      <div className="bg-[#F7F7F8] p-4 rounded-3xl w-[485px] h-[400px] flex flex-col gap-4 items-center relative shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
        <div className="rounded-full bg-[#F6F7F9] w-12 h-12 flex items-center justify-center absolute top-[41%] left-[45%] z-10 border-2 border-gray-400 cursor-pointer"
          onClick={handleSwap}
        >
        <MdOutlineSwapVert className="text-2xl" />
        </div>
        <div className="text-2xl text-[#49494A] text-center">Swap crypto token</div>
        <InputValue key={"from"} balance={amountFrom} token={tokenFrom} isFrom={true} />
        <InputValue key={"to"} balance={amountTo} token={tokenTo} isFrom={false} />
        <div className="p-3 bg-[#424242] text-white rounded-full w-[400px] text-center cursor-pointer" onClick={()=>{transaction1(transaction2)}}>Swap</div>

        {/* <div className="p-3 bg-[#424242] text-white rounded-full w-[400px] text-center cursor-pointer" onClick={transaction2}>Swap</div> */}
      </div>
      <SelectToken handleClose={handleClose} open={openSelectToken} ></SelectToken>

    </div>
  );
};

export default SwapToken;

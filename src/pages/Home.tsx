import React from 'react'
import SwapToken from '../components/SwapToken'
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen w-[100%]">
        <header className=" text-black p-3 px-5 flex justify-between">
          <h1 className="text-2xl font-bold">Wemical</h1>
          {/* <div className='bg-[#424242] text-white p-3 rounded-lg'>
            Connet Wallet
          </div> */}
                <AntdWalletSelector />

        </header>
        
          <SwapToken></SwapToken>
        <footer className=" text-black p-3">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Home

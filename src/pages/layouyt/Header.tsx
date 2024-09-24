import React from 'react'
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const Header = () => {
  return (
    <header className=" text-black p-3 px-5 flex justify-between">
          <div className="">
            <img src="/logo.png" className='w-[124px] ' alt="" />
          </div>

          <AntdWalletSelector />
        </header>
  )
}

export default Header

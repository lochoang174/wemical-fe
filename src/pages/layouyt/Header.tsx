import React from 'react'
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const Header = () => {
  return (
    <header className=" text-black p-3 px-5 flex justify-between">
          <div className="w-[100px]">
            <img src="/logo.png" alt="" />
          </div>

          <AntdWalletSelector />
        </header>
  )
}

export default Header

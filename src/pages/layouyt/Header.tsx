import React from "react";
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const Header = () => {
  return (
    <header className=" text-black p-3 px-4 flex justify-between">
      <img src="/logo.png" className="w-[124px] " alt="" />


      <AntdWalletSelector />
    </header>
  );
};

export default Header;

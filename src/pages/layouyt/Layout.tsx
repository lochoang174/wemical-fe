import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
  
      <div className="flex h-screen w-[100%]">
        <div className="w-[280px] h-[100%]">
          <Sidebar></Sidebar>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="mt-2">
          <Header></Header>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      {/* <div className="flex flex-col h-screen w-[100%]">
        <div className="flex-grow flex">
          <div className="h-[100%]">
          

          </div>
        </div>
        {/* <Footer></Footer> 
      </div> */}
      <div className="flex h-screen w-[100%]">
        <div className="w-[300px] h-[100%]">
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

import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <div className="flex flex-col h-screen w-[100%]">
        <Header></Header>
        <div className="flex-grow flex">
          <div className="h-[100%]">
          <Sidebar></Sidebar>

          </div>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;

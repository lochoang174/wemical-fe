import React from "react";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { SiHomeassistant } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import Search from "./Search";

const items = [
  {
    to: "/",
    text: "Create Recipe",
    icon: <SiHomeassistant />,
  },
  {
    to: "/Trasctions",
    text: "Trasctions",
    icon: <AiOutlineTransaction />,
  },
  {
    to: "/Settings",
    text: "Settings",
    icon: <IoMdSettings />,
  },
];
const Sidebar = () => {
  return (
    <div className="h-full  flex flex-col w-[280px] gap-5 items-center justify-between">
      <div className="mt-[140px] px-4 w-full text-sm flex flex-col gap-3">
        {/* <Search></Search> */}
        {items.map((item, index) => (
          <NavLink
            to={item.to}
            key={index}
            style={({ isActive }) => ({
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textDecoration: "none",
              color: isActive ? "black" : "#CCCCCC",
              background: isActive ? "white" : "transparent",
              padding: "10px",
              width: "100%",
              letterSpacing: "2px",
              height:"48px"
            })}
            aria-hidden="false"
          >
            <div className="text-xl">{item.icon}</div>
            <span className="ml-3">{item.text}</span>
          </NavLink>
        ))}
      </div>
      {/* <div className="px-4 w-full">
      <button className=" w-full rounded-full bg-colorButton text-white py-2">
        Upgrade to pro
      </button>
      </div> */}
    
    </div>
  );
};

export default Sidebar;

import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {/* <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      
      sx={{
        height:"40px",
        width:"140px",
        background:"grey"

      }}
    >
      
    </Button> */}
      <div
        className="cursor-pointer w-[240px] h-full px-3 flex justify-between bg-white/10 rounded-2xl items-center"

      >
        <span>All</span>
        <span>
          <IoIosArrowDown />
        </span>
      </div>
      
    </div>
  );
};

export default Dropdown;

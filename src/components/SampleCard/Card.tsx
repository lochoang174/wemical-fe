import React, { useState } from "react";
import SampleModal from "./SampleModal";
const arr = ["/crypto/amAPT.jpg", "/crypto/apt.png", "/crypto/btc.png"];
const Card = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="h-[248px]  bg-white/10 rounded-lg p-4 flex  justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-xl text-white">Stake SUI using deepbook</div>
            <div className="text-[#BFBFBF] text-[16px]">
              Swap USDT for ORAI then stake to sORAI, scORAI
            </div>
          </div>
          <div className="flex gap-2">
            {arr.map((e, i) => (
              <img className="w-5 h-5" src={e} key={i} alt="" />
            ))}
          </div>
        </div>
        <div className=" w-[90px] flex flex-col justify-between text-[#BFBFBF]">
          <div className=" text-[13px] self-end">73.65%</div>
          <div className="text-[12px] cursor-pointer" onClick={handleOpen}>More detail</div>
        </div>
      </div>
      <SampleModal handleClose={handleClose} open={open}></SampleModal>
    </>
    
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import { SwapType, IToken, SampleCardType, SampleActionType, PoolDisplay } from "../../types";
import { VscArrowSwap } from "react-icons/vsc";
import { CryptoList } from "../../utils/CryptoList";
import { FaArrowRightLong } from "react-icons/fa6";
import { actionList } from "../Action/ActionList";
import { Tooltip } from "@mui/material";
import { checkExistPool } from "../../utils/helperFunction";

interface Props {
  element: SampleActionType;
}
const SampleWithdraw = ({ element }: Props) => {
  const [Pool, setPool] = useState<PoolDisplay | null>(null);
  useEffect(() => {
      setPool(
        checkExistPool(element.token1, element.token2)
      );
    
  }, [element]);
  return (
    <>
      <div className={`bg-[#616161]/70 w-[80%] h-[80px] rounded-xl flex p-4  `}>
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <span className=" text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
              <span className="text-3xl">{actionList[2].icon}</span>
              {actionList[2].title}
            </span>
            {/* <div className="flex flex-col justify-center">
              <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  className="w-[40px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                  placeholder="0.00"
                  disabled={true}
                />
              </div>
            </div> */}
          </div>

          <div className="flex flex-col justify-center gap-1 items-start text-white">
          <div className="text-[16px]  flex gap-4 text-white  px-2.5 py-0.5 items-center w-[350px]">
              <div className="text-blue-800 rounded-md "></div>
              <span className="flex relative">
                {Pool !== null ? (
                 <Tooltip title={Pool.name}>
                 <img
                    className="w-6 h-6 rounded-md"
                    src={Pool.image ?? ""}
                    alt=""
                  />
                  </Tooltip>
                ) : (
                  <>
                    <img
                      className="w-6 h-6 "
                      src={element.token1.icon}
                      alt=""
                    />
                    <img
                      className="w-6 h-6  absolute left-[50%]"
                      src={element.token2.icon}
                      alt=""
                    />
                  </>
                )}
              </span>
              <span className="flex gap-4 ">
                {element.token1.name}
                <span className="self-center">/</span>
                {element.token1.name}
              </span>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default SampleWithdraw;

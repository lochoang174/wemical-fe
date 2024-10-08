import React, { useEffect, useState } from "react";
import { actionList } from "../Action/ActionList";
import { PoolDisplay, StakeType } from "../../types";
import StakeModal from "./StakeModal";
import { checkExistPool } from "../../utils/helperFunction";
import { CiCircleRemove } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks";
import { deleteAction } from "../../redux/slices/TransactionSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
interface Pros {
  stakeEle: StakeType;
}
const StakeInput = ({ stakeEle }: Pros) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const [Pool, setPool] = useState<PoolDisplay | null>(null);
  useEffect(() => {
    if (stakeEle.pool) {
      setPool(
        checkExistPool(stakeEle.pool?.token1, stakeEle.pool?.token2)
      );
    }
  }, [stakeEle]);
  return (
    <>
      <div className={`bg-[#616161]/40 w-full h-[80px] rounded-xl flex p-4 `}>
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <span className="  text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
              <span className="text-3xl">{actionList[1].icon}</span>
              {actionList[1].title}
            </span>
            <div className="flex flex-col justify-center">
              <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  value={stakeEle.liquidity!}
                  // onChange={handleInputChange}
                  className="w-[140px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                  placeholder="0.00"
                  disabled={true}

                />
              </div>
            </div>
          </div>
          {stakeEle.pool && (
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
                      src={stakeEle.pool.token1.icon}
                      alt=""
                    />
                    <img
                      className="w-6 h-6  absolute left-[50%]"
                      src={stakeEle.pool.token2.icon}
                      alt=""
                    />
                  </>
                )}
              </span>
              <span className="flex gap-4 ">
                {stakeEle.pool.token1.name}
                <span className="self-center">/</span>
                {stakeEle.pool.token2.name}
              </span>
            </div>
          )}
          <div className="flex text-white self-center gap-2 text-xl">
            <div className="cursor-pointer" onClick={()=>{
              dispatch(deleteAction(stakeEle.id))
            }}>
              <FaRegTrashAlt />
              </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FiEdit />
            </div>
          </div>
        </div>
      </div>
      <StakeModal
        handleClose={() => {
          setOpen(false);
        }}
        open={open}
        stakeEle={stakeEle}
      ></StakeModal>
    </>
  );
};

export default StakeInput;

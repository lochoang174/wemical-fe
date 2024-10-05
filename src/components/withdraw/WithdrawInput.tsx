import React, { useEffect, useState } from "react";
import { actionList } from "../Action/ActionList";
import { FiEdit } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import WithdrawModal from "./WithdrawModal";
import { IToken, WithdrawType } from "../../types";
import { poolList } from "../../utils/PoolList";
import { checkExistPool } from "../../utils/helperFunction";
import { deleteAction } from "../../redux/slices/TransactionSlice";
import { useAppDispatch } from "../../redux/hooks";
interface Pros {
  withdrawEle: WithdrawType;
}
const WithdrawInput = ({ withdrawEle }: Pros) => {
  const [open, setOpen] = useState(false);
  const [imagePool, setImagePool] = useState<string>("");
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (withdrawEle.pool) {
      setImagePool(
        checkExistPool(withdrawEle.pool?.token1, withdrawEle.pool?.token2)
      );
    }
  }, [withdrawEle]);

  return (
    <>
      <div className={`bg-[#616161]/40 w-full h-[80px] rounded-xl flex p-4 `}>
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <span className="  text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
              <span className="text-3xl">{actionList[2].icon}</span>
              {actionList[2].title}
            </span>
            <div className="flex flex-col justify-center">
              <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  value={withdrawEle.liquidity!}
                  // onChange={handleInputChange}
                  className="w-[140px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                  placeholder="0.00"
                  disabled={true}
                  
                />
              </div>
            </div>
          </div>
          {withdrawEle.pool && (
            <div className="text-[16px]  flex gap-4 text-white  px-2.5 py-0.5 items-center w-[350px]">
              <div className="text-blue-800 rounded-md "></div>
              <span className="flex relative">
                {imagePool !== "" ? (
                  <img
                    className="w-6 h-6 rounded-md"
                    src={imagePool ?? ""}
                    alt=""
                  />
                ) : (
                  <>
                    <img
                      className="w-6 h-6 "
                      src={withdrawEle.pool.token1.icon}
                      alt=""
                    />
                    <img
                      className="w-6 h-6  absolute left-[50%]"
                      src={withdrawEle.pool.token2.icon}
                      alt=""
                    />
                  </>
                )}
              </span>
              <span className="flex gap-4 ">
                {withdrawEle.pool.token1.name}
                <span className="self-center">/</span>
                {withdrawEle.pool.token2.name}
              </span>
            </div>
          )}

          <div className="flex text-white self-center gap-2 text-xl">
          <div className="cursor-pointer" onClick={()=>{
              dispatch(deleteAction(withdrawEle.id))
            }}>
              <CiCircleRemove />
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
      <WithdrawModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        withdrawEle={withdrawEle}
      ></WithdrawModal>
    </>
  );
};

export default WithdrawInput;

import React, { useCallback, useEffect, useState } from "react";
import { SwapType, IToken, PoolDisplay } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { FaArrowRightLong } from "react-icons/fa6";
import { actionList } from "../Action/ActionList";
import SelectToken from "./SelectToken";
import { RootState } from "../../redux/store";
import {
  deleteAction,
  selectSwapActions,
  updateSwapAmount,
} from "../../redux/slices/TransactionSlice";
import { checkExistPool } from "../../utils/helperFunction";
import { FaRegTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";

interface InputValueProps {
  index: number;
  swapEle: SwapType;
}

export interface Item {
  // index: number;
  id: string;
}

const InputValue = ({ swapEle }: InputValueProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  // const { inputList } = useAppSelector((state) => state.swap);
  const swapActions = useAppSelector((state: RootState) =>
    selectSwapActions(state)
  );
  const [nextToken, setNextToken] = useState<IToken | null>(null);
  const [Pool, setPool] = useState<PoolDisplay | null>(null);
  useEffect(() => {
    let index = swapActions.findIndex((ele) => ele.payload.id === swapEle.id);
    if (index + 1 < swapActions.length) {
      const ele = swapActions[index + 1].payload as SwapType;
      if (ele.token.name !== swapEle.token.name) {
        setNextToken(ele.token);
        setPool(checkExistPool(ele.token, swapEle.token));
      } else {
        setNextToken(null);
      }
    } else {
      setNextToken(null);
    }
  }, [swapActions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateSwapAmount({ id: swapEle.id, amount: Number(e.target.value) })
    );
  };

  return (
    <>
      <div className={`bg-[#616161]/40 w-full h-[80px] rounded-xl flex p-4 `}>
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <span className="  text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
              <span className="text-3xl">{actionList[0].icon}</span>
              {actionList[0].title}
            </span>
            <div className="flex flex-col justify-center">
              <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  value={swapEle.amount}
                  onChange={handleInputChange}
                  className="w-[140px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          {nextToken && (
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
                    <img className="w-6 h-6 " src={swapEle.token.icon} alt="" />
                    <img
                      className="w-6 h-6  absolute left-[50%]"
                      src={nextToken.icon}
                      alt=""
                    />
                  </>
                )}
              </span>
              <span className="flex gap-4 ">
                {swapEle.token.name}
                <span className="self-center">
                  <FaArrowRightLong />
                </span>
                {nextToken.name}
              </span>
            </div>
          )}

          <div className="flex justify-center gap-2 items-center text-white">
            <div
              className="cursor-pointer text-xl self-center"
              onClick={() => {
                dispatch(deleteAction(swapEle.id));
              }}
            >
              <FaRegTrashAlt />
            </div>
            <div
              className="bg-transparent  flex cursor-pointer "
              onClick={() => {
                setOpen(true);
              }}
            >
              <img src={swapEle.token!.icon} alt="" className="w-5 h-5" />
              {/* <span className=" text-[12px] self-center">
                {swapEle.token!.name}
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <SelectToken
        swapEle={swapEle}
        handleClose={() => {
          setOpen(false);
        }}
        open={open}
      ></SelectToken>
    </>
  );
};

// InputValue = React.memo(InputValue, (prevProps, nextProps) => {
//   return (
//     prevProps.isFrom === nextProps.isFrom &&
//     prevProps.balance === nextProps.balance &&
//     prevProps.token === nextProps.token
//   );
// });

export default InputValue;

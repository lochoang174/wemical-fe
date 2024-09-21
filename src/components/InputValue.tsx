import React, { useCallback } from "react";
import { IToken } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAmountFrom, setAmountTo, handlOpenSelectToken } from "../redux/slices/SwapSlice";

interface InputValueProps {
  balance: number;
  token: IToken | null;
  isFrom: boolean;
}

let  InputValue = ({ balance, token, isFrom }: InputValueProps) => {
  const dispatch = useAppDispatch();
  const amount = useAppSelector(state =>
    isFrom ? state.swap.amountFrom : state.swap.amountTo
  );
  console.log("Render: "+isFrom)
  const handleOpenModal =() => {
    dispatch(handlOpenSelectToken(isFrom));
  };


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFrom) {
      dispatch(setAmountFrom(Number(e.target.value)));
    } else {
      dispatch(setAmountTo(Number(e.target.value)));
    }
  }, [isFrom]);

  return (
    <>
      <div className="border-2 border-gray-400 w-[410px] h-[110px] p-4 rounded-lg flex justify-between">
        <div className="flex flex-col justify-center gap-2 items-start">
          <div className="text-[#29292a] text-2xl whitespace-nowrap [font-family:'Inter-SemiBold',Helvetica] font-semibold tracking-[0] leading-[normal]">
            <input
              type="number"
              value={amount === 0 ? "" : amount}
              onChange={handleInputChange}
              className="w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0.00"
            />
          </div>
          <div className="text-[#c9c9cd] h-[13px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[12px] tracking-[0] leading-[normal]">
            $0.00
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 items-start">
          <div className="rounded-xl p-2 bg-[#e0e0e2] flex border-2 border-gray-200 cursor-pointer w-[70px]" onClick={handleOpenModal}>
            <img src={token!.icon} alt="" className="w-5 h-5" />
            <span className="text-[#29292a] text-[12px] self-center">{token!.name}</span>
          </div>
          <div className="text-[12px]">
            <span className="text-[#CDCDD0]">
              Balance: <span className="text-[#5BA4FF]">{balance}</span>
            </span>
          </div>
        </div>
      </div>

    </>
  );
};

// Use React.memo to prevent re-renders when `balance` and `token` don't change

InputValue = React.memo(InputValue, (prevProps, nextProps) => {
  return (
    prevProps.isFrom === nextProps.isFrom &&
    prevProps.balance === nextProps.balance &&
    prevProps.token === nextProps.token
  );
});

export default InputValue;

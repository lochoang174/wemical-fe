import React, { useCallback, useEffect, useState } from "react";
import { InputType, IToken } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  handlOpenSelectToken,
  setAmountInput,
} from "../../redux/slices/SwapSlice";
import { poolList } from "../../utils/PoolList";
import { VscArrowSwap } from "react-icons/vsc";

interface InputValueProps {
  index: number;
  input: InputType;
}

export interface Item {
  index: number;
  id: string;
}

const InputValue = ({ index, input }: InputValueProps) => {
  const dispatch = useAppDispatch();
  const { inputList } = useAppSelector((state) => state.swap);
  const [nextToken, setNextToken] = useState<IToken | null>(null);
  const [imagePool, setImagePool] = useState<string>("");
  useEffect(() => {
    if (index + 1 < inputList.length) {
      if (inputList[index + 1].token.name !== input.token.name) {
        setNextToken(inputList[index + 1].token);
        setImagePool(checkExistPool());
      } else {
        setNextToken(null);
      }
    } else {
      setNextToken(null);
    }
  }, [inputList]);
  const checkExistPool = (): string => {
    const pool = poolList.find(
      (pool2) =>
        pool2.tokens.includes(input.token.name) &&
        pool2.tokens.includes(inputList[index + 1].token.name ?? "")
    );

    return pool ? pool.image : ""; // Return empty string if no image is found
  };

  const handleOpenModal = () => {
    dispatch(handlOpenSelectToken(input.id));
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setAmountInput({ id: input.id, newAmount: Number(e.target.value) })
      );
    },
    []
  );
  return (
    <>
      <div
        className={`border-4 border-white bg-white w-full h-[100px] rounded-3xl flex `}
      >
        <div className="p-2 flex justify-between w-full">
          <div className="flex gap-2">
            <span className=" bg-gradient-to-br from-[#7872b7] to-[#6aa1ed] text-white rounded-3xl flex justify-center items-center w-[80px] text-xs flex-col">
              
              <span className="text-3xl">{input.action.icon}</span>
              {input.action.title}
            </span>
            <div className="flex flex-col justify-center gap-2 items-start">
              <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  value={input.amount === 0 ? "" : input.amount}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                />
              </div>
              {nextToken && (
                <div className="text-xs text-blue-800 rounded-md  flex gap-3 bg-blue-100 px-2.5 py-0.5">
                  <span className="flex relative">
                    {imagePool !== "" ? (
                      <img
                        className="w-4 h-4 rounded-md"
                        src={imagePool ?? ""}
                        alt=""
                      />
                    ) : (
                      <>
                        <img
                          className="w-4 h-4"
                          src={input.token.icon}
                          alt=""
                        />
                        <img
                          className="w-4 h-4 absolute left-[50%]"
                          src={nextToken.icon}
                          alt=""
                        />
                      </>
                    )}
                  </span>
                  <span>
                    {input.token.name}/{nextToken.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1 items-start">
            <div
              className="rounded-xl p-2 bg-[#e0e0e2] flex border-2 border-gray-200 cursor-pointer w-[70px]"
              onClick={handleOpenModal}
            >
              <img src={input.token!.icon} alt="" className="w-5 h-5" />
              <span className="text-[#29292a] text-[12px] self-center">
                {input.token!.name}
              </span>
            </div>
            <div className="text-[12px]">
              <span className="text-[#CDCDD0]">
                Balance: <span className="text-[#5BA4FF]">{0}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
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

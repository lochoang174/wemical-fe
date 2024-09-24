import React, { useCallback, useEffect, useState } from "react";
import { InputType, IToken } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  handlOpenSelectToken,
  setAmountInput,
} from "../../redux/slices/SwapSlice";
import { poolList } from "../../utils/PoolList";
import { FaArrowRightLong } from "react-icons/fa6";

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
        className={`bg-[#616161]/40 w-full h-[80px] rounded-xl flex p-4 `}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <span className="  text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
              <span className="text-3xl">{input.action.icon}</span>
              {input.action.title}
            </span>
            <div className="flex flex-col justify-center">
              <div className=" text-2xl whitespace-nowrap tracking-[0] leading-[normal]">
                <input
                  type="number"
                  value={ input.amount}
                  onChange={handleInputChange}
                  className="w-[140px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          {nextToken && (
                <div className="text-[16px]  flex gap-4 text-white  px-2.5 py-0.5 items-center w-[400px]">
                  {/* <div className="text-blue-800 rounded-md ">
                    
                  </div> */}
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
                          src={input.token.icon}
                          alt=""
                        />
                        <img
                          className="w-6 h-6  absolute left-[50%]"
                          src={nextToken.icon}
                          alt=""
                        />
                      </>
                    )}
                  </span>
                  <span className="flex gap-4 ">
                    {input.token.name}<span className="self-center"><FaArrowRightLong /></span>{nextToken.name}
                  </span>
                </div>
              )}
          <div className="flex flex-col justify-center gap-1 items-start text-white">
            <div
              className="rounded-xl p-2 bg-white text-black flex border-2  cursor-pointer w-[80px] justify-center gap-1 "
              onClick={handleOpenModal}
            >
              <img src={input.token!.icon} alt="" className="w-5 h-5" />
              <span className=" text-[12px] self-center">
                {input.token!.name}
              </span>
            </div>
            {/* <div className="text-[12px]">
              <span className="text-[#CDCDD0]">
                Balance: <span className="text-[#5BA4FF]">{0}</span>
              </span>
            </div> */}
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

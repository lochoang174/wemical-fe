import React from 'react'
import { InputType, IToken } from '../../types'
import { VscArrowSwap } from 'react-icons/vsc'
import { CryptoList } from '../../utils/CryptoList'
import { FaArrowRightLong } from 'react-icons/fa6'

interface Props{
    input: InputType
    nextToken: IToken|null
}
const SampleInput = ({input,nextToken}:Props) => {
  return (
    <>
    <div
      className={`bg-[#616161]/70 w-[80%] h-[80px] rounded-xl flex p-4  `}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-8">
          <span className=" text-white flex justify-center items-center w-[80px] text-[14px] gap-1">
            <span className="text-3xl">{input.action.icon}</span>
            {input.action.title}
          </span>
          <div className="flex flex-col justify-center">
            <div className=" text-xl whitespace-nowrap tracking-[0] leading-[normal]">
              <input
                type="number"
                value={ input.amount}
                className="w-[40px] bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none overflow-auto text-white"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        {nextToken && (
              <div className="text-[16px]  flex gap-4 text-white  px-2.5 py-0.5 items-center w-[350px]">
                {/* <div className="text-blue-800 rounded-md ">
                  
                </div> */}
                <span className="flex relative">
                   
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
               
                </span>
                <span className="flex gap-4 ">
                  {input.token.name}<span className="self-center"><FaArrowRightLong /></span>{nextToken.name}
                </span>
              </div>
            )}
        {/* <div className="flex flex-col justify-center gap-1 items-start text-white">
          <div
            className="rounded-xl p-2 bg-white text-black flex border-2  cursor-pointer w-[80px] justify-center gap-1 "
            
          >
            <img src={input.token!.icon} alt="" className="w-5 h-5" />
            <span className=" text-[12px] self-center">
              {input.token!.name}
            </span>
          </div>
         
        </div> */}
      </div>
    </div>
  </>
  )
}

export default SampleInput

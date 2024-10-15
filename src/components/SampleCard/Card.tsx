import React, { useState } from "react";
import SampleModal from "./SampleModal";
import { IToken, SampleActionType, SampleCardType } from "../../types";
const arr = ["/crypto/amAPT.jpg", "/crypto/apt.png", "/crypto/btc.png"];
interface Pros{
  sample: SampleCardType
}
const Card = ({sample}:Pros) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getUniqueTokens = (actions: SampleActionType[]): IToken[] => {
    const tokens: IToken[] = [];
  
    actions.forEach((action) => {
      if (!tokens.find(token => token.name === action.token1.name)) {
        tokens.push(action.token1);
      }
      if (!tokens.find(token => token.name === action.token2.name)) {
        tokens.push(action.token2);
      }
    });
  
    return tokens;
  };
  const tokens:IToken[]=getUniqueTokens(sample.actionList)

  return (
    <>
      <div className="h-[268px]  bg-white/10 rounded-lg p-4 flex  justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-[16px] text-white">{sample.title}</div>
            <div className="text-[#BFBFBF] text-[12px]">
              {sample.description}
            </div>
          </div>
          <div className="flex gap-2">
            {tokens.map((e, i) => (
              <img className="w-5 h-5" src={e.icon} key={i} alt="" />
            ))}
          </div>
        </div>
        <div className=" w-[90px] flex flex-col justify-between text-[#BFBFBF]">
          <div className=" text-[13px] self-end">73.65%</div>
          <div className="text-[12px] cursor-pointer" onClick={handleOpen}>More detail</div>
        </div>
      </div>
      <SampleModal handleClose={handleClose} open={open} actions={sample.actionList} description={sample.description}></SampleModal>
    </>
    
  );
};

export default Card;

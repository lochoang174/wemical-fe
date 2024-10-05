import { Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropDownPool, { PoolType } from "../DropdownPool/DropDownPool";
import { IToken, WithdrawType } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { ActionType, updatePool, updateWithdrawLiquidity } from "../../redux/slices/TransactionSlice";
import { displayAmount } from "../../utils/helperFunction";

interface Pros {
  withdrawEle: WithdrawType;
  open: boolean;
  handleClose: () => void;
}

const WithdrawModal = ({ open, handleClose,withdrawEle }: Pros) => {
  // const [pool,setPool]=useState<PoolType|null>(null)
  // const [amountLiquidity, setAmountLiquidity] = useState<number | null>(withdrawEle.liquidity);
 const setAmountLiquidity=(e:number)=>{
  dispatch(updateWithdrawLiquidity({
    id:withdrawEle.id,
    liquidity:e
  }))
 }
  const dispatch = useAppDispatch()

  const handlePoolSelect = (poolSelected: PoolType) => {
    dispatch(updatePool({
      actionSelect:ActionType.WITHDRAW,
      id:withdrawEle.id,
      pool:poolSelected,  
    }))
  };
  const handleSave=()=>{
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="select-token-modal"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="bg-[#2B3342] p-5 rounded-xl w-[500px] text-[#A2A4A8] h-[480px] flex flex-col gap-4">
        <Typography
          id="select-token-modal"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Withdraw token from pool
        </Typography>
        {/* Pass handlePoolSelect to DropDownPool */}
        <DropDownPool onSelect={handlePoolSelect} id={withdrawEle.pool?.id??""} />
        <div>
          <div>First Token</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg flex items-center">
          {withdrawEle.pool? (
              <>
                <img
                  src={withdrawEle.pool.token1.icon}
                  alt={withdrawEle.pool!.token1.name}
                  className="w-6 h-6 mr-2"
                />
              <span>{withdrawEle.amountToken1?displayAmount(withdrawEle.pool.token1,withdrawEle.amountToken1):withdrawEle.pool.token1.name}</span>
              </>
            ) : (
              <span>Select a pool to display token</span>
            )}
          </div>
        </div>
        <div>
          <div>Second Token</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg flex items-center">
            {withdrawEle.pool?  (
              <>
                <img
                  src={withdrawEle.pool!.token2.icon}
                  alt={withdrawEle.pool!.token2.name}
                  className="w-6 h-6 mr-2"
                />
              <span>{withdrawEle.amountToken2?displayAmount(withdrawEle.pool.token1,withdrawEle.amountToken2):withdrawEle.pool.token2.name}</span>
              </>
            ) : (
              <span>Select a pool to display token</span>
            )}
          </div>
        </div>
        <div>
          <div>Add Amount Liquidity</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg">
            <input
              type="number"
              className="bg-transparent w-full outline-none text-white"
              placeholder="Enter amount"
              value={withdrawEle.liquidity!}
              onChange={(e) => setAmountLiquidity(Number(e.target.value))}
            />
          </div>
        </div>
        <button className="w-[100%] py-1 bg-white text-black h-[40px] rounded-2xl" onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
};

export default WithdrawModal;

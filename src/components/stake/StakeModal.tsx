import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { StakeType } from "../../types";
import DropDownPool, { PoolType } from "../DropdownPool/DropDownPool";
import { Modal, Typography } from "@mui/material";

import React, { useEffect } from "react";
import {
  ActionType,
  updatePool,
  updateStakeAmount,
} from "../../redux/slices/TransactionSlice";

interface Pros {
  stakeEle: StakeType;
  open: boolean;
  handleClose: () => void;
}

const StakeModal = ({ open, handleClose, stakeEle }: Pros) => {
  const dispatch = useAppDispatch();

  const handlePoolSelect = (poolSelected: PoolType) => {
    dispatch(
      updatePool({
        actionSelect: ActionType.STAKE,
        id: stakeEle.id,
        pool: poolSelected,
      })
    );
  };

  const handleSave = () => {
    handleClose();
  };
  const handleInputAmount = (e: number, amountIndex: string) => {
    dispatch(
      updateStakeAmount({
        amountIndex,
        amountValue: e,
        id: stakeEle.id,
      })
    );
  };
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
          Stake token from pool
        </Typography>

        {/* Pass handlePoolSelect to DropDownPool */}
        <DropDownPool
          onSelect={handlePoolSelect}
          id={stakeEle.pool?.id ?? ""}
        />

        <div>
          <div>First Token</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg flex items-center">
            {stakeEle.pool ? (
              <>
                <img
                  src={stakeEle.pool.token1.icon}
                  alt={stakeEle.pool.token1.name}
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="number"
                  className="bg-transparent w-full outline-none text-white"
                  value={stakeEle.amountToken1!}
                  onChange={(e)=>{handleInputAmount(Number(e.target.value),"amount1")}}
                />
              </>
            ) : (
              <span>Select a pool to display token</span>
            )}
          </div>
        </div>

        <div>
          <div>Second Token</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg flex items-center">
            {stakeEle.pool ? (
              <>
                <img
                  src={stakeEle.pool.token2.icon}
                  alt={stakeEle.pool.token2.name}
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="number"
                  className="bg-transparent w-full outline-none text-white"
                  value={stakeEle.amountToken2!}
                  onChange={(e)=>{handleInputAmount(Number(e.target.value),"amount2")}}

                />
              </>
            ) : (
              <span>Select a pool to display token</span>
            )}
          </div>
        </div>

        <div>
          <div>Liquidity</div>
          <div className="p-3 bg-[#2F374E] h-[44px] rounded-lg flex items-center">
            {stakeEle.pool ? (
              <span className="text-white">
                {/* Hiển thị thông tin liquidity (giá trị liquidity có thể truyền từ stakeEle) */}
                {stakeEle.liquidity ?? "0"} 
              </span>
            ) : (
              <span>Select a pool to display liquidity</span>
            )}
          </div>
        </div>

        <button
          className="w-[100%] py-1 bg-white text-black h-[40px] rounded-2xl"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default StakeModal;

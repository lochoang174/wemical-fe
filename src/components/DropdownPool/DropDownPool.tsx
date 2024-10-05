import React, { useState, useEffect } from "react";
import { CryptoList } from "../../utils/CryptoList";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IToken } from "../../types";

export interface PoolType {
  id: string;
  token1: IToken;
  token2: IToken;
}

export const pools: PoolType[] = [
  {
    id: "0",
    token1: CryptoList[0],
    token2: CryptoList[3],
  },
  {
    id: "1",
    token1: CryptoList[0],
    token2: CryptoList[1],
  },
  {
    id: "2",
    token1: CryptoList[0],
    token2: CryptoList[2],
  },
  {
    id: "3",
    token1: CryptoList[3],
    token2: CryptoList[2],
  },
  {
    id: "4",
    token1: CryptoList[3],
    token2: CryptoList[1],
  },
  {
    id: "5",
    token1: CryptoList[1],
    token2: CryptoList[2],
  },
];

interface Props {
  id: string; // Pool ID
  onSelect: (pool: PoolType) => void;
}

const DropDownPool = ({ id, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  // Use effect to set initial pool based on the provided id
  useEffect(() => {
    if (id) {
      const pool = pools.find((pool) => pool.id === id);
      if (pool) {
        setSelectedPool(`${pool.token1.name} / ${pool.token2.name}`);
      }
    }
  }, [id]);

  const handleSelect = (pool: PoolType) => {
    setSelectedPool(`${pool.token1.name} / ${pool.token2.name}`);
    onSelect(pool); // Call the onSelect function passed as prop
    setOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="w-full relative">
      {/* Trigger */}
      <div
        className="w-full bg-[#2F374E] cursor-pointer flex justify-between items-center p-2 rounded-lg h-[44px]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white">
          {selectedPool ? selectedPool : "Select pool"}
        </span>
        <span className="text-white">
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </span>
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-10 w-full mt-2 bg-[#2F374E] p-4 rounded-md shadow-lg flex flex-col gap-2">
          {pools.map((e, i) => (
            <div
              key={i}
              className="flex gap-3 items-center cursor-pointer hover:bg-[#3f4963] p-2 rounded"
              onClick={() => handleSelect(e)}
            >
              <div className="relative flex">
                <img className="w-6 h-6" src={e.token1.icon} alt={e.token1.name} />
                <img
                  className="w-6 h-6 absolute left-[10%] -ml-3"
                  src={e.token2.icon}
                  alt={e.token2.name}
                />
              </div>
              <div className="text-white">
                {e.token1.name}
                <span className="mx-1">/</span>
                {e.token2.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownPool;

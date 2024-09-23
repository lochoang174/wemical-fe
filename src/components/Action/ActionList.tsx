import React from 'react'
import ActionItem from './ActionItem';
import { VscArrowSwap } from 'react-icons/vsc';
import { FaArrowUp, FaCoins } from 'react-icons/fa';

const actionList = [
    {
        title: "Convert",
        icon: <VscArrowSwap />,
    },
    {
        title: "Stake",
        icon: <FaCoins />,  
    },
    {
        title: "Unstake",
        icon: <FaArrowUp />,  
    }
];

const ActionList = () => {
  return (
    <div className="flex gap-3">
        {actionList.map((e, i) => (
          <ActionItem title={e.title.toString()} icon={e.icon} key={i}></ActionItem>
        ))}
      </div>
  )
}

export default ActionList

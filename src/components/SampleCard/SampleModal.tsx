import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { VscArrowSwap } from "react-icons/vsc";
import { CryptoList } from "../../utils/CryptoList";
import { SwapType, IToken } from "../../types";
import SampleInput from "./SampleInput";

// Define props type for the modal
interface SampleModalProps {
  open: boolean;
  handleClose: () => void;
}
const list: SwapType[] = [
  {
    action: {
      title: "Convert",
      icon: <VscArrowSwap />,
    },
    amount: 0,
    id: "1123",
    token: CryptoList[0],
  },
  {
    action: {
      title: "Convert",
      icon: <VscArrowSwap />,
    },
    amount: 0,
    id: "1123khjkjhk",
    token: CryptoList[1],
  },
  {
    action: {
      title: "Convert",
      icon: <VscArrowSwap />,
    },
    amount: 0,
    id: "11dasd23",
    token: CryptoList[2],
  },
  {
    action: {
      title: "Convert",
      icon: <VscArrowSwap />,
    },
    amount: 0,
    id: "11dasdda23",
    token: CryptoList[3],
  },
];
const SampleModal: React.FC<SampleModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      autoFocus={false}
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 570,
          height: 500,
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          gap: 2,
          px: 4,
          py: 2,
          outline: "none",
          bgcolor: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "white" }}
        >
          Preview Recipe
        </Typography>
        <div className="text-white overflow-hidden">
          Provide liquidity to OraiDEX with USDT & USDC Swap ORAI for USDC &
          USDT, then deposit USDC & USDT to provide liquidity for pool V3
        </div>

        <div className="flex items-center gap-3 flex-col">
          {list.map((e, i) => {
            let a: IToken | null = null;
            if (i === list.length - 1) {
              a = null;
              return <></>;
            } else {
              a = list[i + 1].token;
            }
            return <SampleInput input={e} nextToken={a}></SampleInput>;
          })}
          <button className="w-[80%] h-[44px] rounded-xl text-black bg-[#ffffff] ">
            Edit and execute
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default SampleModal;

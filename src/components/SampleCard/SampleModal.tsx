import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { VscArrowSwap } from "react-icons/vsc";
import { CryptoList } from "../../utils/CryptoList";
import { SwapType, IToken, SampleActionType } from "../../types";
import SampleInput from "./SampleInput";
import { ActionType } from "../../redux/slices/TransactionSlice";
import SampleStake from "./SampleStake";
import SampleWithdraw from "./SampleWithdraw";

// Define props type for the modal
interface SampleModalProps {
  open: boolean;
  handleClose: () => void;
  actions: SampleActionType[];
}
const list: SwapType[] = [
  {
    amount: 0,
    id: "1123",
    token: CryptoList[0],
  },
  {
    amount: 0,
    id: "1123khjkjhk",
    token: CryptoList[1],
  },
  {
    amount: 0,
    id: "11dasd23",
    token: CryptoList[2],
  },
  {
    amount: 0,
    id: "11dasdda23",
    token: CryptoList[3],
  },
];
const SampleModal: React.FC<SampleModalProps> = ({
  open,
  handleClose,
  actions,
}) => {
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
          {actions.map((ele, index) => {
            if (ele.action === ActionType.SWAP) {
              return (
                <SampleInput
                  element={ele}
                  key={index} // Use index if no other unique identifier is available
                />
              );
            } else if (ele.action === ActionType.STAKE) {
              return <SampleStake element={ele} key={index} />;
            } else if (ele.action === ActionType.WITHDRAW) {
              return <SampleWithdraw element={ele} key={index} />;
            }
            return null;
          })}

          <button className="w-[80%] h-[44px] rounded-xl text-black bg-[#ffffff] " onClick={handleClose}>
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default SampleModal;

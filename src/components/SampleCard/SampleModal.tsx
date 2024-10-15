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
  description:string
}

const SampleModal: React.FC<SampleModalProps> = ({
  open,
  handleClose,
  actions,
  description
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
          height: 548,
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
        <div className="text-white overflow-auto ">
         {description}
        </div>

        <div className="flex  flex-col w-[100%]  grow ">
          <div className="flex-grow flex flex-col items-center gap-3 gap-4">
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
          </div>
         

          <button className="w-[80%] h-[44px] rounded-xl text-black bg-[#ffffff] self-center " onClick={handleClose}>
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default SampleModal;

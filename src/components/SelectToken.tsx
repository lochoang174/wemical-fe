import {
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { CryptoList } from "../utils/CryptoList";
import { IToken } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTokenFrom, setTokenTo } from "../redux/slices/SwapSlice";
interface SelectTokenProps {
  open: boolean;
  handleClose: () => void;
  
}
const SelectToken = ({ open, handleClose }: SelectTokenProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const isFrom = useAppSelector((state) => state.swap.isSelectingFromToken);
  const dispatch = useAppDispatch();
  const filteredTokens = CryptoList.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hanldeSelectToken =(token: IToken) => {
      if (isFrom) {
        dispatch(setTokenFrom(token));
      } else {
        dispatch(setTokenTo(token));
      }
      handleClose();
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="select-token-modal"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="bg-white p-5 rounded-xl w-[500px] ">
        <Typography
          id="select-token-modal"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Select a Token
        </Typography>
        <div className="text-[#29292a] text-lg whitespace-nowrap border-2 border-gray-200 rounded-lg p-2 tracking-[0] leading-[normal] flex items-center gap-2 mb-4">
          <CiSearch className="w-5 h-5" />
          <input
            placeholder="Tìm kiếm theo tên token"
            type="text"
            className="w-full bg-transparent outline-none  [&::-webkit-inner-spin-button]:appearance-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <List sx={{ height: 300, overflow: "auto" }}>
          {filteredTokens.map((token, index) => (
            <ListItem
              key={index}
              className="cursor-pointer border-b border-gray-200 bg-gray-100 rounded-xl mb-2"
              onClick={() => hanldeSelectToken(token)}
            >
              <div className="mr-3">
                <Avatar src={token.icon} sx={{ width: 24, height: 24 }} />
              </div>
              <ListItemText
                primary={token.name}
                secondary={token.name === "USDC" ? "USD Coin" : token.name}
              />
              <Typography variant="body2" color="text.secondary">
                --
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          Default list may not include all tokens.
        </Typography>
      </div>
    </Modal>
  );
};

export default React.memo(SelectToken, (prevProps, nextProps) => {
  return prevProps.open === nextProps.open && prevProps.handleClose === nextProps.handleClose;
});
import { Autocomplete, Grid, styled, TextField } from "@mui/material";
import React from "react";
import Search from "./layouyt/Search";
import Dropdown from "../components/SampleCard/Dropdown";
import Card from "../components/SampleCard/Card";
import { sampleList } from "../utils/SampleList";

const Transactions = () => {
  return (
    <div className="flex flex-col h-[100%] gap-5">
      <div className="flex gap-5 h-[50px]">
        <div className="flex text-white gap-4">
          <span className="self-center text-lg">Protocols</span>
          <Dropdown></Dropdown>
        </div>
        <div className="flex text-white gap-4">
          <span className="self-center text-lg">Types</span>
          <Dropdown></Dropdown>
        </div>
        {/* <div>
          <Search></Search>
        </div> */}
      </div>
      <div className="flex-grow overflow-auto">
        <GridContainer container spacing={4}>
          {sampleList.map((s, index) => {
            return (
              <Grid 
              item 
              xs={12}    // 1 item chiếm 12 cột trên màn hình nhỏ (<= 600px)
              md={6}     // 1 item chiếm 6 cột (2 items trên hàng) trên màn hình vừa (600px - 960px)
              lg={4}     // 1 item chiếm 4 cột (3 items trên hàng) trên màn hình lớn hơn (960px - 1280px)
              key={s.id}
              
              >
                <Card sample={s}/>
              </Grid>
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
};
export const GridContainer = styled(Grid)`
  width: 100%;
`;
export default Transactions;

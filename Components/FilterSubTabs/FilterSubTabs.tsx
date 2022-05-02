import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ProductContext } from "../../context/ProductProvider";
import { LinearProgress, Stack } from "@mui/material";
import { SharedContext } from "../../context/SharedProvider";

export default function FilterTabs() {
  const { filterSubItems, filterSubTab } = useContext(ProductContext);
  const { loading } = useContext(SharedContext);

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [filterSubItems]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    filterSubTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {" "}
        {loading ? (
          <Stack
            sx={{ width: "100%", color: "grey.500", height: 20, marginTop: 5 }}
            spacing={2}
          >
            <LinearProgress color="inherit" />
          </Stack>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            sx={{ margin: "auto" }}
          >
            {filterSubItems !== null && filterSubItems.length > 0 && (
              <Tab label="All" value={0} />
            )}
            {filterSubItems !== null &&
              filterSubItems.length > 0 &&
              filterSubItems?.map((item) => {
                return (
                  item.type === "SubTag" && (
                    <Tab label={item.label} value={item.id} key={item.id} />
                  )
                );
              })}
          </Tabs>
        )}
      </Box>
    </Box>
  );
}

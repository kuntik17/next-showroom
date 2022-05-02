import React, { useContext, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ProductContext } from "../../context/ProductProvider";
import { LinearProgress, Stack } from "@mui/material";
import { SharedContext } from "../../context/SharedProvider";

export default function FilterTabs() {
  const { filterItems, filterProductsTab, filterState } =
    useContext(ProductContext);
  const { loading } = useContext(SharedContext);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!filterState.tagFilter) {
      setValue(0);
    }

    return () => {};
  }, [filterState.tagFilter]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    filterProductsTab(newValue);
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
            <Tab label="New" value={0} />
            {filterItems?.map((item) => {
              return (
                item.type === "Tag" && (
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

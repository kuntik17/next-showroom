import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton } from "@mui/material";
import FilterItem from "../../Interfaces/FilterItem";

export default function CheckboxListSecondary() {
  const { filterItems, filterProductsTab } = useContext(ProductContext);
  const [checkedItems, setCheckedItems] = useState<
    FilterItem[] | null | undefined
  >([]);

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setCheckedItems(filterItems);
    return () => {};
  }, [filterItems]);

  const handleChange = async (event: any) => {
    setChecked(false);
    let newCheckedItems: FilterItem[] | null | undefined = [];
    newCheckedItems = await checkedItems?.map((i) => {
      if (i.label === event.target.value) {
        i.checked = event.target.checked;
      }
      return i;
    });
    setCheckedItems(newCheckedItems);
    newCheckedItems!.forEach((i) => {
      if (i.checked) {
        setChecked(true);
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleReset = async () => {
    let newCheckedItems: FilterItem[] | null | undefined = [];
    newCheckedItems = await checkedItems?.map((i) => {
      i.checked = false;

      return i;
    });
    setCheckedItems(newCheckedItems);

    setOpen(false);
    setChecked(false);
    //  filterProductsTab([]);
  };

  const handleFilter = () => {
    let checkedItem = checkedItems?.filter((i) => {
      return i.checked;
    });
    setOpen(false);
    //  filterProductsTab(checkedItem);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <FilterAltIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ m: 4 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Select collection</FormLabel>
            <FormGroup>
              {filterItems?.map((item) => {
                return (
                  item.type === "Collection" && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          key={item.label}
                          onChange={handleChange}
                          name={item.label}
                          value={item.label}
                          checked={item.checked}
                        />
                      }
                      key={item.label}
                      label={item.label}
                    />
                  )
                );
              })}
            </FormGroup>
            <FormLabel component="legend">Select tag</FormLabel>
            <FormGroup>
              {checkedItems?.map((item) => {
                return (
                  item.type === "Tag" && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChange}
                          name={item.label}
                          value={item.label}
                          checked={item.checked}
                          key={item.label}
                        />
                      }
                      key={item.label}
                      label={item.label}
                    />
                  )
                );
              })}
            </FormGroup>
          </FormControl>
          )
        </Box>
        <DialogActions>
          {checked ? (
            <Button onClick={handleReset}>Reset</Button>
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}
          <Button onClick={handleFilter}>Filter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

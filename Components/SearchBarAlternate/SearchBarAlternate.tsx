import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { ProductContext } from "../../context/ProductProvider";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
export default function SearchBarAlternate() {
  const { findKeyword, searchKeyword } = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { key: string }) => {
    if (e.key === "Enter") {
      findKeyword(searchTerm);
    } else if (e.key === "Backspace") {
      cancelSearch();
    }
  };

  const searchOnChange = (e: any) => {
    setSearchTerm(e.target.value);
    findKeyword(e.target.value);
  };

  const cancelSearch = () => {
    setSearchTerm("");
    findKeyword("");
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
        <Input
          sx={{ width: 380, marginTop: 10 }}
          id="input-with-icon-adornment"
          onChange={searchOnChange}
          onKeyDown={handleSearch}
          value={searchKeyword}
          onClick={cancelSearch}
          onMouseDown={cancelSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            searchKeyword !== null &&
            searchKeyword.length > 0 && (
              <InputAdornment position="end">
                <IconButton onClick={cancelSearch}>
                  <CancelIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </FormControl>
    </Box>
  );
}

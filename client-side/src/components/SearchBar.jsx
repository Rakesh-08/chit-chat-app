import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = () => {
  let [search, setSearch] = useState("");
 

  let handleSearch = (e) => {
    e.preventDefault();
    console.log("hellow")
  };

  return (
    <div className="d-flex justify-content-center">
       <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        marginRight: "1em",
         
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="search your contacts..."
        style={{ outline: "none", border: 0 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
          color: "gray",
        
        }}
      >
        <Search />
      </IconButton>
    </Paper>
    </div>
   
  );
};

export default SearchBar;

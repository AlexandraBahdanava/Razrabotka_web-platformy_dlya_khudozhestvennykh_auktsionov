import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <TextField
      variant="outlined"
      placeholder="Search by tags"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: { borderRadius: '20px' },
      }}
      sx={{ '& fieldset': { borderRadius: 20 } }}
    />
  );
}

export default SearchBar;

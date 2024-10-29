
import { TextField, Box } from "@mui/material";

const SearchBar = ({ filter, onFilterChange }) => {
  return (
    <Box my={2}>
      <TextField
        fullWidth
        variant="outlined"
        label="Пошук ікон"
        value={filter}
        onChange={onFilterChange}
      />
    </Box>
  );
};

export default SearchBar;

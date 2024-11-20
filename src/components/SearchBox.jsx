
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../redux/filtersSlice';
import { TextField } from '@mui/material';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleSearchChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <TextField
      fullWidth
      label="Пошук ікон"
      variant="outlined"
      value={filter}
      onChange={handleSearchChange}
      sx={{
        marginBottom: 3,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#7B0000' },
          '&:hover fieldset': { borderColor: '#7B0000' },
          '&.Mui-focused fieldset': { borderColor: '#7B0000' },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#7B0000',
        },
      }}
    />
  );
};

export default SearchBox;

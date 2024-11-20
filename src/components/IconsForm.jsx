import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIcon } from '../redux/iconsSlice';
import { Box, TextField, Button } from '@mui/material';

const IconsForm = () => {
  const dispatch = useDispatch();
  const [iconData, setIconData] = useState({
    name: '',
    number: '',
    shelf: '',
    note: '', // Примітка
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIconData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!iconData.name || !iconData.number || !iconData.shelf) return;
    dispatch(addIcon({ ...iconData, id: Date.now().toString() }));
    setIconData({ name: '', number: '', shelf: '', note: '' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mb: 4,
      }}
    >
      <TextField
        label="Назва ікони"
        name="name"
        value={iconData.name}
        onChange={handleChange}
        required
        fullWidth
        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7B0000' } } }}
      />
      <TextField
        label="Номер ікони"
        name="number"
        value={iconData.number}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Номер шафи"
        name="shelf"
        value={iconData.shelf}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Примітка"
        name="note"
        value={iconData.note}
        onChange={handleChange}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#7B0000' },
            '&:hover fieldset': { borderColor: '#7B0000' },
            '&.Mui-focused fieldset': { borderColor: '#7B0000' },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#7B0000',
          color: '#fff',
          '&:hover': { backgroundColor: '#5A0000' },
        }}
      >
        Додати ікону
      </Button>
    </Box>
  );
};

export default IconsForm;

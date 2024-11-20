import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons, deleteIcon } from '../redux/iconsSlice';
import { selectNameFilter } from '../redux/filtersSlice';
import { Box, Button, Grid, Typography, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IconList = () => {
  const [isListVisible, setIsListVisible] = useState(true);
  const icons = useSelector(selectIcons);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Button
        variant="contained"
        onClick={toggleListVisibility}
        sx={{
          backgroundColor: '#FFC107',
          color: '#7B0000',
          marginBottom: 2,
          '&:hover': { backgroundColor: '#E0A800' },
        }}
      >
        {isListVisible ? 'Згорнути список' : 'Розгорнути список'}
      </Button>

      {isListVisible && (
        <Grid container spacing={2} justifyContent="center">
          {filteredIcons.map((icon) => (
            <Grid item xs={12} sm={6} md={4} key={icon.id}>
              <Card
                sx={{
                  backgroundColor: '#fff',
                  border: '1px solid #E0E0E0',
                  borderRadius: 2,
                  minHeight: 150,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#7B0000', marginBottom: 1 }}>
                    {icon.name}
                  </Typography>
                  <Typography sx={{ marginBottom: 1 }}>Номер: {icon.number}</Typography>
                  <Typography sx={{ marginBottom: 1 }}>Шафа: {icon.shelf}</Typography>
                  {icon.note && (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#757575' }}>
                      Примітка: {icon.note}
                    </Typography>
                  )}
                  <IconButton
                    onClick={() => dispatch(deleteIcon(icon.id))}
                    sx={{ color: '#7B0000' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default IconList;

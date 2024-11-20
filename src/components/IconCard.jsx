
import { useDispatch } from 'react-redux';
import { deleteIcon } from '../redux/iconsSlice';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IconCard = ({ id, name, number, shelf, note }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteIcon(id));
  };

  return (
    <Card sx={{ width: 300, height: 200, margin: 1, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h6" component="div" color="primary">
          {name}
        </Typography>
        <Typography variant="body2">Номер: {number}</Typography>
        <Typography variant="body2">Шафа: {shelf}</Typography>
        {note && (
          <Box mt={1}>
            <Typography variant="body2" color="textSecondary">
              Примітка: {note}
            </Typography>
          </Box>
        )}
      </CardContent>
      <IconButton
        aria-label="delete"
        onClick={handleDelete}
        sx={{ color: '#d32f2f', marginLeft: 'auto' }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default IconCard;

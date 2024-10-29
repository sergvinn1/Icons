
import { Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Icon = ({ name, number, clothes, id, onDeleteIcon }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="#f3f3f3" borderRadius={1} mb={1}>
      <Typography variant="body1" color="textPrimary">
        {name}: {number}, {clothes}
      </Typography>
      <IconButton color="error" onClick={() => onDeleteIcon(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Icon;

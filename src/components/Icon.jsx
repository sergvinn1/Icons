
import { Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Icon = ({ name, number, clothes, id, onDeleteIcon }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="#f3f3f3"
      borderRadius={2}
      boxShadow={2}
      height="150px"  // Фіксована висота картки
    >
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
        Номер: {number}, Шафа: {clothes}
      </Typography>
      <IconButton color="error" onClick={() => onDeleteIcon(id)} sx={{ alignSelf: "center", mt: 1 }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Icon;

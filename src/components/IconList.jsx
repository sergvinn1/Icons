
import Icon from "./Icon";
import { Box } from "@mui/material";

const IconList = ({ icons, onDeleteIcon }) => {
  return (
    <Box 
      display="grid" 
      gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" 
      gap={2} 
      width="100%"
    >
      {icons.map((icon) => (
        <Icon key={icon.id} {...icon} onDeleteIcon={onDeleteIcon} />
      ))}
    </Box>
  );
};

export default IconList;

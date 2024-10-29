
import Icon from "../NewIcon/Icon";
import { List, ListItem } from "@mui/material";

const IconList = ({ icons, onDeleteIcon }) => {
  return (
    <List>
      {icons.map((icon) => (
        <ListItem key={icon.id} disablePadding>
          <Icon {...icon} onDeleteIcon={onDeleteIcon} />
        </ListItem>
      ))}
    </List>
  );
};

export default IconList;

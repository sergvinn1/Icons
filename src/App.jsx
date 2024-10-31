import { useState } from "react";
import IconList from "./components/IconList";
import IconForm from "./components/IconForm";
import SearchBar from "./components/SearchBar";
/*import Auth from "./components/Auth";*/
import { Container, Typography, CssBaseline, Button, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = () => {
  const [icons, setIcons] = useState([
    { id: "id-1", name: "Свята Трійця", number: "001", clothes: "1" },
    { id: "id-2", name: "Воскресіння Христове", number: "002", clothes: "1" },
  ]);
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  /*const [isAuthenticated, setIsAuthenticated] = useState(false);*/ // Стан для авторизації

  const theme = createTheme({
    palette: {
      primary: {
        main: "#770007",
      },
      secondary: {
        main: "#ebba62",
      },
      error: {
        main: "#ff0000",
      },
      background: {
        default: "#f3f3f3",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addIcon = (newIcon) => {
    setIcons((prevIcons) => [...prevIcons, newIcon]);
  };

  const deleteIcon = (iconId) => {
    setIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== iconId));
  };

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(filter.toLowerCase())
  );

 /* if (!isAuthenticated) {
    return <Auth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }*/

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ padding: 2, backgroundColor: "white", borderRadius: 2, boxShadow: 3, mt: 4 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h4" color="primary">
            Ікони
          </Typography>
        </Box>
        <IconForm addIcon={addIcon} />
        <SearchBar filter={filter} onFilterChange={handleFilterChange} />
        <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "Розгорнути список" : "Згорнути список"}
          </Button>
        </Box>
        {!collapsed && filteredIcons.length > 0 && (
          <IconList icons={filteredIcons} onDeleteIcon={deleteIcon} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;

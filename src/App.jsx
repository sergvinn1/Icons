import { useEffect, useState } from "react";
import IconList from "./components/IconList/IconList";
import IconForm from "./components/IconForm/IconForm";
import SearchBar from "./components/SearchBar/SearchBar";
import { Container, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

const App = () => {

  useEffect(() => {
    document.title = "Ікони";
  }, []);  

  const getInitialIcons = () => {
    const savedIcons = localStorage.getItem("icons");
    return savedIcons
      ? JSON.parse(savedIcons)
      : [
          { id: "id-1", name: "Свята Трійця", number: "001", clothes: "1" },
          { id: "id-2", name: "Воскресіння Христове", number: "002", clothes: "1" },
        ];
  };

  const [icons, setIcons] = useState(getInitialIcons);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("icons", JSON.stringify(icons));
  }, [icons]);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ padding: 2, backgroundColor: "white", borderRadius: 2, boxShadow: 3, mt: 4 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Ікони
        </Typography>
        <IconForm addIcon={addIcon} />
        <SearchBar filter={filter} onFilterChange={handleFilterChange} />
        <IconList icons={filteredIcons} onDeleteIcon={deleteIcon} />
      </Container>
    </ThemeProvider>
  );
};

export default App;

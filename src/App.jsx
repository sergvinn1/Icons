
import IconsForm from './components/IconsForm';
import SearchBox from './components/SearchBox';
import IconList from './components/IconList';
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Ікони
      </Typography>
      <IconsForm />
      <SearchBox />
      <IconList />
    </Container>
  );
};

export default App;

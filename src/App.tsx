import React from 'react';
import {
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import ChallengeTodo from './pages/ChallengeTodo';
import ChallengeStopwatch from './pages/ChallengeStopwatch';
import ChallengeUsers from './pages/ChallengeUsers';
import Home from './pages/Home';
import ChallengeCountry from './pages/ChallengeCountry';
import ChallengeMap from './pages/ChallengeMap';
import ChallengeFilter from './pages/ChallengeFilter';

const challenges = [
  { name: 'ToDo', path: '/todo/low' },
  { name: 'Stopwatch', path: '/stopwatch/low' },
  { name: 'Users', path: '/users/low' },
  { name: 'Country', path: '/country/mid' },
];

const challengesMethods = [
  { name: 'Map', path: '/map/low' },
  { name: 'Filter', path: '/filter/low' },
];

export default function App() {
  const location = useLocation();
  // Estado para el menú de Métodos
  const [anchorElMethods, setAnchorElMethods] =
    React.useState<null | HTMLElement>(null);
  const openMethods = Boolean(anchorElMethods);

  // Estado para el menú de Challenges
  const [anchorElChallenges, setAnchorElChallenges] =
    React.useState<null | HTMLElement>(null);
  const openChallenges = Boolean(anchorElChallenges);

  const handleMethodsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMethods(event.currentTarget);
  };

  const handleChallengesClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElChallenges(event.currentTarget);
  };

  const handleMethodsClose = () => setAnchorElMethods(null);
  const handleChallengesClose = () => setAnchorElChallenges(null);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            React Challenges
          </Typography>
          <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button
              id="methods-button"
              aria-controls={openMethods ? 'methods-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMethods ? 'true' : undefined}
              onClick={handleMethodsClick}
              color="inherit"
            >
              Methods
            </Button>
            <Menu
              id="methods-menu"
              anchorEl={anchorElMethods}
              open={openMethods}
              onClose={handleMethodsClose}
              MenuListProps={{
                'aria-labelledby': 'methods-button',
              }}
            >
              {challengesMethods.map((methods) => {
                const methodBasePath = `/${methods.name.toLowerCase()}`;
                const isSelected = location.pathname.startsWith(methodBasePath);
                return (
                  <MenuItem
                    key={methods.name}
                    selected={isSelected}
                    onClick={handleMethodsClose}
                    component={RouterLink}
                    to={methods.path}
                  >
                    {methods.name}
                    {isSelected && <Check sx={{ ml: 'auto' }} />}
                  </MenuItem>
                );
              })}
            </Menu>
            <Button
              id="challenges-button"
              aria-controls={openChallenges ? 'challenges-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openChallenges ? 'true' : undefined}
              onClick={handleChallengesClick}
              color="inherit"
            >
              Challenges
            </Button>
            <Menu
              id="challenges-menu"
              anchorEl={anchorElChallenges}
              open={openChallenges}
              onClose={handleChallengesClose}
              MenuListProps={{
                'aria-labelledby': 'challenges-button',
              }}
            >
              {challenges.map((challenge) => {
                const challengeBasePath = `/${challenge.name.toLowerCase()}`;
                const isSelected =
                  location.pathname.startsWith(challengeBasePath);
                return (
                  <MenuItem
                    key={challenge.name}
                    selected={isSelected}
                    onClick={handleChallengesClose}
                    component={RouterLink}
                    to={challenge.path}
                  >
                    {challenge.name}
                    {isSelected && <Check sx={{ ml: 'auto' }} />}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/*" element={<ChallengeTodo />} />
          <Route path="/stopwatch/*" element={<ChallengeStopwatch />} />
          <Route path="/users/*" element={<ChallengeUsers />} />
          <Route path="/country/*" element={<ChallengeCountry />} />
          <Route path="/map/*" element={<ChallengeMap />} />
          <Route path="/filter/*" element={<ChallengeFilter />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Container>
    </Box>
  );
}

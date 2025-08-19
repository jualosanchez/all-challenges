import React from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, Menu, MenuItem } from '@mui/material';
import Check from '@mui/icons-material/Check';
import ChallengeTodo from './pages/ChallengeTodo';
import ChallengeStopwatch from './pages/ChallengeStopwatch';
import ChallengeUsers from './pages/ChallengeUsers';
import Home from './pages/Home';
import ChallengeCountry from './pages/ChallengeCountry';

const challenges = [
  { name: 'ToDo', path: '/todo/low' },
  { name: 'Stopwatch', path: '/stopwatch/low' },
  { name: 'Users', path: '/users/low' },
  { name: 'Country', path: '/country/mid' },
];

export default function App() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              id="challenges-button"
              aria-controls={open ? 'challenges-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
            >
              Challenges
            </Button>
            <Menu
              id="challenges-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'challenges-button',
              }}
            >
              {challenges.map((challenge) => {
                const challengeBasePath = `/${challenge.name.toLowerCase()}`;
                const isSelected = location.pathname.startsWith(challengeBasePath);
                return (
                  <MenuItem
                    key={challenge.name}
                    selected={isSelected}
                    onClick={handleClose}
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
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Container>
    </Box>
  );
}

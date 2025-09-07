import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import ChallengeArrayMapLow from './low/map/ChallengeArrayMapLow';
import ChallengeArrayMapMid from './mid/map/ChallengeArrayMapMid';
import ChallengeArrayMapHard from './hard/map/ChallengeArrayMapHard';

export default function ChallengeMap() {
  return (
    <section>
      <h2>Challenge: Array Map</h2>

      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      <Paper elevation={3} sx={{ p: 2, my: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          map()
        </Typography>
        <Typography variant="body1" component="p">
          El método <code>map()</code> crea un nuevo array al aplicar una
          función a cada elemento del array original. Es ideal para renderizar
          listas de componentes en React, ya que puedes transformar un array de
          datos en un array de elementos JSX. No muta el array original.
        </Typography>
      </Paper>

      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<ChallengeArrayMapLow />} />
        <Route path="mid" element={<ChallengeArrayMapMid />} />
        <Route path="hard" element={<ChallengeArrayMapHard />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}

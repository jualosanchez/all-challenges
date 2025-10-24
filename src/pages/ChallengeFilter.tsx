import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import { lazy, Suspense } from 'react';

const ChallengeFilterLow = lazy(
  () => import('./low/filter/ChallengeFilterLow')
);
const ChallengeFilterMid = lazy(
  () => import('./mid/filter/ChallengeFilterMid')
);
const ChallengeFilterHard = lazy(
  () => import('./hard/filter/ChallengeFilterHard')
);

export default function ChallengeFilter() {
  return (
    <section>
      <h2>Challenge: Filter()</h2>

      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      <Paper elevation={3} sx={{ p: 2, my: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          filter()
        </Typography>
        <Typography variant="body1" component="p">
          El método <code>filter()</code> crea un nuevo array con todos los
          elementos que pasan una prueba (una función que devuelve true o
          false). Es perfecto para mostrar subconjuntos de datos en función de
          alguna condición, como filtrar elementos por una propiedad. No muta el
          array original.
        </Typography>
      </Paper>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeFilterLow />} />
          <Route path="mid" element={<ChallengeFilterMid />} />
          <Route path="hard" element={<ChallengeFilterHard />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </section>
  );
}

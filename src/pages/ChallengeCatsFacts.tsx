import { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const ChallengeCatsFactsLow = lazy(
  () => import('./low/cats-facts/ChallengeCatsFactsLow')
);
const ChallengeCatsFactsMid = lazy(
  () => import('./mid/cats-facts/ChallengeCatsFactsMid')
);

function ChallengeCatsFacts() {
  return (
    <section>
      <h2>Challenge: Cats Facts</h2>

      {/* Navegación local de niveles */}
      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
      </nav>

      {/* Rutas anidadas */}
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeCatsFactsLow />} />
          <Route path="mid" element={<ChallengeCatsFactsMid />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </section>
  );
}

export default ChallengeCatsFacts;

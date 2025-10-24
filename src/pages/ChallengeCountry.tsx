import { lazy, Suspense, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ChallengeCountryMid = lazy(
  () => import('./mid/country/ChallengeCountryMid')
);
const ChallengeCountryLow = lazy(
  () => import('./low/country/ChallengeCountryLow')
);
const ChallengeCountryHard = lazy(
  () => import('./hard/country/ChallengeCountryHard')
);

export default function ChallengeCountry() {
  // Uso useState para crear el QueryClient una sola vez por montaje del componente
  // y mantener estable la instancia entre re-renders.
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: true },
        },
      })
  );

  return (
    <QueryClientProvider client={qc}>
      <section>
        <h2>Challenge: Country</h2>

        {/* Navegación local de niveles */}
        <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
          <Link to="low">Low</Link>
          <Link to="mid">Mid</Link>
          <Link to="hard">Hard</Link>
        </nav>

        {/* Rutas anidadas */}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="low" replace />} />
            <Route path="low" element={<ChallengeCountryLow />} />
            <Route path="mid" element={<ChallengeCountryMid />} />
            <Route path="hard" element={<ChallengeCountryHard />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </Suspense>
      </section>
    </QueryClientProvider>
  );
}

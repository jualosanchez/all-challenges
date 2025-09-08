import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeCountryMid from './mid/country/ChallengeCountryMid';
import ChallengeCountryLow from './low/country/ChallengeCountryLow';
import ChallengeCountryHard from './hard/country/ChallengeCountryHard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default function ChallengeCountry() {
  return (
    <QueryClientProvider client={client}>
      <section>
        <h2>Challenge: Country</h2>

        {/* Navegación local de niveles */}
        <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
          <Link to="low">Low</Link>
          <Link to="mid">Mid</Link>
          <Link to="hard">Hard</Link>
        </nav>

        {/* Rutas anidadas */}
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeCountryLow />} />
          <Route path="mid" element={<ChallengeCountryMid />} />
          <Route path="hard" element={<ChallengeCountryHard />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </section>
    </QueryClientProvider>
  );
}

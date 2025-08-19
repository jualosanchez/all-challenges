import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeCountryMid from './mid/country/ChallengeCountryMid';

export default function ChallengeCountry() {
  return (
    <section>
      <h2>Challenge: Country</h2>

      {/* Navegación local de niveles */}
      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="mid">Mid</Link>
      </nav>

      {/* Rutas anidadas */}
      <Routes>
        <Route index element={<Navigate to="mid" replace />} />
        <Route path="mid" element={<ChallengeCountryMid />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
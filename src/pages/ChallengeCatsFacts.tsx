import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeCatsFactsLow from './low/cats-facts/ChallengeCatsFactsLow';
import ChallengeCatsFactsMid from './mid/cats-facts/ChallengeCatsFactsMid';

export default function ChallengeTodo() {
  return (
    <section>
      <h2>Challenge: Cats Facts</h2>

      {/* Navegación local de niveles */}
      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
      </nav>

      {/* Rutas anidadas */}
      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<ChallengeCatsFactsLow />} />
        <Route path="mid" element={<ChallengeCatsFactsMid />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}

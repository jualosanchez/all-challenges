import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

export default function ChallengeTodo() {
  return (
    <section>
      <h2>Challenge: ToDo</h2>

      {/* Navegación local de niveles */}
      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      {/* Rutas anidadas */}
      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<p>ToDo – LOW (mock)</p>} />
        <Route path="mid" element={<p>ToDo – MID (mock)</p>} />
        <Route path="hard" element={<p>ToDo – HARD (mock)</p>} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
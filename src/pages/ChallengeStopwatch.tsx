import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

export default function ChallengeStopwatch() {
  return (
    <section>
      <h2>Challenge: Stopwatch</h2>

      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<p>Stopwatch – LOW (mock)</p>} />
        <Route path="mid" element={<p>Stopwatch – MID (mock)</p>} />
        <Route path="hard" element={<p>Stopwatch – HARD (mock)</p>} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
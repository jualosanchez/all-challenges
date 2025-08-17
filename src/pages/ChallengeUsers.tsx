import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeUsersLow from '../components/low/ChallengeUsersLow';

export default function ChallengeUsers() {
  return (
    <section>
      <h2>Challenge: Users</h2>

      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<ChallengeUsersLow />} />
        <Route path="mid" element={<p>Users – MID (mock)</p>} />
        <Route path="hard" element={<p>Users – HARD (mock)</p>} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
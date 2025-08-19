import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeUsersLow from './low/users/ChallengeUsersLow';
import ChallengeUsersMid from './mid/users/ChallengeUsersMid';
import ChallengeUsersHard from './hard/users/ChallengeUsersHard';

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
        <Route path="mid" element={<ChallengeUsersMid />} />
        <Route path="hard" element={<ChallengeUsersHard />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
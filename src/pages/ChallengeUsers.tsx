import { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const ChallengeUsersLow = lazy(() => import('./low/users/ChallengeUsersLow'));
const ChallengeUsersMid = lazy(() => import('./mid/users/ChallengeUsersMid'));
const ChallengeUsersHard = lazy(
  () => import('./hard/users/ChallengeUsersHard')
);

export default function ChallengeUsers() {
  return (
    <section>
      <h2>Challenge: Users</h2>

      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
      </nav>

      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeUsersLow />} />
          <Route path="mid" element={<ChallengeUsersMid />} />
          <Route path="hard" element={<ChallengeUsersHard />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </section>
  );
}

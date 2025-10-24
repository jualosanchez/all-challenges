import { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const ChallengeToDoLow = lazy(() => import('./low/todo/ChallengeToDoLow'));
const ChallengeToDoMid = lazy(() => import('./mid/todo/ChallengeToDoMid'));
const ChallengeToDoHard = lazy(() => import('./hard/todo/ChallengeToDoHard'));
const ChallengeToDoReduxMid = lazy(
  () => import('./mid/todo/ChallengeToDoReduxMid')
);

export default function ChallengeTodo() {
  return (
    <section>
      <h2>Challenge: ToDo</h2>

      {/* Navegación local de niveles */}
      <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <Link to="low">Low</Link>
        <Link to="mid">Mid</Link>
        <Link to="hard">Hard</Link>
        <Link to="redux">Redux Toolkit</Link>
      </nav>

      {/* Rutas anidadas */}
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeToDoLow />} />
          <Route path="mid" element={<ChallengeToDoMid />} />
          <Route path="hard" element={<ChallengeToDoHard />} />
          <Route path="redux" element={<ChallengeToDoReduxMid />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Suspense>
    </section>
  );
}

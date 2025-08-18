import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeToDoLow from '../components/low/todo/ChallengeToDoLow';
import ChallengeToDoMid from '../components/mid/todo/ChallengeToDoMid';
import ChallengeToDoHard from '../components/hard/todo/ChallengeToDoHard';
import ToDoRedux from '../components/ToDoRedux';

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
      <Routes>
        <Route index element={<Navigate to="low" replace />} />
        <Route path="low" element={<ChallengeToDoLow />} />
        <Route path="mid" element={<ChallengeToDoMid />} />
        <Route path="hard" element={<ChallengeToDoHard />} />
        <Route path="redux" element={<ToDoRedux />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
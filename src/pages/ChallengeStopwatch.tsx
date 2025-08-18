import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeStopwatchLow from '../components/low/stopwatch/ChallengeStopwatchLow';
import ChallengeStopwatchMid from '../components/mid/stopwatch/ChallengeStopwatchMid';
import ChallengeStopwatchHard from '../components/hard/stopwatch/ChallengeStopwatchHard';

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
        <Route path="low" element={<ChallengeStopwatchLow />} />
        <Route path="mid" element={<ChallengeStopwatchMid />} />
        <Route path="hard" element={<ChallengeStopwatchHard />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </section>
  );
}
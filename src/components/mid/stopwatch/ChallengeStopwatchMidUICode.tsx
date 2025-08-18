import CodeViewer from '../../CodeViewer';

const codeString = `
import React, { useEffect, useRef, useState } from "react";

export default function ChallengeStopwatchMid() {
  type Lap = { id: number; atMs: number };

  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setElapsedMs((prev) => prev + 50);
      }, 50);
    }
    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  function format(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    const cc = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return mm + ":" + ss + "." + cc;
  }

  function start() { setRunning(true); }
  function pause() { setRunning(false); }
  function resetAll() { setRunning(false); setElapsedMs(0); setLaps([]); }
  function addLap() { setLaps((prev) => [...prev, { id: Date.now(), atMs: elapsedMs }]); }

  return (
    <section style={{ maxWidth: 520, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h2>Stopwatch (Mid)</h2>
      <div style={{ fontSize: 36, fontVariantNumeric: "tabular-nums", textAlign: "center" }}>
        {format(elapsedMs)}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {!running ? (
          <button onClick={start} aria-label={"Start stopwatch"}>Start</button>
        ) : (
          <button onClick={pause} aria-label={"Pause stopwatch"}>Pause</button>
        )}
        <button onClick={addLap} aria-label={"Add lap"} disabled={!running}>Lap</button>
        <button onClick={resetAll} aria-label={"Reset stopwatch"} disabled={elapsedMs === 0 && laps.length === 0}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3 style={{ margin: "8px 0" }}>Laps</h3>
          <ol style={{ paddingLeft: 20 }}>
            {laps.map((l, idx) => (
              <li key={l.id} style={{ lineHeight: 1.6 }}>
                Lap {idx + 1}: {format(l.atMs)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
`;

export default function ChallengeStopwatchMidUICode() {
  return <CodeViewer code={codeString} title="Source Code: ChallengeStopwatchMid.tsx" />;
}

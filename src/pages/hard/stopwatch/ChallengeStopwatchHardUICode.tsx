import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ChallengeStopwatchHard() {
  type Lap = { id: number; atMs: number; deltaMs: number };

  const [startAnchor, setStartAnchor] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<number | null>(null);
  const lastLapAtRef = useRef(0);

  useEffect(() => {
    if (running) {
      setStartAnchor((prev) => prev ?? Date.now() - elapsedMs);
      intervalRef.current = window.setInterval(() => {
        setElapsedMs((prev) => {
          const anchor = startAnchor ?? Date.now() - prev;
          return Date.now() - anchor;
        });
      }, 50);
    }
    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, startAnchor, elapsedMs]);

  function format(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    const cc = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return mm + ":" + ss + "." + cc;
  }

  function start() { if (!running) setRunning(true); }
  function pause() { if (running) setRunning(false); }
  function resetAll() {
    setRunning(false);
    setElapsedMs(0);
    setStartAnchor(null);
    setLaps([]);
    lastLapAtRef.current = 0;
  }

  function addLap() {
    const at = elapsedMs;
    const delta = laps.length === 0 ? at : at - lastLapAtRef.current;
    lastLapAtRef.current = at;
    setLaps((prev) => [...prev, { id: Date.now(), atMs: at, deltaMs: Math.max(0, delta) }]);
  }

  const stats = useMemo(() => {
    if (laps.length === 0) return null;
    let best = laps[0];
    let worst = laps[0];
    for (const l of laps) {
      if (l.deltaMs < best.deltaMs) best = l;
      if (l.deltaMs > worst.deltaMs) worst = l;
    }
    return { bestId: best.id, worstId: worst.id };
  }, [laps]);

  return (
    <section style={{ maxWidth: 640, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h2>Stopwatch (Hard)</h2>

      <div style={{ fontSize: 40, fontVariantNumeric: "tabular-nums", textAlign: "center" }}>
        {format(elapsedMs)}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {!running ? (
          <button onClick={start} aria-label={"Start stopwatch"}>Start</button>
        ) : (
          <button onClick={pause} aria-label={"Pause stopwatch"}>Pause</button>
        )}
        <button onClick={addLap} aria-label={"Add lap"} disabled={!running}>Lap</button>
        <button onClick={resetAll} aria-label={"Reset stopwatch"} disabled={!running && elapsedMs === 0 && laps.length === 0}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h3 style={{ margin: "8px 0" }}>Laps</h3>
          <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Split</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((l, idx) => (
                <tr key={l.id} style={{ borderTop: "1px solid #eee" }}>
                  <td>
                    <span
                      style={{
                        padding: "2px 6px",
                        borderRadius: 6,
                        background:
                          ${'${'}stats && l.id === stats.bestId ? "#e6ffed" :
                          ${'${'}stats && l.id === stats.worstId ? "#ffeaea" : "transparent"},
                      }}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td>{format(l.deltaMs)}</td>
                  <td>{format(l.atMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            Best lap highlighted in green, worst in red.
          </p>
        </div>
      )}
    </section>
  );
}
`;

export default function ChallengeStopwatchHardUICode() {
  return (
    <CodeViewer
      code={codeString}
      title="Source Code: ChallengeStopwatchHard.tsx"
    />
  );
}

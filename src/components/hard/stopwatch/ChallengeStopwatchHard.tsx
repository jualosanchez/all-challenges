import { useEffect, useMemo, useRef, useState } from "react";
import ChallengeStopwatchHardUICode from "./ChallengeStopwatchHardUICode";

/**
 * ES: Nivel ALTO — Añade mejores prácticas:
 *     - cálculo de tiempo preciso usando anclaje de inicio
 *     - laps con duración parcial y total
 *     - memo de estadísticas básicas (mejor y peor lap)
 *
 * EN: HIGH level — Adds better practices:
 *     - accurate time using start anchor
 *     - laps with split and total times
 *     - memoized basic stats (best and worst lap)
 */
export default function ChallengeStopwatchHard() {
  type Lap = { id: number; atMs: number; deltaMs: number }; // deltaMs es la duración respecto de la vuelta anterior

  // ES: Guardamos cuando comenzó para reducir deriva de intervalos.
  // EN: Keep when it started to reduce interval drift.
  const [startAnchor, setStartAnchor] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<number | null>(null);

  // ES: Última marca para calcular delta de la siguiente vuelta.
  // EN: Last mark to compute next lap delta.
  const lastLapAtRef = useRef(0);

  useEffect(() => {
    if (running) {
      // ES: Al iniciar, anclamos startAnchor si no existe.
      // EN: On start, anchor startAnchor if missing.
      setStartAnchor((prev) => prev ?? Date.now() - elapsedMs);

      intervalRef.current = window.setInterval(() => {
        // ES: Recomputamos en base a Date.now y el anclaje de inicio.
        // EN: Recompute based on Date.now and start anchor.
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
  }, [elapsedMs, running, startAnchor]);

  function format(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    const cc = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return mm + ":" + ss + "." + cc;
  }

  function start() {
    if (!running) setRunning(true);
  }
  function pause() {
    if (running) setRunning(false);
  }
  function resetAll() {
    setRunning(false);
    setElapsedMs(0);
    setStartAnchor(null);
    setLaps([]);
    lastLapAtRef.current = 0;
  }

  // ES: Guarda una vuelta y su duración desde la última vuelta o inicio.
  // EN: Record a lap and its duration since last lap or start.
  function addLap() {
    const at = elapsedMs;
    const delta = laps.length === 0 ? at : at - lastLapAtRef.current;
    lastLapAtRef.current = at;
    setLaps((prev) => [...prev, { id: Date.now(), atMs: at, deltaMs: Math.max(0, delta) }]);
  }

  // ES: Derivados: mejor y peor vuelta. EN: Derived: best and worst lap.
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
    <>
      <section style={{ maxWidth: 640, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
        <h2>Stopwatch (Hard)</h2>

        <div style={{ fontSize: 40, fontVariantNumeric: "tabular-nums", textAlign: "center" }}>
          {format(elapsedMs)}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          {!running ? (
            <button onClick={start} aria-label="Start stopwatch">Start</button>
          ) : (
            <button onClick={pause} aria-label="Pause stopwatch">Pause</button>
          )}
          <button onClick={addLap} aria-label="Add lap" disabled={!running}>Lap</button>
          <button onClick={resetAll} aria-label="Reset stopwatch" disabled={!running && elapsedMs === 0 && laps.length === 0}>
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
                          background: stats && l.id === stats.bestId ? "#e6ffed" :
                            stats && l.id === stats.worstId ? "#ffeaea" : "transparent",
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

        {/* ES: Puntos para explicar
        - Anclaje de inicio para precisión y evitar deriva de intervalos largos.
        - Laps con deltaMs calculado respecto de la marca anterior.
        - Estadísticas memorizadas para no recalcular en cada render.
        EN: Talking points
        - Start anchor for precision and to avoid long-interval drift.
        - Laps compute deltaMs relative to the previous mark.
        - Memoized stats so we do not recompute on every render. */}
      </section>
      <ChallengeStopwatchHardUICode />
    </>
  );
}

import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import React, { useEffect, useRef, useState } from "react";

/**
 * ES: Nivel BAJO — Cronómetro básico: iniciar, pausar, resetear.
 * EN: LOW level — Basic stopwatch: start, pause, reset.
 *
 * ES: Mantengo el estado mínimo y un intervalo cada 50 ms. Limpio el intervalo al desmontar.
 * EN: Keep minimal state and an interval every 50 ms. Clean up interval on unmount.
 */
export default function ChallengeStopwatchLow() {
  // ES: Tiempo transcurrido en milisegundos. EN: Elapsed time in ms.
  const [elapsedMs, setElapsedMs] = useState(0);
  // ES: Bandera de ejecución. EN: Running flag.
  const [running, setRunning] = useState(false);
  // ES: Guardamos el id del intervalo en un ref para limpiar correctamente.
  // EN: Store interval id in a ref to clean it properly.
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // ES: Si running es true, iniciamos intervalo; si es false, limpiamos.
    // EN: If running is true, start interval; if false, clear it.
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

  // ES: Formatea mm:ss.cc (centésimas). EN: Format mm:ss.cc (centiseconds).
  function format(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const ss = String(totalSec % 60).padStart(2, "0");
    const cc = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return mm + ":" + ss + "." + cc;
  }

  function start() {
    setRunning(true);
  }
  function pause() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setElapsedMs(0);
  }

  return (
    <section style={{ maxWidth: 420, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h2>Stopwatch (Low)</h2>
      <div style={{ fontSize: 32, fontVariantNumeric: "tabular-nums", textAlign: "center" }}>
        {format(elapsedMs)}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        {!running ? (
          <button onClick={start} aria-label="Start stopwatch">Start</button>
        ) : (
          <button onClick={pause} aria-label="Pause stopwatch">Pause</button>
        )}
        <button onClick={reset} aria-label="Reset stopwatch" disabled={elapsedMs === 0}>Reset</button>
      </div>

      {/* ES: Buenas prácticas a mencionar: estado mínimo, limpieza de intervalo en useEffect.
         EN: Good practices to mention: minimal state, effect cleanup for interval. */}
    </section>
  );
}
`;

export default function ChallengeStopwatchLowUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeStopwatchLow.tsx"
      />
    </div>
  );
}
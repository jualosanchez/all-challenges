import React, { useEffect, useMemo, useState, useCallback } from "react";
import ChallengeUsersHardUICode from "./ChallengerUserHardUICode";

/**
 * ES: HARD (realista 40m) — Lista con:
 *     - fetch con loading/error/retry
 *     - búsqueda simple (sin debounce)
 *     - orden por columnas (name/email/username) con toggle asc/desc
 *     - useMemo para datos derivados (filtered, sorted)
 *     - useCallback para handlers estables
 *
 * EN: HARD (realistic 40m) — List with:
 *     - fetch with loading/error/retry
 *     - simple search (no debounce)
 *     - column sorting (name/email/username) with asc/desc toggle
 *     - useMemo for derived data (filtered, sorted)
 *     - useCallback for stable handlers
 */
export default function UsersListHard() {
  /** ------------------ STATE ------------------ **/
  // ES: Estado base: datos + red + UI.
  // EN: Base state: data + network + UI.
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ES: Filtro controlado (simple y suficiente para 40').
  // EN: Controlled filter (simple and enough for 40').
  const [search, setSearch] = useState("");

  // ES: Estado de orden: clave + dirección. Comienzo por name asc para UX predecible.
  // EN: Sort state: key + direction. Start with name asc for predictable UX.
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "name",
    dir: "asc",
  });

  /** ------------------ DATA LOAD ------------------ **/
  // ES: Carga inicial (una vez). Uso async/await por legibilidad y manejo de errores claro.
  // EN: Initial load (once). I use async/await for readability and clear error handling.
  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ES: Encapsulo el fetch en una función para poder “Retry” sin duplicar código.
  // EN: Encapsulate fetch in a function so I can “Retry” without duplicating code.
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Network error");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (e: any) {
      setErr(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  /** ------------------ DERIVED DATA ------------------ **/
  // ES: 1) Filtrado derivado
  //    - No lo guardo en estado para evitar doble fuente de verdad (siempre deriva de users + search).
  //    - Filtro por name/email/username en minúsculas para comparación case-insensitive.
  // EN: 1) Derived filtering
  //    - I don’t store it in state to avoid double source of truth (it derives from users + search).
  //    - Filter by name/email/username using lowercase for case-insensitive comparison.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term)
    );
  }, [users, search]);

  // ES: 2) Orden derivado
  //    - Copio el array antes de sort para NO mutar el original (inmutabilidad).
  //    - Comparo de forma case-insensitive (paso a minúsculas).
  //    - Complejidad típica O(n log n), adecuada para esta lista pequeña.
  //
  // EN: 2) Derived sorting
  //    - Copy before sorting to avoid mutating the original (immutability).
  //    - Case-insensitive comparison (lowercase both sides).
  //    - Typical complexity O(n log n), fine for this small list.
  const sorted = useMemo(() => {
    const copy = [...filtered];

    copy.sort((a, b) => {
      /**
       * ⚠️ LÍNEAS CLAVE / KEY LINES
       *
       * ES:
       * - Queremos comparar la propiedad seleccionada dinámicamente por "sort.key"
       *   (puede ser "name", "email" o "username").
       * - "a[sort.key]" y "b[sort.key]" podrían ser "string | undefined" (por eso usamos "?? """).
       *   * "?? """ = si el valor es "null" o "undefined", usamos cadena vacía para no romper la comparación.
       * - "String(...)" asegura que comparamos **siempre strings**. Si por error viniera un número, lo stringify.
       * - ".toLowerCase()" normaliza a minúsculas para comparación case-insensitive.
       *   Esto evita que "Zed" < "anna" por orden ASCII; queremos orden alfabético humano.
       *
       * EN:
       * - We want to compare the property selected dynamically via "sort.key"
       *   (could be "name", "email" or "username").
       * - "a[sort.key]" and "b[sort.key]" might be "string | undefined", hence "?? """.
       *   * "?? """ = if the value is "null"/"undefined", fallback to empty string to keep comparison safe.
       * - "String(...)" guarantees we always compare **strings**. If accidentally a number appears, stringify it.
       * - ".toLowerCase()" normalizes to lowercase for case-insensitive comparison,
       *   avoiding ASCII surprises like "Zed" < "anna"; we want human-friendly alpha order.
       */
      const va = String(a[sort.key] ?? "").toLowerCase();
      const vb = String(b[sort.key] ?? "").toLowerCase();

      /**
       * ES: Devolvemos -1 / 1 / 0 según corresponda, ajustando por dirección asc/desc.
       * EN: Return -1 / 1 / 0 accordingly, adjusting by asc/desc direction.
       */
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });

    return copy;
  }, [filtered, sort]);

  /**
   * 💡 Alternativas que podrías mencionar / Alternatives you can mention:
   * ES:
   * - "localeCompare": mejor para i18n/acentos (ej: español con tildes).
   *   "va.localeCompare(vb, 'es', { sensitivity: 'base' })"
   * - Comparación numérica: si alguna columna fuera número, parsear y comparar como número.
   * EN:
   * - "localeCompare": better for i18n/accents (e.g., Spanish diacritics).
   *   "va.localeCompare(vb, 'es', { sensitivity: 'base' })"
   * - Numeric compare: if a column was numeric, parse and compare as a number.
   */

  /** ------------------ HANDLERS ------------------ **/
  // ES: "useCallback" estabiliza la referencia (evita recreaciones inútiles si memorizamos hijos).
  // EN: "useCallback" stabilizes the reference (prevents useless recreations if we memo children).
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  // ES: Mismo header -> invierto dirección; header distinto -> arranco asc.
  // EN: Same header -> flip direction; different header -> start asc.
  const toggleSort = useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }, []);

  /** ------------------ RENDER ------------------ **/
  return (
    <>
      <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
        <h2>Users (Hard – realistic)</h2>

        {/* ES: Barra de controles: búsqueda + clear.
          EN: Controls bar: search + clear. */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="Search by name, email or username..."
            value={search}
            onChange={onSearchChange}
            style={{ flex: 1 }} />
          <button onClick={() => setSearch("")} disabled={!search}>
            Clear
          </button>
        </div>

        {/* ES: Estados de red con feedback claro.
          EN: Clear network feedback. */}
        {loading && <p>Loading...</p>}
        {err && (
          <div>
            <p style={{ color: "crimson" }}>Error: {err}</p>
            <button onClick={fetchUsers}>Retry</button>
          </div>
        )}

        {!loading && !err && (
          <>
            {/* ES: Indicador de resultados para validar filtros/sort.
                  EN: Results indicator to validate filters/sort. */}
            <p style={{ opacity: 0.7, marginTop: 0 }}>
              Results: <b>{sorted.length}</b>
            </p>

            <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {/* ES: Cabeceras clickeables con aria-sort para accesibilidad.
                  EN: Clickable headers with aria-sort for accessibility. */}
                  <Th label="name" sort={sort} onToggle={toggleSort} />
                  <Th label="email" sort={sort} onToggle={toggleSort} />
                  <Th label="username" sort={sort} onToggle={toggleSort} />
                  <th>city</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((u) => (
                  <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.username}</td>
                    {/* ES: Optional chaining evita romper si falta address/city.
                          EN: Optional chaining prevents breakage if address/city is missing. */}
                    <td>{u.address?.city ?? "-"}</td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: 16 }}>
                      No results
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/**
       * ES — Talking points (para decir en voz alta):
       * - Datos derivados fuera del estado (filtered/sorted) → una sola fuente de verdad.
       * - Copio antes de ordenar (inmutabilidad) y comparo en minúsculas (case-insensitive).
       * - useMemo: evita recalcular cuando ni los datos ni los criterios cambian.
       * - useCallback: evita recrear handlers, útil si memorizo hijos o paso callbacks profundo.
       * - Alternativas: localeCompare para i18n; comparación numérica si la columna es número.
       *
       * EN — Talking points:
       * - Keep derived data (filtered/sorted) out of state → single source of truth.
       * - Copy before sort (immutability) and compare lowercase (case-insensitive).
       * - useMemo: skip recomputation when neither data nor criteria change.
       * - useCallback: avoid handler recreation, useful with memoized children or deep props.
       * - Alternatives: localeCompare for i18n; numeric compare for numeric columns.
       */}
      </div>
      <ChallengeUsersHardUICode />
    </>
  );
}

/** ------------------ Subcomponent: Table Header ------------------ **/
function Th({
  label,
  sort,
  onToggle,
}: {
  label: SortKey;
  sort: { key: SortKey; dir: "asc" | "desc" };
  onToggle: (key: SortKey) => void;
}) {
  const active = sort.key === label;
  // ES: aria-sort comunica el estado a lectores de pantalla (accesibilidad).
  // EN: aria-sort announces sorting state to screen readers (accessibility).
  const ariaSort = active ? (sort.dir === "asc" ? "ascending" : "descending") : "none";
  return (
    <th
      role="columnheader"
      aria-sort={ariaSort}
      onClick={() => onToggle(label)}
      style={{ cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" }}
      title={`Sort by ${label}`}
    >
      {label} {active ? (sort.dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

/** ------------------ Types ------------------ **/
type SortKey = "name" | "email" | "username";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address?: { city?: string };
}

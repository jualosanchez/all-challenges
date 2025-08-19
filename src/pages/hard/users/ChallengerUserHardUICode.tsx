import CodeViewer from '../../../components/CodeViewer';

const codeString = `
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
  //    - \`useMemo\` evita recalcular en cada render. Solo se ejecuta si \`users\` o \`search\` cambian.
  //    - No se guarda en estado para evitar duplicar la fuente de verdad.
  //    - Filtro por name/email/username en minúsculas para comparación case-insensitive.
  // EN: 1) Derived filtering
  //    - \`useMemo\` avoids recalculating on every render. It only runs if \`users\` or \`search\` change.
  //    - Not stored in state to avoid duplicating the source of truth.
  //    - Filter by name/email/username using lowercase for a case-insensitive comparison.
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
  //    - \`useMemo\` se ejecuta solo si la lista filtrada o el criterio de orden cambian.
  //    - Copio el array (\`[...filtered]\`) antes de \`sort()\` para NO mutar el original (principio de inmutabilidad).
  //    - Comparo de forma case-insensitive (paso a minúsculas).
  //    - Complejidad típica O(n log n), adecuada para esta lista pequeña.
  //
  // EN: 2) Derived sorting
  //    - \`useMemo\` runs only if the filtered list or the sort criteria change.
  //    - Copy the array (\`[...filtered]\`) before \`sort()\` to AVOID mutating the original (immutability principle).
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
  // ES: \`useCallback\` con \`[]\` estabiliza la referencia de la función. \`setSearch\` es estable por defecto.
  //     Esto es una optimización útil si este handler se pasara a un componente hijo memorizado.
  // EN: \`useCallback\` with \`[]\` stabilizes the function reference. \`setSearch\` is stable by default.
  //     This is a useful optimization if this handler were passed to a memoized child component.
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  // ES: Lógica de orden: si es la misma columna, invierte la dirección. Si es una nueva, la pone ascendente.
  // EN: Sorting logic: if it's the same column, flip the direction. If it's a new one, set it to ascending.
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
      <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }} role="main">
        <h2>Users (Hard – realistic)</h2>

        {/* ES: Barra de controles: búsqueda + clear.
          EN: Controls bar: search + clear. */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="Search by name, email or username..."
            value={search}
            aria-label="Search users"
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
            {/* ES: Indicador de resultados para dar feedback inmediato al usuario.
                  EN: Results indicator to validate filters/sort. */}
            <p style={{ opacity: 0.7, marginTop: 0 }}>
              Results: <b>{sorted.length}</b>
            </p>

            <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {/* ES: Subcomponente para las cabeceras, promoviendo la reutilización y limpieza.
                      Pasa el estado de orden y el handler para el toggle.
                      EN: Subcomponent for headers, promoting reuse and cleanliness.
                      Passes the sort state and the toggle handler. */}
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
                    {/* ES: Optional chaining (\`?\`) y Nullish Coalescing (\`??\`) para manejar datos opcionales de forma segura.
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

/** ES: Subcomponente para la cabecera de la tabla. Aislado y reutilizable.
 *  EN: Subcomponent for the table header. Isolated and reusable. **/
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
  // ES: \`aria-sort\` es crucial para la accesibilidad. Informa a los lectores de pantalla cómo está ordenada la columna.
  // EN: \`aria-sort\` is crucial for accessibility. It informs screen readers how the column is sorted.
  const ariaSort = active ? (sort.dir === "asc" ? "ascending" : "descending") : "none";
  return (
    <th
      role="columnheader"
      aria-sort={ariaSort}
      onClick={() => onToggle(label)}
      style={{ cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" }}
      title={\`Sort by \${label}\`}
    >
      {label} {active ? (sort.dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

/** ES: Tipos para seguridad y autocompletado. \`SortKey\` previene errores de tipeo en las claves de orden.
 *  EN: Types for safety and autocomplete. \`SortKey\` prevents typos in sort keys. **/
type SortKey = "name" | "email" | "username";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address?: { city?: string };
}
`;

export default function ChallengerUserHardUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeUsersLow.tsx"
      />
    </div>
  );
}
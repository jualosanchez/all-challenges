import CodeViewer from '../../CodeViewer';

const codeString = `
import React, { useState, useEffect } from "react";

/**
 * ES: Nivel BAJO — Lista de usuarios con búsqueda (fetch + filtro en memoria).
 * EN: LOW level — Users list with search (fetch + in-memory filter).
 *
 * Objetivo pedagógico / Learning goal
 * ES: Mostrar el esqueleto mínimo de un componente con estado, efecto de carga inicial
 *     y renderizado de lista filtrada. Priorizamos claridad sobre optimización.
 * EN: Show the minimal skeleton of a component with state, initial-load effect,
 *     and filtered list rendering. We prioritize clarity over optimization.
 */
export default function ChallengeUsersLow() {
  /**
   * ES: Estado del componente
   * - \`users\`: fuente de verdad de la data (llega del fetch). Arreglo tipado de User.
   * - \`search\`: término que el usuario escribe para filtrar.
   *
   * ¿Por qué useState?
   * - ES: Porque ambos valores cambian en el tiempo y deben gatillar re-render.
   * - EN: Both values change over time and must trigger re-renders.
   *
   * ¿Por qué tipar \`User[]\`?
   * - ES: Para que TypeScript avise si usamos mal propiedades (ej. user.name).
   * - EN: TypeScript will warn if we misuse properties (e.g., user.name).
   */
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  /**
   * ES: Efecto para cargar datos al montar (once).
   * - \`[]\` como dependencia significa: “solo al montar”, evitando múltiples fetch.
   * - Usamos fetch nativo por simplicidad; en producción podríamos abstraerlo
   *   (servicio/API layer) para testear mejor y reutilizar.
   *
   * EN: Effect to load data on mount (once).
   * - \`[]\` dependency means “only on mount”, avoiding multiple fetches.
   * - We use native fetch for simplicity; in production we might abstract it
   *   (service/API layer) for better testing and reuse.
   *
   * Nota / Note:
   * ES: No incluimos AbortController para mantenerlo básico; mencionarías en voz alta
   *     que en listas largas o navegación rápida, abortarías la petición para evitar
   *     fugas y estados “fuera de tiempo”.
   * EN: We skip AbortController to keep it basic; you can mention aloud that for large
   *     lists or quick navigation, you’d abort the request to avoid leaks and stale state.
   */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())                  // ES: Transformar Response -> JSON (promesa)
                                                  // EN: Transform Response -> JSON (promise)
      .then((data: User[]) => setUsers(data))     // ES: Guardar data en estado => re-render
                                                  // EN: Save data into state => re-render
      .catch((err) => {
        // ES: Log simple; en apps reales mostraríamos un mensaje de error en UI.
        // EN: Simple log; in real apps we’d show an error message in the UI.
        console.error("Error fetching users:", err);
      });
  }, []); // ES/EN: run only once (on mount)

  /**
   * ES: Filtro derivado (no lo guardamos en estado porque depende de \`users\` y \`search\`).
   * - Mantenerlo derivado evita inconsistencias y duplicación de fuente de verdad.
   * - Convertimos a minúsculas para un “case-insensitive match”.
   *
   * EN: Derived filter (we don’t store it in state because it depends on \`users\` and \`search\`).
   * - Keeping it derived avoids inconsistencies and duplicate sources of truth.
   * - Lowercasing both sides gives us “case-insensitive match”.
   */
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>User List</h1>

      {/**
       * ES: Input controlado
       * - \`value={search}\` + \`onChange\` => React controla el valor (fácil de validar y testear).
       * - Patrón estándar para formularios en React.
       *
       * EN: Controlled input
       * - \`value={search}\` + \`onChange\` => React controls the value (easy to validate and test).
       * - Standard pattern for forms in React.
       */}
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // ES: Actualiza estado => re-render con filtro aplicado.
                                                    // EN: Update state => re-render with filter applied.
      />

      {/**
       * ES: Lista declarativa
       * - Usamos \`.map\` y una key estable (\`u.id\`) para ayudar a React a reconciliar.
       * - Si no hay resultados mostramos un “empty state” para UX clara.
       *
       * EN: Declarative list
       * - We use \`.map\` with a stable key (\`u.id\`) to help React reconcile updates.
       * - If no results, we show an “empty state” for clear UX.
       */}
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => <li key={u.id}>{u.name}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>

      {/**
       * Mejores prácticas (para mencionar en voz alta) / Best practices (say aloud)
       * ES:
       * - Mantener “dato derivado” (filteredUsers) fuera del estado evita duplicidad.
       * - Efecto de carga con [] evita múltiples fetch.
       * - Input controlado simplifica validaciones y tests.
       * - Tipado de \`User\` previene errores de propiedades.
       *
       * EN:
       * - Keep “derived data” (filteredUsers) out of state to avoid duplication.
       * - Load effect with [] avoids multiple fetches.
       * - Controlled input simplifies validations and tests.
       * - \`User\` typing prevents property mistakes.
       */}
    </div>
  );
}

/**
 * ES: Tipado mínimo (ayuda a detectar errores de acceso como user.fullname en lugar de user.name).
 * EN: Minimal typing (helps catch property access mistakes like user.fullname instead of user.name).
 */
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address?: { city?: string };
}
`;

export default function ChallengerUserLowUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeUsersLow.tsx"
      />
    </div>
  );
}
import { useState, useEffect } from "react";
import ChallengeUsersMidUICode from "./ChallengerUserMidUICode";

/**
 * ES: Nivel MEDIO – Mejor manejo de estado: loading, error y retry.
 * EN: MID level – Better state management: loading, error and retry.
 */
export default function UsersListMid() {
  // ES: Estados separados para cada caso (datos, carga, error).
  // EN: Separate states for each case (data, loading, error).
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ES: Efecto con async/await para mayor legibilidad.
  // EN: Effect with async/await for better readability.
  useEffect(() => {
    fetchUsers();
  }, []);

  // ES: Encapsular la lógica en una función → reusable (retry).
  // EN: Encapsulate logic in a function → reusable (retry).
  async function fetchUsers() {
    try {
      setLoading(true); // ES: Indicar carga; EN: Indicate loading
      setError(null);   // ES/EN: Reset previous error
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) throw new Error("Network response was not ok");

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      // ES: Capturar y mostrar error legible.
      // EN: Catch and display readable error.
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false); // ES/EN: Always stop loading
    }
  }

  // ES: Filtrado igual que antes, mantenemos simple.
  // EN: Filtering same as before, keep it simple.
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) 
    || user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
        <h1>User List (Mid Level)</h1>

        {/* Input controlado */}
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

        {/* ES: Render condicional → feedback claro al usuario.
          EN: Conditional render → clear user feedback. */}
        {loading && <p>Loading users...</p>}
        {error && (
          <div>
            <p style={{ color: "red" }}>Error: {error}</p>
            {/* ES: Retry útil en caso de error.
                  EN: Retry useful in case of failure. */}
            <button onClick={fetchUsers}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <ul>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <li key={u.id}>
                  <strong>{u.name}</strong> ({u.email})
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        )}
      </div>
      <ChallengeUsersMidUICode />
    </>
  );
}

/** Tipado mínimo para TS */
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address?: { city?: string };
}

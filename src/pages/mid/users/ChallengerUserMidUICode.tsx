import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import { useState, useEffect } from "react";
import ChallengeUsersMidUICode from "./ChallengerUserMidUICode";

/**
 * ES: Nivel MEDIO – Mejor manejo de estado: loading, error y retry.
 * EN: MID level – Better state management: loading, error and retry.
 */
export default function UsersListMid() {
  // ES: Estado para almacenar la lista de usuarios. Es la fuente de verdad de los datos.
  // EN: State to store the user list. It's the single source of truth for the data.
  const [users, setUsers] = useState<User[]>([]);
  // ES: Estado para el término de búsqueda del input.
  // EN: State for the search term from the input.
  const [search, setSearch] = useState("");
  // ES: Estado para manejar la UI de carga. Crucial para la UX.
  // EN: State to handle the loading UI. Crucial for UX.
  const [loading, setLoading] = useState(false);
  // ES: Estado para capturar y mostrar errores de la petición.
  // EN: State to capture and display errors from the request.
  const [error, setError] = useState<string | null>(null);

  // ES: Se ejecuta solo una vez al montar el componente (\`[]\`). Llama a la función que carga los datos.
  // EN: Runs only once when the component mounts (\`[]\`). It calls the function that loads the data.
  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ES: Encapsular la lógica en una función → reusable (retry).
  // EN: Encapsulate logic in a function → reusable (retry).
  async function fetchUsers() {
    try {
      setLoading(true); // ES: Indicar carga; EN: Indicate loading
      setError(null);   // ES: Limpiar errores previos antes de un nuevo intento. EN: Clear previous errors before a new attempt.
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      // ES: Es buena práctica verificar si la respuesta de la red fue exitosa.
      // EN: It's good practice to check if the network response was successful.
      if (!res.ok) throw new Error("Network response was not ok");

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      // ES: Capturar cualquier error (de red o de parsing) y guardarlo en el estado.
      // EN: Catch any error (network or parsing) and save it to the state.
      setError(err.message || "Unknown error");
    } finally {
      // ES: Se ejecuta siempre, con éxito o error. Asegura que el 'loading' se detenga.
      // EN: Always runs, on success or failure. Ensures the 'loading' state is stopped.
      setLoading(false);
    }
  }

  // ES: "Estado derivado": se calcula en cada render. No necesita \`useState\`.
  //     La búsqueda ahora es más potente: busca por nombre y email.
  // EN: "Derived state": calculated on each render. It doesn't need \`useState\`.
  //     The search is now more powerful: it searches by name and email.
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) 
    || user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
        <h1>User List (Mid Level)</h1>

        {/* ES: Input controlado: su valor está ligado al estado \`search\`.
            EN: Controlled input: its value is tied to the \`search\` state. */}
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
            {/* ES: El botón de reintento reutiliza la función \`fetchUsers\`.
                  EN: The retry button reuses the \`fetchUsers\` function. */}
            <button onClick={fetchUsers}>Retry</button>
          </div>
        )}

        {/* ES: La lista solo se renderiza si no hay carga ni errores.
            EN: The list only renders if there's no loading and no errors. */}
        {!loading && !error && (
          <ul>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                // ES: \`key\` es crucial para que React optimice el renderizado de listas.
                // EN: \`key\` is crucial for React to optimize list rendering.
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

/** ES: Tipado mínimo para autocompletado y seguridad de tipos.
 *  EN: Minimal typing for autocomplete and type safety. */
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address?: { city?: string };
}
`;

export default function ChallengerUserMidUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeUsersMid.tsx"
      />
    </div>
  );
}
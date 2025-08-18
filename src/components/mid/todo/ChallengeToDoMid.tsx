import { useEffect, useState } from "react";
import ChallengeToDoMidUICode from "./ChallengeToDoMidUICode";

/**
 * ES: Nivel MEDIO — +loading/error/retry, edición inline.
 * EN: MID level — +loading/error/retry, inline editing.
 */
export default function ChallengeToDoMid() {
  // ES: Definición del tipo para una tarea. Ayuda a la seguridad de tipos y autocompletado.
  // EN: Type definition for a todo item. It helps with type safety and autocompletion.
  type Todo = { id: number; title: string; completed: boolean };

  // ES: Estado principal que contiene el array de tareas. Es la "fuente de la verdad".
  // EN: Main state that holds the array of todos. It's the "single source of truth".
  const [todos, setTodos] = useState<Todo[]>([]);
  // ES: Estado para el input de texto. Almacenar su valor en el estado lo convierte en un "componente controlado".
  // EN: State for the text input. Storing its value in the state makes it a "controlled component".
  const [text, setText] = useState("");
  // ES: Estados para manejar el ciclo de vida de la petición de red. Crucial para la UX.
  // EN: States to manage the network request lifecycle. Crucial for UX.
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // ES: Estados para la edición inline. 'editingId' rastrea QUÉ ítem se edita, y 'editingText' su valor temporal.
  // EN: States for inline editing. 'editingId' tracks WHICH item is being edited, and 'editingText' its temporary value.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  /**
   * ES: Efecto para cargar datos iniciales cuando el componente se monta.
   *     El array de dependencias vacío ('[]') asegura que se ejecute solo una vez.
   * EN: Effect to load initial data when the component mounts.
   *     The empty dependency array ('[]') ensures it runs only once.
   */
  useEffect(() => {
    // ---------- A) JSONPlaceholder ----------
    setLoading(true);
    setErr(null);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((data: Array<{ id: number; title: string; completed: boolean }>) => {
        setTodos(data);
      })
      .catch((e) => setErr(e.message || "Unknown fetch error"))
      .finally(() => setLoading(false));

    // ---------- B) DummyJSON ----------
    // setLoading(true);
    // setErr(null);
    // fetch("https://dummyjson.com/todos?limit=10")
    //   .then((r) => {
    //     if (!r.ok) throw new Error("Network error");
    //     return r.json();
    //   })
    //   .then((data: { todos: Array<{ id: number; todo: string; completed: boolean }> }) => {
    //     setTodos(data.todos.map((t) => ({ id: t.id, title: t.todo, completed: t.completed })));
    //   })
    //   .catch((e) => setErr(e.message))
    //   .finally(() => setLoading(false));
  }, []);

  // ES: Añade una nueva tarea a la lista.
  // EN: Adds a new item to the list.
  const addTodo = () => {
    // ES: 'trim()' elimina espacios en blanco. Si no hay texto, no hacemos nada.
    // EN: 'trim()' removes whitespace. If there's no text, we do nothing.
    const title = text.trim();
    if (!title) return;
    // ES: Actualización inmutable: creamos un nuevo array y añadimos el nuevo ítem.
    // EN: Immutable update: we create a new array and add the new item.
    setTodos((p) => [...p, { id: Date.now(), title, completed: false }]);
    setText("");
  };

  // ES: Cambia el estado 'completed' de una tarea.
  // EN: Toggles the 'completed' state of a task.
  const toggle = (id: number) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  // ES: Elimina una tarea de la lista.
  // EN: Removes a task from the list.
  const removeOne = (id: number) => setTodos((p) => p.filter((t) => t.id !== id));

  // ES: Inicia el modo de edición para una tarea específica.
  // EN: Enters edit mode for a specific task.
  const startEdit = (t: Todo) => {
    setEditingId(t.id);
    setEditingText(t.title);
  };

  // ES: Confirma y guarda los cambios de la edición.
  // EN: Commits and saves the changes from editing.
  const commitEdit = () => {
    const title = editingText.trim();
    // ES: Si el título está vacío o no hay un ID de edición, cancelamos.
    // EN: If the title is empty or there's no editing ID, we cancel.
    if (!title || editingId == null) return cancelEdit();
    // ES: Actualización inmutable: encontramos el ítem y actualizamos su título.
    // EN: Immutable update: we find the item and update its title.
    setTodos((p) => p.map((t) => (t.id === editingId ? { ...t, title } : t)));
    cancelEdit();
  };

  // ES: Sale del modo de edición y resetea los estados relacionados.
  // EN: Exits edit mode and resets the related states.
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // ES: Lógica de reintento simple para la demo. En una app real, se llamaría a la función de fetch.
  // EN: Simple retry logic for the demo. In a real app, the fetch function would be called.
  const retry = () => {
    window.location.reload();
  };

  return (
    <>
      <section style={{ maxWidth: 560, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
        <h2>ToDo (Mid)</h2>

        {/* ES: Formulario para agregar nuevas tareas.
            EN: Form to add new tasks. */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Add a task…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            style={{ flex: 1 }} />
          <button onClick={addTodo} disabled={!text.trim()}>
            Add
          </button>
        </div>

        {/* ES: Renderizado condicional para los estados de carga y error.
            EN: Conditional rendering for loading and error states. */}
        {loading && <p>Loading…</p>}
        {err && (
          <p style={{ color: "crimson" }}>
            Error: {err} <button onClick={retry}>Retry</button>
          </p>
        )}

        {/* ES: La lista solo se muestra si no hay carga ni errores.
            EN: The list is only shown if there is no loading and no errors. */}
        {!loading && !err && (
          <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
            {todos.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto",
                  alignItems: "center",
                  gap: 8,
                  borderTop: "1px solid #eee",
                  padding: "6px 0",
                }}
              >
                {/* ES: El checkbox siempre es visible.
                    EN: The checkbox is always visible. */}
                <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />

                {/* ES: Renderizado condicional: o mostramos el input de edición o el texto normal.
                    EN: Conditional rendering: we either show the edit input or the normal text. */}
                {editingId === t.id ? (
                  <>
                    <input
                      // ES: 'autoFocus' mejora la UX al poner el foco directamente en el input.
                      // EN: 'autoFocus' improves UX by focusing the input directly.
                      autoFocus
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && commitEdit()} />
                    {/* ES: Botones específicos para el modo de edición.
                        EN: Specific buttons for the edit mode. */}
                    <button onClick={commitEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {/* ES: El texto de la tarea, con estilo tachado si está completada.
                        EN: The task text, with a line-through style if completed. */}
                    <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                      {t.title}
                    </span>
                    <button onClick={() => startEdit(t)}>Edit</button>
                  </>
                )}
                {/* ES: El botón de borrar siempre está presente.
                    EN: The delete button is always present. */}
                <button onClick={() => removeOne(t.id)}>✕</button>
              </li>
            ))}
            {todos.length === 0 && <li>No items</li>}
          </ul>
        )}
      </section>
      <ChallengeToDoMidUICode />
    </>
  );
}

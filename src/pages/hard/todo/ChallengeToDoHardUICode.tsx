import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import React, { useEffect, useMemo, useState } from 'react';
import ChallengeToDoHardUICode from './ChallengeToDoHardUICode';

/**
 * ES: HARD (realista 40') — ToDo con:
 *     - filtros de vista (All/Active/Completed)
 *     - contador de pendientes
 *     - edición inline (agregado respecto al MID)
 *     - estructura lista para habilitar fetch si lo piden (loading/error)
 *
 * EN: HARD (realistic 40') — ToDo with:
 *     - view filters (All/Active/Completed)
 *     - active count
 *     - inline editing (added vs MID)
 *     - structure ready to enable fetch on request (loading/error)
 */
export default function ChallengeToDoHard() {
  // ES: Definición de tipos para autocompletado y seguridad. 'View' es un "string literal type".
  // EN: Type definitions for autocomplete and safety. 'View' is a string literal type.
  type Todo = { id: number; title: string; completed: boolean };
  type View = 'all' | 'active' | 'completed';

  // ES: Estado para la lista de tareas. Es la única "fuente de la verdad" para los datos.
  // EN: State for the todo list. It's the single source of truth for the data.
  const [todos, setTodos] = useState<Todo[]>([]);

  // ES: Estado para el input de texto, un "componente controlado".
  // EN: State for the text input, a "controlled component".
  const [text, setText] = useState('');

  // ES: Estado para controlar qué filtro de vista está activo (Todos, Activos, Completados).
  // EN: State to control which view filter is active (All, Active, Completed).
  const [view, setView] = useState<View>('all');

  // ES: Estados para el ciclo de vida de la petición de red.
  // EN: States for the network request lifecycle.
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ES: Estados para la edición inline. 'editingId' rastrea QUÉ ítem se edita, y 'editingText' su valor temporal.
  // EN: States for inline editing. 'editingId' tracks WHICH item is being edited, and 'editingText' its temporary value.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

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
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((r) => {
        // ES: Es buena práctica verificar si la respuesta de la red fue exitosa.
        // EN: It's good practice to check if the network response was successful.
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then(
        (data: Array<{ id: number; title: string; completed: boolean }>) => {
          setTodos(data);
        }
      )
      .catch((e) => setErr(e.message || 'Unknown fetch error'))
      .finally(() => setLoading(false));

    // ---------- B) DummyJSON (alternativa) ----------
    // setLoading(true); setErr(null);
    // fetch("https://dummyjson.com/todos?limit=10")
    //   .then((r) => { if (!r.ok) throw new Error("Network error"); return r.json(); })
    //   .then((data: { todos: Array<{ id: number; todo: string; completed: boolean }> }) => {
    //     setTodos(data.todos.map((t) => ({ id: t.id, title: t.todo, completed: t.completed })));
    //   })
    //   .catch((e) => setErr(e.message))
    //   .finally(() => setLoading(false));
  }, []);

  // ES: Añade una nueva tarea. La lógica es idéntica a los niveles anteriores.
  // EN: Adds a new task. The logic is identical to previous levels.
  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    // ES: Actualización inmutable para no modificar el estado directamente.
    // EN: Immutable update to avoid mutating state directly.
    setTodos((p) => [...p, { id: Date.now(), title, completed: false }]);
    setText('');
  };

  // ES: Cambia el estado 'completed' de una tarea.
  // EN: Toggles the 'completed' state of a task.
  const toggle = (id: number) =>
    setTodos((p) =>
      p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // ES: Elimina una tarea de la lista.
  // EN: Removes a task from the list.
  const removeOne = (id: number) =>
    setTodos((p) => p.filter((t) => t.id !== id));

  // ---------- Edición (como en MEDIO) / Editing (as in MID) ----------
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
    if (!title || editingId == null) return cancelEdit();
    setTodos((p) => p.map((t) => (t.id === editingId ? { ...t, title } : t)));
    cancelEdit();
  };

  // ES: Sale del modo de edición y resetea los estados relacionados.
  // EN: Exits edit mode and resets the related states.
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // ES: Mejora la UX y accesibilidad permitiendo usar el teclado para confirmar o cancelar la edición.
  // EN: Improves UX and accessibility by allowing the keyboard to be used to confirm or cancel an edit.
  const onEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  // ES: Calculamos la lista de tareas visibles según el filtro seleccionado ('view').
  //     'useMemo' es clave aquí: evita filtrar el array en cada render, solo lo hace
  //     cuando 'todos' o 'view' cambian. Esto mantiene el rendimiento en listas grandes.
  //     Importante: esto no crea un nuevo estado, es un valor derivado.
  // EN: We calculate the list of visible todos based on the selected filter ('view').
  //     'useMemo' is key here: it avoids re-filtering the array on every render, only doing so
  //     when 'todos' or 'view' change. This maintains performance on large lists.
  //     Important: this does not create new state, it's a derived value.
  const visible = useMemo(() => {
    switch (view) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, view]);

  return (
    <>
      <section
        style={{
          maxWidth: 620,
          margin: '1.5rem auto',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>ToDo (Hard)</h2>

        {/* ES: La UI se divide en dos partes: la barra de entrada y los botones de filtro.
            EN: The UI is split into two parts: the input bar and the filter buttons. */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              placeholder="Add a task…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              style={{ flex: 1 }}
            />
            <button onClick={addTodo} disabled={!text.trim()}>
              Add
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {/* ES: 'aria-pressed' es un atributo de accesibilidad que indica a los lectores de pantalla si un botón de tipo 'toggle' está activado.
                EN: 'aria-pressed' is an accessibility attribute that tells screen readers if a toggle button is currently activated. */}
            <button
              onClick={() => setView('all')}
              aria-pressed={view === 'all'}
              title="Show all"
            >
              All
            </button>
            <button
              onClick={() => setView('active')}
              aria-pressed={view === 'active'}
              title="Show active"
            >
              Active
            </button>
            <button
              onClick={() => setView('completed')}
              aria-pressed={view === 'completed'}
              title="Show completed"
            >
              Completed
            </button>
          </div>
        </div>

        {/* ES: Renderizado condicional para los estados de carga y error.
            EN: Conditional rendering for loading and error states. */}
        {loading && <p>Loading…</p>}
        {err && <p style={{ color: 'crimson' }}>Error: {err}</p>}

        {/* ES: La lista y el contador solo se muestran si no hay carga ni errores.
            EN: The list and counter are only shown if there is no loading and no errors. */}
        {!loading && !err && (
          <>
            <p style={{ opacity: 0.75, marginTop: 8 }}>
              {view.charAt(0).toUpperCase() + view.slice(1)} tasks:{' '}
              <b>{visible.length}</b>
            </p>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
              {/* ES: Mapeamos sobre la lista 'visible' (ya filtrada), no sobre la lista completa 'todos'.
                  EN: We map over the 'visible' list (already filtered), not the complete 'todos' list. */}
              {visible.map((t) => {
                const isEditing = editingId === t.id;
                return (
                  <li
                    key={t.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto auto',
                      alignItems: 'center',
                      gap: 8,
                      borderTop: '1px solid #eee',
                      padding: '6px 0',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggle(t.id)}
                      aria-label={\`Toggle \${t.title}\`}
                    />

                    {/* ES: Renderizado condicional para el modo de edición.
                        EN: Conditional rendering for the editing mode. */}
                    {isEditing ? (
                      <>
                        <input
                          // ES: 'autoFocus' mejora la UX al poner el foco directamente en el input.
                          // EN: 'autoFocus' improves UX by focusing the input directly.
                          autoFocus
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={onEditKeyDown}
                          aria-label={\`Edit \${t.title}\`}
                        />
                        <button onClick={commitEdit} title="Save changes">
                          Save
                        </button>
                        <button onClick={cancelEdit} title="Cancel editing">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            textDecoration: t.completed
                              ? 'line-through'
                              : 'none',
                          }}
                        >
                          {t.title}
                        </span>
                        <button onClick={() => startEdit(t)} title="Edit task">
                          Edit
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => removeOne(t.id)}
                      aria-label={\`Delete \${t.title}\`}
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
              {visible.length === 0 && <li>No items</li>}
            </ul>
          </>
        )}

        {/**
         * ES (Puntos clave para explicar):
         * - El estado 'todos' es la única fuente de verdad. 'visible' y 'activeCount' son datos derivados y optimizados con 'useMemo'.
         * - La edición es "inline": se usan estados locales ('editingId' y 'editingText') y al confirmar se actualiza el estado principal de forma inmutable.
         * - Los filtros de vista (All/Active/Completed) no mutan la lista original, solo crean una proyección para el renderizado, lo cual es una buena práctica.
         * - Se manejan los estados de carga y error para dar feedback claro al usuario.
         *
         * EN (to explain):
         * - The 'todos' state is the single source of truth. 'visible' and 'activeCount' are derived data, optimized with 'useMemo'.
         * - Editing is "inline": local states ('editingId' and 'editingText') are used, and on commit, the main state is updated immutably.
         * - View filters (All/Active/Completed) do not mutate the original list; they only create a projection for rendering, which is a best practice.
         * - Loading and error states are handled to provide clear feedback to the user.
         */}
      </section>
      <ChallengeToDoHardUICode />
    </>
  );
}
`;

export default function ChallengeToDoHardUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeToDoHard.tsx"
      />
    </div>
  );
}

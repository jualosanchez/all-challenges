import CodeViewer from '../../../components/CodeViewer';

const codeLine = `
npm install @reduxjs/toolkit react-redux
`;

const codeSlice = `
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ES: Define la interfaz para un solo objeto 'todo'.
// EN: Defines the interface for a single 'todo' object.
interface Todo {
  id: number;
  texto: string;
  completado: boolean;
}

// ES: El estado inicial es un array vacío de todos.
// EN: The initial state is an empty array of todos.
const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ES: Reducer para añadir un nuevo todo. Recibe el texto como payload.
    // EN: Reducer to add a new todo. Receives the text as a payload.
    agregarTodo(state, action: PayloadAction<string>) {
      state.push({ id: Date.now(), texto: action.payload, completado: false });
    },
    // ES: Reducer para cambiar el estado 'completado' de un todo. Recibe el id.
    // EN: Reducer to toggle the 'completed' state of a todo. Receives the id.
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completado = !todo.completado;
    },
    // ES: Reducer para eliminar un todo. Recibe el id.
    // EN: Reducer to delete a todo. Receives the id.
    eliminarTodo(state, action: PayloadAction<number>) {
      return state.filter((t) => t.id !== action.payload);
    },
    // ES: Reducer para establecer la lista completa de todos. Útil para la carga inicial desde una API.
    // EN: Reducer to set the entire list of todos. Useful for initial loading from an API.
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    // ES: Reducer para editar el texto de un todo. Recibe el id y el nuevo texto.
    // EN: Reducer to edit a todo's text. Receives
    editarTodo(state, action: PayloadAction<{ id: number; texto: string }>) {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.texto = action.payload.texto;
      }
    },
  },
});
export const { agregarTodo, toggleTodo, eliminarTodo, setTodos, editarTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
`;

const codeStore = `
// En tu archivo: src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"; // Asegúrate de que la ruta a tu slice sea correcta

export const store = configureStore({
  reducer: {
    // Aquí van todos tus reducers
    todos: todoReducer,
  },
});

// ¡Esta es la parte clave!
// Infiere el tipo \`RootState\` directamente desde el store
export type RootState = ReturnType<typeof store.getState>;

// También es una buena práctica inferir y exportar el tipo AppDispatch
export type AppDispatch = typeof store.dispatch;
`;

const codeApp = `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
`;

const codeString = `
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  agregarTodo,
  toggleTodo,
  eliminarTodo,
  setTodos,
  editarTodo,
} from "../redux/todoSlice";
import { RootState, AppDispatch } from "../redux/store";

/**
 * ES: Nivel MEDIO — ToDo con Redux Toolkit: listar, agregar, completar, borrar, editar + estados de carga/error.
 * EN: MEDIUM level — ToDo with Redux Toolkit: list, add, toggle, delete, edit + loading/error states.
 *
 * ES: La lógica de estado se gestiona globalmente con Redux, desacoplando el estado de la UI.
 * EN: State logic is managed globally with Redux, decoupling the state from the UI.
 */
export default function ToDoRedux() {
  // ES: Estado local solo para el campo de texto. Es un estado efímero que no necesita ser global.
  // EN: Local state for the text input only. It's an ephemeral state that doesn't need to be global.
  const [texto, setTexto] = useState("");
  // ES: Estados locales para manejar el ciclo de vida de la petición de red.
  // EN: Local states to manage the network request lifecycle.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // ES: Estados locales para la edición inline. El estado de la UI no necesita estar en Redux.
  // EN: Local states for inline editing. UI state doesn't need to be in Redux.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // ES: 'useSelector' extrae datos del store de Redux. Nos suscribimos al estado 'todos'.
  // EN: 'useSelector' extracts data from the Redux store. We subscribe to the 'todos' state.
  const todos = useSelector((state: RootState) => state.todos);

  // ES: 'useDispatch' nos da la función 'dispatch' para enviar acciones al store.
  // EN: 'useDispatch' gives us the 'dispatch' function to send actions to the store.
  const dispatch: AppDispatch = useDispatch();

  /**
   * ES: Efecto para cargar datos iniciales. Se ejecuta una vez cuando el componente se monta.
   * EN: Effect to load initial data. It runs once when the component mounts.
   */
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((data: Array<{ id: number; title: string; completed: boolean }>) => {
        // ES: Mapeamos los datos de la API para que coincidan con la estructura de nuestro estado en Redux.
        // EN: We map the API data to match the structure of our state in Redux.
        const mappedTodos = data.map((t) => ({
          id: t.id,
          texto: t.title, // 'title' de la API -> 'texto' en nuestro estado
          completado: t.completed, // 'completed' de la API -> 'completado' en nuestro estado
        }));
        // ES: Despachamos la acción 'setTodos' para inicializar el estado en Redux.
        // EN: We dispatch the 'setTodos' action to initialize the state in Redux.
        dispatch(setTodos(mappedTodos));
      })
      .catch((e) => setError(e.message || "Unknown fetch error"))
      .finally(() => setLoading(false));
  }, [dispatch]); // ES: dispatch se incluye como dependencia según las reglas de los hooks.
                  // EN: dispatch is included as a dependency according to the rules of hooks.

  // ES: Despacha la acción para añadir una nueva tarea.
  // EN: Dispatches the action to add a new task.
  const handleAddTodo = () => {
    const trimmedText = texto.trim();
    if (!trimmedText) return;
    // ES: Despachamos la acción 'agregarTodo' con el texto del input como payload.
    // EN: We dispatch the 'agregarTodo' action with the input text as payload.
    dispatch(agregarTodo(trimmedText));
    setTexto("");
  };

  // ES: Inicia el modo de edición para una tarea específica.
  // EN: Enters edit mode for a specific task.
  const startEdit = (todo: { id: number; texto: string }) => {
    setEditingId(todo.id);
    setEditingText(todo.texto);
  };

  // ES: Sale del modo de edición y resetea los estados relacionados.
  // EN: Exits edit mode and resets the related states.
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // ES: Confirma y guarda los cambios de la edición despachando la acción a Redux.
  // EN: Commits and saves the changes from editing by dispatching the action to Redux.
  const commitEdit = () => {
    const trimmedText = editingText.trim();
    if (!trimmedText || editingId === null) {
      return cancelEdit();
    }
    // ES: Despachamos la acción 'editarTodo' con el id y el nuevo texto.
    // EN: We dispatch the 'editarTodo' action with the id and the new text.
    dispatch(editarTodo({ id: editingId, texto: trimmedText }));
    cancelEdit();
  };

  // ES: Lógica de reintento simple para la demo.
  // EN: Simple retry logic for the demo.
  const retry = () => window.location.reload();

  return (
    <section style={{ maxWidth: 560, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h2>ToDo (Redux)</h2>

      {/* ES: Formulario para agregar nuevas tareas.
          EN: Form to add new tasks. */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Add a task…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          style={{ flex: 1 }} />
        <button onClick={handleAddTodo} disabled={!texto.trim()}>
          Add
        </button>
      </div>

      {/* ES: Renderizado condicional para los estados de carga y error.
          EN: Conditional rendering for loading and error states. */}
      {loading && <p>Loading…</p>}
      {error && (
        <p style={{ color: "crimson" }}>
          Error: {error} <button onClick={retry}>Retry</button>
        </p>
      )}

      {/* ES: La lista solo se muestra si no hay carga ni errores.
          EN: The list is only shown if there is no loading and no errors. */}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                alignItems: "center",
                gap: 8,
                borderTop: "1px solid #eee",
                padding: "6px 0",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completado}
                onChange={() => dispatch(toggleTodo(todo.id))}
                aria-label={\`Toggle \${todo.texto}\`}
              />

              {/* ES: Renderizado condicional: o mostramos el input de edición o el texto normal.
                  EN: Conditional rendering: we either show the edit input or the normal text. */}
              {editingId === todo.id ? (
                <>
                  <input
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                  />
                  <button onClick={commitEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: todo.completado ? "line-through" : "none" }}>
                    {todo.texto}
                  </span>
                  <button onClick={() => startEdit(todo)}>Edit</button>
                </>
              )}

              <button
                onClick={() => dispatch(eliminarTodo(todo.id))}
                aria-label={\`Delete \${todo.texto}\`}
              >
                ✕
              </button>
            </li>
          ))}
          {todos.length === 0 && !loading && <li>No items</li>}
        </ul>
      )}
    </section>
  );
}
`;

const codeList = `
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;
`;

function ToDoReduxUICode() {
  return (
    <div>
      <CodeViewer code={codeLine} title="Source Code: Code Line to add Redux" />
      <CodeViewer code={codeSlice} title="Source Code: redux/todoSlice.ts" />
      <CodeViewer code={codeStore} title="Source Code: reduxstore.ts" />
      <CodeViewer code={codeApp} title="Source Code: App" />
      <CodeViewer code={codeString} title="Source Code: ToDoRedux.tsx" />
      <CodeViewer code={codeList} title="Source Code: Call Component Todo" />
    </div>
  );
}

export default ToDoReduxUICode;

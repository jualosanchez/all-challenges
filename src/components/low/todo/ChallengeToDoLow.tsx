import { useEffect, useState } from "react";
import ChallengeToDoLowUICode from "./ChallengeToDoLowUICode";

/**
 * ES: Nivel BAJO — ToDo con mock data: listar, agregar, completar, borrar.
 * EN: LOW level — ToDo with mock data: list, add, toggle, delete.
 *
 * ES: Usamos mock por simplicidad. Dejo el fetch comentado para activarlo rápido.
 * EN: We use mock for simplicity. I left fetch commented so you can enable it quickly.
 */
export default function ChallengeToDoLow() {
  // ES: Definición del tipo para una tarea. Ayuda a la seguridad de tipos y autocompletado.
  // EN: Type definition for a todo item. It helps with type safety and autocompletion.
  type Todo = { id: number; title: string; completed: boolean };

  // ES: Estado principal que contiene el array de tareas. Es la "fuente de la verdad".
  // EN: Main state that holds the array of todos. It's the "single source of truth".
  const [todos, setTodos] = useState<Todo[]>([]);

  // ES: Estado para el input de texto. Almacenar su valor en el estado lo convierte en un "componente controlado".
  // EN: State for the text input. Storing its value in the state makes it a "controlled component".
  const [text, setText] = useState("");

  /**
   * ES: Efecto para cargar datos iniciales cuando el componente se monta.
   *     El array de dependencias vacío ('[]') asegura que se ejecute solo una vez.
   * EN: Effect to load initial data when the component mounts.
   *     The empty dependency array ('[]') ensures it runs only once.
   */
  useEffect(() => {
  //---------- Opción A: JSONPlaceholder ----------
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then((r) => r.json())
    .then((data: Array<{ id: number; title: string; completed: boolean }>) => {
      // ES: Actualizamos el estado con los datos de la API, causando un re-render.
      // EN: We update the state with the API data, causing a re-render.
      setTodos(data);
    })
    .catch((e) => console.error("Fetch error:", e));
  }, []);

  // ES: Añade una nueva tarea a la lista.
  // EN: Adds a new item to the list.
  const addTodo = () => {
    // ES: 'trim()' elimina espacios en blanco al inicio y final. Si no hay texto, no hacemos nada.
    // EN: 'trim()' removes whitespace from both ends. If there's no text, we do nothing.
    const title = text.trim();
    if (!title) return;
    // ES: Actualización inmutable: creamos un nuevo array usando el 'spread operator' y añadimos el nuevo ítem.
    // EN: Immutable update: we create a new array using the spread operator and add the new item.
    setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
    // ES: Limpiamos el campo de texto después de agregar la tarea.
    // EN: Clear the text field after adding the task.
    setText("");
  };

  // ES: Cambia el estado 'completed' de una tarea.
  // EN: Toggles the 'completed' state of a task.
  const toggle = (id: number) =>
    setTodos((prev) =>
      // ES: Usamos 'map' para devolver un nuevo array. Si el id coincide, creamos un nuevo objeto con 'completed' invertido.
      // EN: We use 'map' to return a new array. If the id matches, we create a new object with 'completed' flipped.
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // ES: Elimina una tarea de la lista.
  // EN: Removes a task from the list.
  const removeOne = (id: number) =>
    // ES: 'filter' crea un nuevo array con todos los elementos que pasan la condición (cuyo id no coincide).
    // EN: 'filter' creates a new array with all elements that pass the condition (whose id does not match).
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <>
      <section style={{ maxWidth: 520, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
        <h2>ToDo (Low)</h2>

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

        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {/* ES: Mapeamos el array de 'todos' para renderizar cada ítem de la lista.
              EN: We map over the 'todos' array to render each list item. */}
          {todos.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                borderTop: "1px solid #eee",
                padding: "6px 0",
              }}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t.id)}
              // ES: 'aria-label' es crucial para la accesibilidad, da contexto a los lectores de pantalla.
              // EN: 'aria-label' is crucial for accessibility, it gives context to screen readers.
                aria-label={`Toggle ${t.title}`} />
            {/* ES: El estilo del texto cambia condicionalmente si la tarea está completada.
                EN: The text style changes conditionally if the task is completed. */}
              <span style={{ textDecoration: t.completed ? "line-through" : "none", flex: 1 }}>
                {t.title}
              </span>
              <button onClick={() => removeOne(t.id)} aria-label={`Delete ${t.title}`}>
                ✕
              </button>
            </li>
          ))}
        {/* ES: Mostramos un mensaje si la lista está vacía para una mejor experiencia de usuario.
            EN: We show a message if the list is empty for a better user experience. */}
          {todos.length === 0 && <li>No items</li>}
        </ul>
      </section>
      <ChallengeToDoLowUICode />
    </>
  );
}

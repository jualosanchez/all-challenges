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
  // ES: Modelo mínimo de ToDo / EN: Minimal ToDo model
  type Todo = { id: number; title: string; completed: boolean };

  // ES: Estado principal de la lista / EN: Main list state
  const [todos, setTodos] = useState<Todo[]>([
    /*{ id: 1, title: "Learn React basics", completed: false },
    { id: 2, title: "Build a ToDo list", completed: true },*/
  ]);

  // ES: Control del input para agregar / EN: Controlled input for adding
  const [text, setText] = useState("");

  /**
   * ES: (Opcional) Cargar desde API — Descomentá uno de los dos bloques.
   * EN: (Optional) Load from API — Uncomment one of the two blocks below.
   */
  useEffect(() => {
  //---------- Opción A: JSONPlaceholder ----------
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then((r) => r.json())
    .then((data: Array<{ id: number; title: string; completed: boolean }>) => {
      setTodos(data);
    })
    .catch((e) => console.error("Fetch error:", e));
  }, []);

  // ES: Agregar ítem — validación simple; ID incremental local.
  // EN: Add item — simple validation; local incremental ID.
  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
    setText("");
  };

  // ES: Toggle de completado — inmutabilidad copiando el array.
  // EN: Toggle complete — immutability by copying the array.
  const toggle = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  // ES: Borrar — filtramos por id.
  // EN: Remove — filter by id.
  const removeOne = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <>
      <section style={{ maxWidth: 520, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
        <h2>ToDo (Low)</h2>

        {/* ES: Input controlado + botón de agregar
          EN: Controlled input + add button */}
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
                aria-label={`Toggle ${t.title}`} />
              <span style={{ textDecoration: t.completed ? "line-through" : "none", flex: 1 }}>
                {t.title}
              </span>
              <button onClick={() => removeOne(t.id)} aria-label={`Delete ${t.title}`}>
                ✕
              </button>
            </li>
          ))}
          {todos.length === 0 && <li>No items</li>}
        </ul>
      </section>
      <ChallengeToDoLowUICode />
    </>
  );
}

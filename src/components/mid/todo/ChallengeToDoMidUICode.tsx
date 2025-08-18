import CodeViewer from '../../CodeViewer';

const codeString = `
import { useEffect, useState } from "react";
import ChallengeToDoMidUICode from "./ChallengeToDoMidUICode";

/**
 * ES: Nivel MEDIO — +loading/error/retry, edición inline.
 * EN: MID level — +loading/error/retry, inline editing.
 */
export default function ChallengeToDoMid() {
  type Todo = { id: number; title: string; completed: boolean };

  const [todos, setTodos] = useState<Todo[]>([
    /*{ id: 1, title: "Mock: write tests", completed: false },
    { id: 2, title: "Mock: style components", completed: false },*/
  ]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    // ES: Carga opcional desde API (descomentar una variante)
    // EN: Optional load from API (uncomment one variant)

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
      .catch((e) => setErr(e.message))
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

  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((p) => [...p, { id: Date.now(), title, completed: false }]);
    setText("");
  };

  const toggle = (id: number) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const removeOne = (id: number) => setTodos((p) => p.filter((t) => t.id !== id));

  // ES: Entrar a modo edición / EN: Enter edit mode
  const startEdit = (t: Todo) => {
    setEditingId(t.id);
    setEditingText(t.title);
  };
  // ES: Confirmar edición / EN: Confirm edit
  const commitEdit = () => {
    const title = editingText.trim();
    if (!title || editingId == null) return cancelEdit();
    setTodos((p) => p.map((t) => (t.id === editingId ? { ...t, title } : t)));
    cancelEdit();
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const retry = () => {
    // ES: En una app real reusaríamos la función fetch; aquí para demo mantengo simple.
    // EN: In a real app we’d reuse a fetch function; here I keep it simple for demo.
    window.location.reload();
  };

  return (
    <section style={{ maxWidth: 560, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
      <h2>ToDo (Mid)</h2>

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

      {loading && <p>Loading…</p>}
      {err && (
        <p style={{ color: "crimson" }}>
          Error: {err} <button onClick={retry}>Retry</button>
        </p>
      )}

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
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              {editingId === t.id ? (
                <>
                  <input
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit()} />
                  <button onClick={commitEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                    {t.title}
                  </span>
                  <button onClick={() => startEdit(t)}>Edit</button>
                </>
              )}
              <button onClick={() => removeOne(t.id)}>✕</button>
            </li>
          ))}
          {todos.length === 0 && <li>No items</li>}
        </ul>
      )}
    </section>
  );
}
`;

export default function ChallengeToDoMidUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeToDoMid.tsx"
      />
    </div>
  );
}
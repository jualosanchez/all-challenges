import CodeViewer from '../../CodeViewer';

const codeString = `
import React, { useEffect, useMemo, useState } from "react";
import ChallengeToDoLowUICode from "../../low/todo/ChallengeToDoLowUICode";

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
  type Todo = { id: number; title: string; completed: boolean };
  type View = "all" | "active" | "completed";

  // ES: Fuente de verdad / EN: Single source of truth
  const [todos, setTodos] = useState<Todo[]>([
    // { id: 1, title: "Mock: refactor components", completed: false },
    // { id: 2, title: "Mock: ship MVP", completed: true },
    // { id: 3, title: "Mock: write docs", completed: false },
  ]);

  // ES: Entrada para agregar / EN: Input to add
  const [text, setText] = useState("");

  // ES: Filtro de vista / EN: View filter
  const [view, setView] = useState<View>("all");

  // ES: Estados de red / EN: Network states
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ES: Estado de edición (nuevo en HARD) / EN: Editing state (new in HARD)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    // ES: Dejo dos variantes de fetch — activé JSONPlaceholder para que ya veas datos.
    // EN: Two fetch variants — JSONPlaceholder enabled so you see data right away.

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

  // ES: Agregar — validación simple + id local / EN: Add — simple validation + local id
  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((p) => [...p, { id: Date.now(), title, completed: false }]);
    setText("");
  };

  // ES: Toggle completo / EN: Toggle complete
  const toggle = (id: number) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  // ES: Borrar / EN: Delete
  const removeOne = (id: number) => setTodos((p) => p.filter((t) => t.id !== id));

  // ---------- Edición (como en MEDIO) / Editing (as in MID) ----------
  // ES: Entrar a modo edición con valores iniciales
  // EN: Enter edit mode with initial values
  const startEdit = (t: Todo) => {
    setEditingId(t.id);
    setEditingText(t.title);
  };

  // ES: Confirmar edición (trim, no vacío); salimos del modo edición
  // EN: Commit edit (trim, non-empty); exit edit mode
  const commitEdit = () => {
    const title = editingText.trim();
    if (!title || editingId == null) return cancelEdit();
    setTodos((p) => p.map((t) => (t.id === editingId ? { ...t, title } : t)));
    cancelEdit();
  };

  // ES: Cancelar edición / EN: Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // ES: Accesibilidad/UX: Enter = Save, Escape = Cancel
  // EN: A11y/UX: Enter = Save, Escape = Cancel
  const onEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  // ---------- Datos derivados / Derived data ----------
  // ES: Contador de pendientes / EN: Active counter
  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  // ES: Vista filtrada (no muta la fuente) / EN: Filtered view (doesn't mutate source)
  const visible = useMemo(() => {
    switch (view) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, view]);

  return (
    <>
      <section style={{ maxWidth: 620, margin: "1.5rem auto", fontFamily: "sans-serif" }}>
        <h2>ToDo (Hard)</h2>

        {/* ES: Barra de entrada + filtros / EN: Input bar + filters */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              placeholder="Add a task…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              style={{ flex: 1 }}
            />
            <button onClick={addTodo} disabled={!text.trim()}>
              Add
            </button>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setView("all")}
              aria-pressed={view === "all"}
              title="Show all"
            >
              All
            </button>
            <button
              onClick={() => setView("active")}
              aria-pressed={view === "active"}
              title="Show active"
            >
              Active
            </button>
            <button
              onClick={() => setView("completed")}
              aria-pressed={view === "completed"}
              title="Show completed"
            >
              Completed
            </button>
          </div>
        </div>

        {loading && <p>Loading…</p>}
        {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

        {!loading && !err && (
          <>
            {/* ES: Contador derivado / EN: Derived counter */}
            <p style={{ opacity: 0.75, marginTop: 8 }}>
              Active tasks: <b>{activeCount}</b>
            </p>

            <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
              {visible.map((t) => {
                const isEditing = editingId === t.id;
                return (
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
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggle(t.id)}
                      aria-label={\`Toggle \${t.title}\`}
                    />

                    {isEditing ? (
                      <>
                        <input
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
                            textDecoration: t.completed ? "line-through" : "none",
                          }}
                        >
                          {t.title}
                        </span>
                        <button onClick={() => startEdit(t)} title="Edit task">
                          Edit
                        </button>
                      </>
                    )}

                    <button onClick={() => removeOne(t.id)} aria-label={\`Delete \${t.title}\`}>
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
         * ES (para explicar):
         * - \`todos\` es la única fuente de verdad; \`visible\` y \`activeCount\` son derivados (useMemo).
         * - La edición es "inline": guardo \`editingId\`/\`editingText\` locales y al confirmar hago un map inmutable.
         * - Las vistas (All/Active/Completed) no mutan la lista, solo proyectan (buena práctica).
         * - Dejé el fetch de JSONPlaceholder activo; si prefieren mock, lo comentamos en vivo.
         *
         * EN (to explain):
         * - \`todos\` is the single source of truth; \`visible\` and \`activeCount\` are derived (useMemo).
         * - Editing is inline: keep \`editingId\`/\`editingText\` local, on save do an immutable map.
         * - Views (All/Active/Completed) don’t mutate the list, they only project (best practice).
         * - JSONPlaceholder fetch is enabled; if they prefer mock, comment it live.
         */}
      </section>
      <ChallengeToDoLowUICode />
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
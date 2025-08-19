import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'todos',
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

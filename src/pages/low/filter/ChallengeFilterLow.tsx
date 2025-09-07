import React, { useEffect, useState } from 'react';
import ChallengeFilterLowUICode from './ChallengeFilterLowUICode';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  // Array de objetos en el estado
  const [todos, setTodos] = useState<Todo[]>([]);

  // Filtramos las tareas que tienen la propiedad 'completed' en 'true'
  const completedTodos = todos.filter((todo) => todo.completed);

  useEffect(() => {
    setTodos([
      { id: 1, text: 'Aprender React', completed: true },
      { id: 2, text: 'Hacer la compra', completed: false },
      { id: 3, text: 'Pasear al perro', completed: true },
    ]);
  }, []);

  return (
    <>
      <div>
        <h2>Tareas Completadas</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
      <ChallengeFilterLowUICode />
    </>
  );
};

export default TodoList;

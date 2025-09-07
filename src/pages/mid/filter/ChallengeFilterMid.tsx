import React, { useEffect, useState } from 'react';
import ChallengeFilterMidUICode from './ChallengeFilterUICode';

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
      { id: 4, text: 'Terminar Esto', completed: true },
      { id: 5, text: 'Estudiar otros cursos', completed: true },
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
      <ChallengeFilterMidUICode />
    </>
  );
};

export default TodoList;

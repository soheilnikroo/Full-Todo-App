import React from 'react';
import Todo from '../../models/todos-model';
import TodoSection from '../TodoSection/TodoSection';

interface ShowTodosProps {
  category: string;
  isLoading: boolean;
  todosData: (Todo | undefined)[];
  doneData: (Todo | undefined)[];
}

const ShowTodos: React.FC<ShowTodosProps> = ({
  category,
  isLoading,
  todosData,
  doneData,
}) => {
  return category === 'todo' ? (
    <TodoSection title="Todo" isLoading={isLoading} todosData={todosData} />
  ) : (
    <TodoSection title="Done" isLoading={isLoading} todosData={doneData} />
  );
};

export default ShowTodos;

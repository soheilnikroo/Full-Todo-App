import Todo from '../models/todos-model';

export enum Filter {
  completed,
  NotCompleted,
}

export const filterTodos = (todos: Todo[], filter: Filter) => {
  let filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.completed:
        return todo.isDone;
      case Filter.NotCompleted:
        return !todo.isDone;
      default:
        return true;
    }
  });

  return filteredTodos;
};

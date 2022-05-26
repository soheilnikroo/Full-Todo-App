import { TaskType } from '../types';

class Todo {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  circleColor: string;

  constructor(public todo: TaskType) {
    this._id = todo._id;
    this.title = todo.title;
    this.description = todo.description;
    this.isDone = todo.isDone;
    this.circleColor = todo.circleColor;
  }

  getId() {
    return this._id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getIsDone() {
    return this.isDone;
  }

  getCircleColor() {
    return this.circleColor;
  }
}

export default Todo;

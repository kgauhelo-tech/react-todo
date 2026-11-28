import { type todo } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const todoList: todo[] = [];

// I should create a method for verification - to verify if a task was completed.

export const createTodo = (
  title: string,
  description: string,
  dueDate: string,
) => {
  const newTodo: todo = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    isComplete: false,
  };

  todoList.push(newTodo);
};

export const updateTodo = (
  id: string,
  title: string,
  description: string,
  dueDate: string,
  isComplete: boolean,
) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index > -1) {
    const updatedTodo = {
      id,
      title,
      description,
      isComplete,
      dueDate,
    };

    todoList[index] = updatedTodo;
  }
};

export const updateTodoStatus = (id: string, status: boolean) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index > -1) todoList[index].isComplete = status;
};

export const deleteTodo = (id: string) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index > -1) {
    todoList.splice(index, 1);
  }
};

export const getTodoById = (id: string) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index > -1) {
    return todoList[index];
  }
};

export const getAllTodos = () => {
  return todoList.slice();
};

export const deleteTodos = (ids: string[]) => {
  for (let index = 0; index < ids.length; index++) {
    const todoIndex = todoList.findIndex((todo) => todo.id === ids[index]);
    if (todoIndex > -1) {
      deleteTodo(ids[index]);
    }
  }
};

import axios from "axios";
import { NewTodo, Todo, UpdatedTodo } from "../types";

const BaseUrl = "http://localhost:3000/api";

const getAllTodos = async () => {
  const response = await axios.get<Todo[]>(`${BaseUrl}/todos`);
  return response.data;
};

const getTodo = async (id: number) => {
  const response = await axios.get<Todo>(`${BaseUrl}/todos/${id}`);
  return response.data;
};

const updateTodo = async (id: number, content: UpdatedTodo) => {
  const response = await axios.put<Todo>(`${BaseUrl}/todos/${id}`, content);
  return response.data;
};

const toggleCompleteTodo = async (id: number, status?: boolean) => {
  const todo = await getTodo(id);
  if (status === undefined) status = !todo.completed;
  return updateTodo(id, { completed: status });
};

const deleteTodo = (id: number) => {
  return axios.delete(`${BaseUrl}/todos/${id}`);
};

const addTodo = async (content: NewTodo) => {
  const response = await axios.post<Todo>(`${BaseUrl}/todos`, content);
  return response.data;
};

export default {
  getAllTodos,
  getTodo,
  updateTodo,
  toggleCompleteTodo,
  deleteTodo,
  addTodo,
};

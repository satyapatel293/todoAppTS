import axios from "axios";
import { NewTodo, Todo, UpdatedTodo } from "../types";

const BaseUrl = "http://localhost:3000/api";

const getAllTodos = () => {
  return axios
    .get<Todo[]>(`${BaseUrl}/todos`)
    .then((response) => response.data);
};

const getTodo = (id:number) => {
  return axios
  .get<Todo>(`${BaseUrl}/todos/${id}`)
  .then((response) => response.data);
}

const updateTodo = (id: number, content: UpdatedTodo) => {
  return axios
    .put<Todo>(`${BaseUrl}/todos/${id}`, content)
    .then((response) => response.data);
};

const toggleCompleteTodo = (id: number, status?: boolean) => {
  async function toggle () {
    const todo = await getTodo(id)
    if (status === undefined) {
      status = !todo.completed
    }
    return updateTodo(id, {completed: status})
  }

  return toggle()
};

const deleteTodo = (id: number) => {
  return axios
    .delete(`${BaseUrl}/todos/${id}`)
};

const addTodo = (content: NewTodo) => {
  return axios
    .post<Todo>(`${BaseUrl}/todos`, content)
    .then((response) => response.data);
};

export default {
  getAllTodos,
  getTodo,
  updateTodo,
  toggleCompleteTodo,
  deleteTodo,
  addTodo
};

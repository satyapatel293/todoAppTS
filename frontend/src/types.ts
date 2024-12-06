export interface Todo {
  id: number
  title: string
  day: string
  month: string
  year: string
  completed: boolean
  description: string  
}

export type NewTodo = Omit<Partial<Todo>, 'id' | 'title'> & {title: string}
export type UpdatedTodo = Omit<Partial<Todo>, 'id'>

export type DateGroupedTodos = { 
  date: string
  list: Todo[] 
}[]
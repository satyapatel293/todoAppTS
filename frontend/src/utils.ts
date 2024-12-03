import { NewTodo, Todo } from "./types";

export const parseDueDate = (todo:Todo) => {
  if (todo.month.trim() && todo.year.trim()) {
    return `${todo.month}/${todo.year.slice(2)}`
  } else {
    return 'No Due Date'
  }
}

export const formatNewTodo = (newTodo:NewTodo): NewTodo => {
  if (newTodo.day === '  ') {
    delete newTodo.day
  }
  if (newTodo.month === '  ') {
    delete newTodo.month
  }
  if (newTodo.year === '    ') {
    delete newTodo.year
  }
  if (newTodo.description?.trim() === '') {
    delete newTodo.description
  }
  return newTodo
}


export const sortTodos = (allTodos: Todo[]): Todo[] => {
  const incompleteTodos: Todo[] = []
  const completeTodos: Todo[] = []

  allTodos.forEach(todo => {
    if (todo.completed) {
      completeTodos.push(todo)
    } else {
      incompleteTodos.push(todo)
    }
  })

  return [...incompleteTodos, ...completeTodos]
}


export const completedTodos = (allTodos:Todo[]):Todo[] => {
  return allTodos.filter(todo => todo.completed)
} 

export const dateSortedTodos = (allTodos: Todo[]) => {
  const dateGroupTodos:{ [date:string]:Todo[] }[] = []
  allTodos.forEach(todo => {
    const date = parseDueDate(todo)
    const index = dateGroupTodos.findIndex(group => {
      return date in group
    })
    
    if (index !== -1) {
      dateGroupTodos[index][date].push(todo)
    } else {
      dateGroupTodos.push({[date]: [todo]})
    }
  })

  return sortByDate(dateGroupTodos)
}

const sortByDate = (list:{ [date:string]:Todo[] }[]) : { [date:string]:Todo[] }[] => {
  return list.sort((a, b) => {
    const dateA = Object.keys(a)[0]
    const dateB = Object.keys(b)[0]

    if (dateA === 'No Due Date') return 1
    if (dateB === 'No Due Date') return 1 

    const [monthA, yearA] = dateA.split('/').map(stringDate => parseInt(stringDate))
    const [monthB, yearB] = dateB.split('/').map(stringDate => parseInt(stringDate))

    if (yearA !== yearB) {
      return yearA - yearB
    }

    return monthA-monthB
  })
}
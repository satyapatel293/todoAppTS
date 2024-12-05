import { NewTodo, Todo, DateGroupedTodos } from "./types";

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
  const dateGroupTodos: DateGroupedTodos = []
  allTodos.forEach(todo => {
    const date = parseDueDate(todo)
    const index = dateGroupTodos.findIndex(group => {
      return group.date === date
    })
    
    if (index !== -1) {
      dateGroupTodos[index].list.push(todo)
    } else {
      dateGroupTodos.push({date:date, list:[todo]})
    }
  })

  return sortByDate(dateGroupTodos)
}

const sortByDate = (list:DateGroupedTodos) => {
  return list.sort((a, b) => {
    const dateA = a.date
    const dateB = b.date

    if (dateA === 'No Due Date') return -1
    if (dateB === 'No Due Date') return 1 

    const [monthA, yearA] = dateA.split('/').map(stringDate => parseInt(stringDate))
    const [monthB, yearB] = dateB.split('/').map(stringDate => parseInt(stringDate))

    if (yearA !== yearB) {
      return yearA - yearB
    }

    return monthA-monthB
  })
}

export const filterByListName = (allTodos:Todo[], listName:string) => {
  if (listName === 'All Todos') {
    return allTodos
  } else if (listName === 'Completed') {
    return completedTodos(allTodos)
  }

  const todoAtDate = dateSortedTodos(allTodos).find(group => group.date === listName.replace(' done', ''))?.list

  if (todoAtDate === undefined) {
    return []
  }
  
  if (listName.includes(' done')) {
    return completedTodos(todoAtDate)
  } 
  
  return todoAtDate
}
import { NewTodo, Todo, DateGroupedTodos } from "./types";

export const parseDueDate = (todo:Todo) => {
  if (todo.month.trim() && todo.year.trim()) {
    return `${todo.month}/${todo.year.slice(2)}`
  } else {
    return 'No Due Date'
  }
}

export const formatNewTodo = (newTodoData:NewTodo): NewTodo => {
  const copyTodo = newTodoData

  if (newTodoData.day === '  ') {
    delete copyTodo.day
  }
  
  if (newTodoData.month === '  ') {
    delete copyTodo.month
  }
  
  if (newTodoData.year === '    ') {
    delete copyTodo.year
  }
  
  if (newTodoData.description?.trim() === '') {
    delete copyTodo.description
  }

  return copyTodo
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


export const getCompletedTodos = (allTodos:Todo[]):Todo[] => {
  return allTodos.filter(todo => todo.completed)
} 

export const groupAndSortTodosByDate = (allTodos: Todo[]) => {
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

export const filterTodosByListName = (allTodos:Todo[], listName:string) => {
  if (listName === 'All Todos') {
    return allTodos
  } 
  
  if (listName === 'Completed') {
    return getCompletedTodos(allTodos)
  }

  const groupedTodos = groupAndSortTodosByDate(allTodos)
  const matchedGroup = groupedTodos.find(group => group.date === listName.replace(' done', ''))
  
  if (matchedGroup === undefined) return []
  return listName.includes(' done') ? 
    getCompletedTodos(matchedGroup.list)
    : matchedGroup.list
}
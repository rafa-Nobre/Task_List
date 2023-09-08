import { getAllTasks } from '../api/methods'

//TODO mudar talvez
export const fetchTaskList = () => {
  getAllTasks()
    .then(response => {
      console.log('response', response.data)
      return response.data
    })
    .catch(() => {
      window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
    })
}

export const sortTasksByPriority = tasks => {
  const sortTasks = tasks.sort((first, second) => {
    const order = {
      Urgente: 0,
      Alta: 1,
      Media: 2,
      Baixa: 3
    }
    return order[first.priority] - order[second.priority]
  })

  return sortTasks
}

export const sortAllTasks = (tasks, priority, selection) => {
  let filteredTasks = tasks

  if (priority !== 'Todos') {
    filteredTasks = filteredTasks.filter(task => task.priority === priority)
  }

  // Filtrar por status
  if (selection === 'Done') {
    filteredTasks = filteredTasks.filter(task => task.isDone)
  } else if (selection === 'Undone') {
    filteredTasks = filteredTasks.filter(task => !task.isDone)
  }

  return filteredTasks
}

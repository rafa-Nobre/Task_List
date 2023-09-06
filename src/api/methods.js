import apiCall from './apiCall'

export const getAllTasks = async () => {
  return apiCall.get('/task')
}

export const sendNewTask = async (taskText, taskPriority) => {
  return apiCall.post('/task', {
    name: taskText,
    priority: taskPriority,
    isDone: false
  })
}

export const updateTask = async currentTask => {
  return apiCall.put(`/task/${currentTask.id}`, {
    name: currentTask.name,
    priority: currentTask.priority,
    isDone: currentTask.isDone
  })
}

export const deleteTask = async taskId => {
  return apiCall.delete(`/task/${taskId}`)
}

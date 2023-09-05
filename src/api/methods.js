import apiCall from './apiCall'

export const getAllTasks = async () => {
  return apiCall.get('/task')
}

export const sendNewTask = async () => {
  return apiCall.post('/task')
}

export const updateTask = async taskId => {
  return apiCall.put('/task/', { params: { id: taskId } })
}

export const deleteTask = async taskId => {
  return apiCall.delete('/task/', { params: { id: taskId } })
}

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

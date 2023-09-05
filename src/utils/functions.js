import {
  getAllTasks,
  deleteTask,
  sendNewTask,
  updateTask
} from '../api/methods'

//TODO analisar bem o que fazer aqui!
function get() {
  getAllTasks()
    .then(response => {
      console.log('response', response.data)
      return response.data
    })
    .catch(err => {
      window.alert('Ops!!\n', err)
    })
}

export { get }

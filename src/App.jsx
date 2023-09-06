import { useState, useEffect } from 'react'
import { getAllTasks, sendNewTask, deleteTask, updateTask } from './api/methods'
import { alertMessage } from './components/dialogs/alert_message'
import { TaskCard } from './components/task-card/task_card'
import './style.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState('')
  const [priority, setPriority] = useState('Baixa')

  useEffect(() => {
    fetchTaskList()
  }, [])

  const fetchTaskList = () => {
    getAllTasks()
      .then(response => {
        console.log('response', response.data)
        setTasks(response.data)
      })
      .catch(() => {
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      })
  }

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      sendNewTask(newTaskName, priority)
        .then(() => {
          fetchTaskList()
          setNewTaskName('')
        })
        .catch(() =>
          window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
        )
        .finally(() => alertMessage('Tarefa adicionada com sucesso!'))
    }
  }

  const handleCompleteTask = currentTask => {
    currentTask.isDone = true
    updateTask(currentTask)
      .then(() => fetchTaskList())
      .catch(() =>
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      )
      .finally(() => alertMessage('Tarefa concluída com sucesso!'))
  }

  const handleRemoveTask = currentTask => {
    deleteTask(currentTask)
      .then(() => fetchTaskList())
      .catch(() =>
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      )
      .finally(() => alertMessage('Tarefa removida com sucesso!'))
  }

  return (
    <div className="generalContainer">
      <h1>Painel de Tarefas</h1>
      <div className="inputForm">
        <input
          type="text"
          placeholder="Insira uma tarefa..."
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}
        />
        <select onChange={e => setPriority(e.target.value)} value={priority}>
          <option value="Baixa"> Baixa </option>
          <option value="Media"> Média </option>
          <option value="Alta"> Alta </option>
          <option value="Urgente"> Urgente </option>
        </select>
        <button onClick={handleAddTask}> Adicionar </button>
      </div>
      <TaskCard
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleRemoveTask}
      ></TaskCard>
    </div>
  )
}

export default App

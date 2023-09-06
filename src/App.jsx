import { useState, useEffect } from 'react'
import { getAllTasks, sendNewTask, deleteTask, updateTask } from './api/methods'
import { alertMessage } from './utils/functions'
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

  const handleCompleteTask = id => {}

  const handleRemoveTask = id => {
    deleteTask(id)
      .then(() => {
        fetchTaskList()
      })
      .catch(() => {
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      })
      .finally(() => {
        alertMessage('Tarefa removida com sucesso!')
      })
  }

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      sendNewTask(newTaskName, priority)
        .then(() => {
          fetchTaskList()
          setNewTaskName('')
        })
        .catch(() => {
          alertMessage(
            'Ops!!\n Algo de errado aconteceu ao adicionar a tarefa, tente novamente.'
          )
        })
        .finally(() => {
          alertMessage('Tarefa adicionada com sucesso!')
        })
    }
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

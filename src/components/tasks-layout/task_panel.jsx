import { useState, useEffect } from 'react'
import {
  getAllTasks,
  deleteTask,
  sendNewTask,
  updateTask
} from '../../api/methods'
import { alertMessage } from '../dialogs/alert_message'
import { TaskCard } from '../task-card/task_card'
import { sortTasksByPriority, sortAllTasks } from '../../utils/functions'
import './style.css'

export const TaskPanel = () => {
  const [tasks, setTasks] = useState([])
  const [newTaskName, setNewTaskName] = useState('')
  const [priority, setPriority] = useState('Baixa')
  const [filterPriority, setFilterPriority] = useState('Todos')
  const [selection, setSelection] = useState('Todos')

  const sortedTasks = sortAllTasks(tasks, filterPriority, selection)

  useEffect(() => {
    fetchTaskList()
  }, [])

  const fetchTaskList = () => {
    getAllTasks()
      .then(response => {
        sortTasksByPriority(response.data)
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
      <div className="filterPanel">
        <select
          onChange={e => setFilterPriority(e.target.value)}
          value={filterPriority}
        >
          <option value="Todos">----</option>
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>
        <select onChange={e => setSelection(e.target.value)} value={selection}>
          <option value="Todos">Todos</option>
          <option value="Done">Concluídos</option>
          <option value="Undone">Não Concluídos</option>
        </select>
      </div>
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
      <ul className="listSection">
        {sortedTasks.map(task => (
          <TaskCard
            task={task}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleRemoveTask}
          ></TaskCard>
        ))}
      </ul>
    </div>
  )
}

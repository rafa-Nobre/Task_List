import { useState, useEffect } from 'react'
import { getAllTasks } from './api/methods'
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

  //const setNewTask = value => {}

  //const setTaskPriority = value => {}

  const handleCompleteTask = id => {}

  const handleRemoveTask = id => {}

  const handleAddTask = () => {}

  return (
    <div className="task-app">
      <h1>Painel de Tarefas</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Insira uma tarefa..."
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}
        />
        <select onChange={e => setPriority(e.target.value)} value={priority}>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>
        <button onClick={handleAddTask}>Adicionar</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
          >
            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className="task-text">{task.name}</span>
            <div className="task-actions">
              <button onClick={() => handleCompleteTask(task.id)}>
                Concluir
              </button>
              <button onClick={() => handleRemoveTask(task.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

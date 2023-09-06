import { useState } from 'react'
import './style.css'
import { updateTask } from '../../api/methods'
import { alertMessage } from '../dialogs/alert_message'

export const TaskCard = ({ tasks, onCompleteTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState(null)
  const [newText, setNewText] = useState('')
  const [newPriority, setNewPriority] = useState('')

  const handleEdit = currentTask => {
    setEditingTask(currentTask.id)
    setNewText(currentTask.name)
    setNewPriority(currentTask.priority)
  }

  //TODO finalizar essa lógica
  const handleSaveEdit = currentTask => {
    updateTask(currentTask)
      .then(() => {
        alertMessage('Tarefa editada com sucesso!')
      })
      .catch(() => {
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      })
  }

  const onCancelEdit = () => {
    setEditingTask(null)
    setNewText('')
    setNewPriority('')
  }

  return (
    <ul className="listSection">
      {tasks.map(task => (
        <li key={task.id} className={`task ${task.isDone ? 'completed' : ''}`}>
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {editingTask === task.id ? (
              <select
                value={newPriority}
                onChange={element => setNewPriority(element.target.value)}
              >
                <option value="Urgente">Urgente</option>
                <option value="Alta">Alta</option>
                <option value="Media">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            ) : (
              task.priority
            )}
          </span>
          <span className="taskName">
            {editingTask === task.id ? (
              <input
                type="text"
                value={newText}
                onChange={element => setNewText(element.target.value)}
              />
            ) : (
              task.name
            )}
          </span>
          <div>
            {editingTask === task.id ? (
              <>
                <button
                  className="buttonComplete"
                  onClick={() => handleSaveEdit(task)}
                >
                  Salvar
                </button>
                <button className="buttonDelete" onClick={() => onCancelEdit()}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                {task.isDone ? (
                  <></>
                ) : (
                  <button
                    className="buttonComplete"
                    onClick={() => onCompleteTask(task)}
                  >
                    Concluir
                  </button>
                )}
                <button
                  className="buttonDelete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Remover
                </button>
                <button className="buttonEdit" onClick={() => handleEdit(task)}>
                  <img
                    src="src/assets/edit_icon.png"
                    alt="Edit"
                    width="20"
                    height="20"
                  />
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

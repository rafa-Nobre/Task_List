import { useState } from 'react'
import './style.css'
import { updateTask } from '../../api/methods'
import { alertMessage } from '../dialogs/alert_message'

export const TaskCard = ({ task, onCompleteTask, onDeleteTask }) => {
  const [editingTask, setEditingTask] = useState(null)
  const [newText, setNewText] = useState('')
  const [newPriority, setNewPriority] = useState('')

  const handleEdit = currentTask => {
    setEditingTask(currentTask.id)
    setNewText(currentTask.name)
    setNewPriority(currentTask.priority)
  }

  //TODO finalizar essa lógica
  const handleSaveEdit = async currentTask => {
    currentTask.name = newText
    currentTask.priority = newPriority
    await updateTask(currentTask)
      .then(() => {
        alertMessage('Tarefa editada com sucesso!')
      })
      .catch(() => {
        window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
      })
      .finally(() => {
        setEditingTask(null)
        setNewText('')
        setNewPriority('')
      })
  }

  const onCancelEdit = () => {
    setEditingTask(null)
    setNewText('')
    setNewPriority('')
  }

  return (
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
              <img
                src="src/assets/save_icon.png"
                alt="Save"
                width="20"
                height="20"
              />
            </button>
            <button className="buttonDelete" onClick={() => onCancelEdit()}>
              <img
                src="src/assets/cancel_icon.png"
                alt="Cancel"
                width="20"
                height="20"
              />
            </button>
          </>
        ) : (
          <>
            {task.isDone ? (
              <>
                {/* <button
                className="buttonRetrieve"
                onClick={() => (task.isDone = false)}
              >
                <img
                  src="src/assets/return_icon.png"
                  alt="Done"
                  width="20"
                  height="20"
                />
              </button> */}
              </>
            ) : (
              <>
                <button
                  className="buttonComplete"
                  onClick={() => onCompleteTask(task)}
                >
                  <img
                    src="src/assets/done_icon.png"
                    alt="Done"
                    width="20"
                    height="20"
                  />
                </button>
                <button
                  className="buttonDelete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <img
                    src="src/assets/trash_icon.png"
                    alt="Remove"
                    width="20"
                    height="20"
                  />
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
          </>
        )}
      </div>
    </li>
  )
}

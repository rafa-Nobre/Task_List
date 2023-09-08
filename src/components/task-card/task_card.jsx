import { useRef, useState } from 'react'
import { updateTask } from '../../api/methods'
import { alertMessage } from '../dialogs/alert_message'
import cancel_icon from '../../assets/cancel_icon.png'
import done_icon from '../../assets/done_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import return_icon from '../../assets/return_icon.png'
import save_icon from '../../assets/save_icon.png'
import trash_icon from '../../assets/trash_icon.png'
import './style.css'

export const TaskCard = ({
  task,
  onCompleteTask,
  onDeleteTask,
  onRetrieve
}) => {
  const [editingTask, setEditingTask] = useState(null)
  const [newText, setNewText] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const inputCardRef = useRef(null)

  const handleEdit = currentTask => {
    setEditingTask(currentTask.id)
    setNewText(currentTask.name)
    setNewPriority(currentTask.priority)

    inputCardRef.current.focus()
  }

  const handleSaveEdit = async currentTask => {
    if (currentTask.name != newText || currentTask.priority != newPriority) {
      currentTask.name = newText
      currentTask.priority = newPriority
      await updateTask(currentTask)
        .then(() => {
          alertMessage('Tarefa editada com sucesso!')
        })
        .catch(() => {
          window.alert('Ops!!\n Algo de errado aconteceu, tente novamente.')
        })
        .finally(() => handleCancelEdit())
    } else {
      handleCancelEdit()
    }
  }

  const handleEditBlur = () => {
    if (editingTask != null) {
      handleSaveEdit(task)
    }
  }

  const handleKeyPress = action => {
    if (action.key === 'Enter' && editingTask != null) {
      handleSaveEdit(task)
    }
  }

  const handleCancelEdit = () => {
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
            onBlur={() => handleSaveEdit(task)}
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
            onChange={e => setNewText(e.target.value)}
            onBlur={handleEditBlur}
            onKeyDown={handleKeyPress}
            ref={inputCardRef}
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
              <img src={save_icon} alt="Save" width="20" height="20" />
            </button>
            <button className="buttonDelete" onClick={() => handleCancelEdit()}>
              <img src={cancel_icon} alt="Cancel" width="20" height="20" />
            </button>
          </>
        ) : (
          <>
            {task.isDone ? (
              <button
                className="buttonRetrieve"
                onClick={() => onRetrieve(task)}
              >
                <img src={return_icon} alt="Done" width="20" height="20" />
              </button>
            ) : (
              <>
                <button
                  className="buttonComplete"
                  onClick={() => onCompleteTask(task)}
                >
                  <img src={done_icon} alt="Done" width="20" height="20" />
                </button>
                <button
                  className="buttonDelete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <img src={trash_icon} alt="Remove" width="20" height="20" />
                </button>
                <button className="buttonEdit" onClick={() => handleEdit(task)}>
                  <img src={edit_icon} alt="Edit" width="20" height="20" />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  )
}

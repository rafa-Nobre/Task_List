import './style.css'

export const TaskCard = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <ul className="listSection">
      {tasks.map(task => (
        <li
          key={task.id}
          className={`task ${task.completed ? 'completed' : ''}`}
        >
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="taskName"> {task.name} </span>
          <div className="actionSection">
            <button onClick={() => onCompleteTask(task.id)}>Concluir</button>
            <button onClick={() => onDeleteTask(task.id)}>Remover</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

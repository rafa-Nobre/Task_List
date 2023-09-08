import { TaskPanel } from './components/tasks-layout/task_panel'
import './app.css'

function App() {
  return (
    <div className="appContainer">
      <TaskPanel />
      <p className="waterMark">
        <a href="https://www.freepik.com/free-vector/meteors-rocky-asteroids-flying-outer-space_36330966.htm#query=website%20background%20cartoon&position=22&from_view=search&track=ais">
          Image by upklyak
        </a>{' '}
        on Freepik
      </p>
    </div>
  )
}

export default App

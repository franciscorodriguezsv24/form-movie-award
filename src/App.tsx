import style from './App.module.scss'
import { Home } from './page/home/Home'

function App() {

  return (
    <div className={style.mainContainer}>
      <Home/>
    </div>
  )
}

export default App

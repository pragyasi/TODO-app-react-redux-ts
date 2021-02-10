
import { Switch, Route} from 'react-router-dom'
import LandingPage from './container/LandingPage'
import TodoList from './container/TodoList'

export default function App() : JSX.Element{
  return(
    <div>
      <Switch>
      <Route path={'/'} exact component={LandingPage}/>
      <Route path={'/todoList'} exact component={TodoList}/>
       </Switch>
    </div>

  )
}
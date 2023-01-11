import {Route, Switch} from 'react-router-dom'
import AddItem from './components/AddItem'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'

const App = () => (
  <div>
    <div>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddItem} />
      </Switch>
    </div>
  </div>
)

export default App

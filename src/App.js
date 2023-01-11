import {Route, Switch} from 'react-router-dom'
import AddItem from './components/AddItem'
import Home from './components/Home'
import Header from './components/Header'

const App = () => (
  <div>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddItem} />
      </Switch>
    </div>
  </div>
)

export default App

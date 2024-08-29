import './App.css'

import {Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import JobsPage from './components/JobsPage'
import JobInfo from './components/JobInfo'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobInfo} />
  </Switch>
)

export default App

import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Signup from './components/Signup/Signup'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/signup' component={Signup}/>
    </Switch>
)


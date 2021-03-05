import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Signup from './components/Signup/Signup'
import Main from './components/Main/Main'
import Trips from './components/Trips/Trips'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/main' component={Main}/>
        <Route path='/trips' component={Trips}/>
    </Switch>
)


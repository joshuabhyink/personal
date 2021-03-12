import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Signup from './components/Signup/Signup'
import Main from './components/Main/Main'
import Trips from './components/Trips/Trips'
import EditTrip from './components/EditTrip/EditTrip'
import OilMiles from './components/OilMiles/OilMiles'
// import ShoppingMain from './components/ShoppingMain/ShoppingMain'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/main' component={Main}/>
        <Route path='/trips' component={Trips}/>
        <Route path='/edit/:trip_id' component={EditTrip}/>
        <Route path='/oilmiles' component={OilMiles}/>
        {/* <Route path='/shopping' component={ShoppingMain}/> */}
    </Switch>
)


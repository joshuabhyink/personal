import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setTrip} from '../../redux/tripReducer'

const Main = (props) => {
    const [date, setDate] = useState('')
    const [milesTraveled, setMiles] = useState('')
    const [outsideTemp, setTemp] = useState('')
    const [trip, setTrip] = useState([])



    return (
        <div>
            <div>
                <input></input>
            </div>
            <div>
                {/* {trip ? 
                } */}
            </div>
            <button onClick={() => props.history.push('/')}>Logout</button>
        </div>
    )

    
}

const mapStateToProps = (store) => {
    return store.tripReducer
}

export default connect(mapStateToProps, {setTrip})(Main)
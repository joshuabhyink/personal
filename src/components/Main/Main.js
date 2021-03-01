import {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {tripReducer} from '../../components/Main/Main'

const Main = (props) => {
    const [date, setDate] = useState('')
    const [milesTraveled, setMiles] = useState(0)
    const [outsideTemp, setTemp] = useState(0)

    
}
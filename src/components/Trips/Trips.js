    import axios from 'axios'
    import {useState} from 'react'
    import {connect} from 'react-redux'
    import {setTrip} from '../../redux/tripReducer'

    const Trip = (props) => {
        const [date, setDate] = useState('')
        const [milesTraveled, setMiles] = useState('')
        const [outsideTemp, setTemp] = useState('')
        const [message, setMessage] = useState('')
    
        const makeTrip = () => {
            setMessage('')
            if(!date || !milesTraveled || !outsideTemp){
                setMessage('Please fill out all fields before submitting!')
                return
            }
            axios.post('/api/trip', {date, milesTraveled, outsideTemp}).then(res => {
                console.log(res.data)
                props.setTrip(res.data)
                setDate('')
                setMiles('')
                setTemp('')
                props.history.push('/main')
            })
        }

        return (
            <div>
                {message}
                <input
                placeholder='Date...'
                value={date}
                onChange={(e) => setDate(e.target.value)}/>
                <input
                placeholder='# of Miles...'
                value={milesTraveled}
                onChange={(e) => setMiles(e.target.value)}/>
                <input
                placeholder='Outside Temperature...'
                value={outsideTemp}
                onChange={(e) => setTemp(e.target.value)}/>
                <button onClick={makeTrip}>Submit</button>
                <button onClick={() => props.history.push('/main')}>Go Back</button>
            </div>
        )

    }

const mapStateToProps = (store) => {
    return store.tripReducer
}

export default connect(mapStateToProps, {setTrip})(Trip)
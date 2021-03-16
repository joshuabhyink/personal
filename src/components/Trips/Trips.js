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
                // props.setTrip(res.data)
                setDate('')
                setMiles('')
                setTemp('')
                props.history.push('/main')
            })
        }

        return (
            <div>
                <div className='triptitle'>
                    <h2 className='magic'>This is where the magic happens! Add your trips here...</h2>
                    <button className='tripgoback' onClick={() => props.history.push('/main')}>Go Back</button>
                </div>
                <div className='tripmessage'>
                    {message}
                </div>
                <div className='tripinputs'>
                    <input
                    className='tripdate'
                    placeholder='Date...'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}/>
                    <input
                    className='tripmiles'
                    placeholder='# of Miles...'
                    value={milesTraveled}
                    onChange={(e) => setMiles(e.target.value)}/>
                    <input
                    className='triptemp'
                    placeholder='Outside Temperature...'
                    value={outsideTemp}
                    onChange={(e) => setTemp(e.target.value)}/>
                </div>
                <div className='tripsubmit'>
                    <button className='submitbtn' onClick={makeTrip}>Submit</button>
                </div>
            </div>
        )

    }

const mapStateToProps = (store) => {
    return store.tripReducer
}

export default connect(mapStateToProps, {setTrip})(Trip)
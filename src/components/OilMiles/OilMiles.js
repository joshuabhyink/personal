import {useState} from 'react'
import axios from 'axios'
import {setOil} from '../../redux/oilReducer'
import {connect} from 'react-redux'

const OilMiles = (props) => {
    const [oilMiles, setOilMiles] = useState('')
    const [editMiles, setEditMiles] = useState(false)



    const makeOil = (entryId) => {
        axios.post('/api/add-oil', {oilMiles, editMiles, entryId}).then(res => {
            if(entryId){
                setEditMiles(true)
            }
            console.log(res.data)
            props.setOil(res.data)
            setOilMiles('')
            props.history.push('/main')
        })
    }



    return (
        <div>
            <input
            placeholder='Enter Oil Miles...'
            value={oilMiles}
            onChange={(e) => setOilMiles(e.target.value)}/>
            <button onClick={() => makeOil()}>Enter</button>
            <button onClick={() => props.history.push('/main')}>Go Back</button>
        </div> 
    )
}

const mapStateToProps = (store) => {
    return store.oilReducer
}

export default connect(mapStateToProps, {setOil})(OilMiles) 
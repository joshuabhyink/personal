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
            <div className='oilheader'>
                <h2 className='oiltitle'>Enter Your Oil Mileage For This Oil Change!</h2>
                <button className='goback' onClick={() => props.history.push('/main')}>Go Back!</button>
            </div>
            {/* <div className='blurb'>
                <h4>    So you just changed your vehicle's oil? Nice! Log how many miles your new oil is rated for, then
                    add trips on the next page to track when you should change your oil again!
                </h4>
            </div> */}
            <div className='oilbody'>
                <input
                className='oilinput'
                placeholder='Enter Oil Miles...'
                value={oilMiles}
                onChange={(e) => setOilMiles(e.target.value)}/>
                <button className='oilenter' onClick={() => makeOil()}>Enter</button>
            </div>
        </div> 
    )
}

const mapStateToProps = (store) => {
    return store.oilReducer
}

export default connect(mapStateToProps, {setOil})(OilMiles) 
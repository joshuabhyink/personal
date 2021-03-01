const initialState = {
    trip: {
        date: '',
        miles_traveled: 0,
        outside_temp: 0
    }
}

const SET_TRIP = "SET_TRIP"

export function setTrip(payload){
    return {
        type: SET_TRIP,
        payload
    }
}

export default function tripReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_TRIP:
            return {...state, trip: payload}
        default:
            return state
    }
}
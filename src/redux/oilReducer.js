const initialState = {
    oil: 7500
}

const SET_OIL = 'SET_OIL'

export function setOil(payload){
    return {
        type: SET_OIL,
        payload
    }
}

export default function oilReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_OIL:
            return {...state, oil: payload}
        default:
            return state
    }
}
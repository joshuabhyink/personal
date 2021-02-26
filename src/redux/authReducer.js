const initialState = {
    user: {
        email: '',
        username: '',
        password: ''
    }
}

const SET_USER = 'SET_USER'

export function setUser(payload){
    return {
        type: SET_USER,
        payload
    }
}

export default function authReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_USER:
            return {...state, user: payload}
        default:
            return state
    }
}
import {
    ADD_CHECKOUT,
    CLEAR_CHECKOUT
} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
        case ADD_CHECKOUT:
            return {...state, addCheckout: action.payload}
        case CLEAR_CHECKOUT:
            return {...state, addCheckout: action.payload}
        default:
            return state;
    }
}
import {
    GET_PRODUCTS,
    ADD_PRODUCTS,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
        case CLEAR_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload}
        case GET_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload}
        case CLEAR_PRODUCT:
            return {...state, addProduct: action.payload}
        case ADD_PRODUCTS:
            return {...state, addProduct: action.payload}
        case GET_PRODUCTS:
            return {...state, prod: action.payload}
        default:
            return state;
    }
}
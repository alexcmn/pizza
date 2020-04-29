import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    UPDATE_USER_INFO_DATA,
    CLEAR_UPDATE_USER_INFO_DATA,
    INCREASE_CART_ITEM,
    DECREASE_CART_ITEM
} from '../actions/types';

export default function(state={}, action){
    switch(action.type){
        case DECREASE_CART_ITEM:
            return {...state, userData:{
                ...state.userData,
                cart: action.payload
            }}
        case INCREASE_CART_ITEM:
            return {...state, userData:{
                ...state.userData,
                cart: action.payload
            }}
        case CLEAR_UPDATE_USER_INFO_DATA:
            return { ...state, updateUser: action.payload}
        case UPDATE_USER_INFO_DATA:
            return {...state, updateUser: action.payload}
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                successBuy: action.payload.success,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            }
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case GET_CART_ITEMS_USER:
            return {...state, cartDetail: action.payload}
        case ADD_TO_CART_USER:
            return {...state, userData:{
                ...state.userData,
                cart: action.payload
            }}
        case LOGOUT_USER:
            return {...state}
        case AUTH_USER:
            return {...state, userData: action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        default:
            return state;
    }
}
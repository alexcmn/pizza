import axios from 'axios';

import {
    ADD_CHECKOUT,
    CLEAR_CHECKOUT
} from './types';

import { CHECKOUT_SERVER } from '../components/utils/misc';

export function addCheckout(dataToSubmit){
    const request = axios.post(`${CHECKOUT_SERVER}/checkout`, dataToSubmit)
    .then(response=>response.data)

    return{
        type: ADD_CHECKOUT,
        payload: request
    }
}

export function clearCheckout(){
    return{
        type: CLEAR_CHECKOUT,
        payload: ''
    }
}

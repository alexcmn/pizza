import axios from 'axios';

import {
    GET_PRODUCTS,
    ADD_PRODUCTS,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProducts(){
    const request = axios.get(`${PRODUCT_SERVER}/article`)
    .then(response=>response.data)

    return{
        type: GET_PRODUCTS,
        payload: request
    }
}

export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response=>response.data)

    return{
        type: ADD_PRODUCTS,
        payload: request
    }
}

export function clearProduct(){
    return{
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function getProductDetail(id){
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return{
        type: GET_PRODUCT_DETAIL,
        payload: request
    }
}

export function clearProductDetail(){
    return{
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}

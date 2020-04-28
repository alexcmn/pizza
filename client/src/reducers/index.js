import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './product_reducer'; 
import payement from './payement_reducer';

const rootReducer = combineReducers({
    user,
    products,
    payement
})

export default rootReducer;
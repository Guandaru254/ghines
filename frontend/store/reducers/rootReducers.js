import {combineReducers} from 'redux'
import productReducer from "./products";
import {wishListReducer} from "./wishList";
import compareListReducer from "./compare";


const rootReducer = combineReducers({
    data: productReducer,
    wishList: wishListReducer,
    compareList: compareListReducer
});

export default rootReducer;
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import table from './table'


export default combineReducers({
    routing: routerReducer,
    table
})
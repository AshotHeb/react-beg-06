import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import types from './actionTypes';
import todoReducer from './reducers/todoReducer';
import globalReducer from './reducers/globalReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import contactReducer from './reducers/contactReducer';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer,
    sinlgeTaskState: singleTaskReducer,
    contactState: contactReducer,
    searchState: searchReducer
});
const store = createStore(reducer, applyMiddleware(thunk));
window.store = store;
export default store;


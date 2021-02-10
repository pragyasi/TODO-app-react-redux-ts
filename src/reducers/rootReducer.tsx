
import {combineReducers} from 'redux'
import LandingPageReducer from './LandingPageReducer'
import TodoList from '../reducers/TodoListREducer'

const rootReducer = combineReducers({
  LandingPage : LandingPageReducer,
  TodoList : TodoList
});
export default rootReducer
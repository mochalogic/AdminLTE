import { combineReducers } from 'redux';
import componentType from './componentType'

export default combineReducers({
  componentType: componentType.reducer
})

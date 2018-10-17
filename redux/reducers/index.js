import { combineReducers } from 'redux';
import app from './app'
import componentType from './componentType'

export {
  app,
  componentType,
}

export default combineReducers({
  app: app.reducer,
  componentType: componentType.reducer,
})

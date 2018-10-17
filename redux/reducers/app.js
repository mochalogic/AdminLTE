import { bindActionCreators } from 'redux'
import moment from 'moment'

const name = 'app'

const actionTypes = {
  INIT:             `${name}:INIT`,
  LOADED:           `${name}:LOADED`,
}

export const actions = {
  init:           payload => dispatch => dispatch({payload, dispatch, type: actionTypes.INIT}),
}

export const dispatchs = dispatch => {
  return {
    init:     bindActionCreators(actions.init, dispatch),
  }
}

export const initialState = {
  initialized: false,
  loaded: false,
}

export const reducer = (state = initialState, action) => {
  const {dispatch} = action

  if (action.type.startsWith(name)) console.log(action.type, {action, state});

  switch (action.type) {
    case actionTypes.INIT:
      if (state.initialized) return state
      console.log('componentType:INIT', {action, state});

      return {...state, ...localStorageRepo(name), initialized: true}
    case actionTypes.LOADED:
      if (state.initialized) return state
      console.log('componentType:INIT', {action, state});

      return {...state, ...localStorageRepo(name), initialized: true}





    case actionTypes.ERROR:
      console.log('componentType:ERROR', {action, state});
      return {...state}
  }

  return state
}

export default {
  name,
  reducer,
  dispatchs,
}

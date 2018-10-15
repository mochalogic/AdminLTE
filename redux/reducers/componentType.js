import { bindActionCreators } from 'redux'

import axios from 'axios'

const entity = 'componentType'

export const actionTypes = {
  SELECT: 'SELECT',

  ALL: 'ALL',
  ALL_RESPONSE: 'ALL_RESPONSE',
  // READ: 'READ',
  // QUERY: 'QUERY',
  // CREATE: 'CREATE',
  // UPDATE: 'UPDATE',
  // DELETE: 'DELETE',
}

//NOTE: These actions should not call AXIOS, the reducer should! This should only dispatch actions

export const actions = {
  select: selected => dispatch => {
    dispatch({
      type: actionTypes.SELECT,
      selected: selected
    })
  },
  all: () => dispatch => axios
    .get(`/api/${entity}`)
    .then(response => {
      console.log({response})
      dispatch(actions.allResponse(response.data))
    })
    .catch(err => {
      console.log({f: 'componentType.reducers.all', err});
    }),
  allResponse: data => {
      return {
        type: actionTypes.ALL_RESPONSE,
        data: data
      }
    },
  // create: entity => dispatch => axios
  // update: entity => dispatch => axios
  delete: componentType => dispatch => new Promise((resolve, reject) => {
    if (!componentType.id) reject('ID Missing')
    resolve(componentType.id)
  }).then(id => {
    return axios.delete(`/api/componentType/${id}`)
  }).then(response => {
    actions.all()(dispatch)
  })


}

export const initialState = {
  selected: {},
  rows: []
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
      case actionTypes.SELECT:
        console.log({f: 'ctReducer.SELECT', action});
        return {...state, selected: action.selected}
      case actionTypes.ALL:

        break;
      case actionTypes.ALL_RESPONSE:
        return {...state, rows: action.data}
    }

    return state
  }


export const actionDispatchs = dispatch => {
  return {
    all: bindActionCreators(actions.all, dispatch),
    select: bindActionCreators(actions.select, dispatch),
    delete: bindActionCreators(actions.delete, dispatch)
  }
}

export default {
  reducer,
  actionDispatchs
}

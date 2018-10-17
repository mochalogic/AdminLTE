import { bindActionCreators } from 'redux'
import axios from 'axios'
import moment from 'moment'

const name = 'componentType'
const pkey = 'id'
const isEqual = (left, right) => JSON.stringify(left) === JSON.stringify(right)

const axiosRepo = action => {
  return {
    read: (id)        => axios.get(`/api/${name}/${id}`)
      .then(response  => dispatch(actions.readResponse(response)))
      .catch(error    => dispatch(actions.error(error))),
    list: ()          => axios.get(`/api/${name}`)
      .then(response  => action.dispatch(actions.listResponse(response)))
      .catch(error    => action.dispatch(actions.error(error))),
    query: (query)    => axios.get(`/api/${name}`)
      .then(response  => dispatch(actions.queryResponse(response)))
      .catch(error    => dispatch(actions.error(error))),
    create: (entity)  => axios.post(`/api/${name}`, entity)
      .then(response  => dispatch(actions.createResponse(response)))
      .catch(error    => dispatch(actions.error(error))),
    update: (entity)  => axios.put(`/api/${name}/${id}`, entity)
      .then(response  => dispatch(actions.updateResponse(response)))
      .catch(error    => dispatch(actions.error(error))),
    delete: (id)      => axios.delete(`/api/${name}/${id}`)
      .then(response  => dispatch(actions.deleteResponse(response)))
      .catch(error    => dispatch(actions.error(error))),
  }
}

const localStorageRepo = (key, value = undefined) => value ? localStorage.setItem(key, JSON.stringify(value)) : JSON.parse(localStorage.getItem(key))

const actionTypes = {
  INIT:             `${name}:INIT`,
  SYNC:             `${name}:SYNC`,
  CLEAR:            `${name}:CLEAR`,
  ERROR:            `${name}:ERROR`,

  ACTIVE:           `${name}:ACTIVE`,
  SELECT:           `${name}:SELECT`,

  NEW:              `${name}:NEW`,
  COPY:             `${name}:COPY`,
  EDIT:             `${name}:EDIT`,
  SAVE:             `${name}:SAVE`,
  CANCEL:           `${name}:CANCEL`,
  REMOVE:           `${name}:REMOVE`,

  //CRUD
  READ:             `${name}:READ`,
  READ_RESPONSE:    `${name}:READ_RESPONSE`,
  LIST:             `${name}:LIST`,
  LIST_RESPONSE:    `${name}:LIST_RESPONSE`,
  QUERY:            `${name}:QUERY`,
  QUERY_RESPONSE:   `${name}:QUERY_RESPONSE`,
  CREATE:           `${name}:CREATE`,
  CREATE_RESPONSE:  `${name}:CREATE_RESPONSE`,
  UPDATE:           `${name}:UPDATE`,
  UPDATE_RESPONSE:  `${name}:UPDATE_RESPONSE`,
  DELETE:           `${name}:DELETE`,
  DELETE_RESPONSE:  `${name}:DELETE_RESPONSE`,
}

const actions = {
  init:           payload => dispatch => dispatch({payload, type: actionTypes.INIT}),
  sync:           payload => dispatch => dispatch({payload, type: actionTypes.SYNC}),
  clear:          payload => dispatch => dispatch({payload, type: actionTypes.CLEAR}),
  error:          payload => dispatch => dispatch({payload, type: actionTypes.ERROR}),

  active:         payload => dispatch => dispatch({payload, type: actionTypes.ACTIVE}),
  select:         payload => dispatch => dispatch({payload, type: actionTypes.SELECT}),

  new:            payload => dispatch => dispatch({payload, type: actionTypes.NEW}),
  copy:           payload => dispatch => dispatch({payload, type: actionTypes.COPY}),
  edit:           payload => dispatch => dispatch({payload, type: actionTypes.EDIT}),
  save:           payload => dispatch => dispatch({payload, type: actionTypes.SAVE}),
  cancel:         payload => dispatch => dispatch({payload, type: actionTypes.CANCEL}),
  remove:         payload => dispatch => dispatch({payload, type: actionTypes.REMOVE}),

  read:           payload => dispatch => dispatch({payload, type: actionTypes.READ}),
  readResponse:   payload => dispatch => dispatch({payload, type: actionTypes.READ_RESPONSE}),
  list:           payload => dispatch => dispatch({payload, type: actionTypes.LIST}),
  listResponse:   payload => dispatch => dispatch({payload, type: actionTypes.LIST_RESPONSE}),
  query:          payload => dispatch => dispatch({payload, type: actionTypes.QUERY}),
  queryResponse:  payload => dispatch => dispatch({payload, type: actionTypes.QUERY_RESPONSE}),
  create:         payload => dispatch => dispatch({payload, type: actionTypes.CREATE}),
  createResponse: payload => dispatch => dispatch({payload, type: actionTypes.CREATE_RESPONSE}),
  update:         payload => dispatch => dispatch({payload, type: actionTypes.UPDATE}),
  updateResponse: payload => dispatch => dispatch({payload, type: actionTypes.UPDATE_RESPONSE}),
  delete:         payload => dispatch => dispatch({payload, type: actionTypes.DELETE}),
  deleteResponse: payload => dispatch => dispatch({payload, type: actionTypes.DELETE_RESPONSE}),
}

const dispatchs = dispatch => {
  return {
    init:     bindActionCreators(actions.init, dispatch),
    sync:     bindActionCreators(actions.sync, dispatch),
    clear:    bindActionCreators(actions.clear, dispatch),
    error:    bindActionCreators(actions.error, dispatch),

    active:   bindActionCreators(actions.active, dispatch),
    select:   bindActionCreators(actions.select, dispatch),

    new:      bindActionCreators(actions.new, dispatch),
    copy:     bindActionCreators(actions.copy, dispatch),
    edit:     bindActionCreators(actions.edit, dispatch),
    save:     bindActionCreators(actions.save, dispatch),
    cancel:   bindActionCreators(actions.cancel, dispatch),
    remove:   bindActionCreators(actions.remove, dispatch),

    read:     bindActionCreators(actions.read, dispatch),
    list:     bindActionCreators(actions.list, dispatch),
    query:    bindActionCreators(actions.query, dispatch),
    // create:   bindActionCreators(actions.create, dispatch),
    // update:   bindActionCreators(actions.update, dispatch),
    // delete:   bindActionCreators(actions.delete, dispatch),
  }
}

const initialState = {
  active: null,
  autoSave: false,
  readonly: false,
  muons: {},

  // filters: [],
  // orders: [],
  // filtered: [],
  initialized: false,
}

const muonCreate = (id, initial) => {
  return {
    id,
    initial,

    current: {...initial},

    isSelected: false,
    isDirty: false,
    isSynced: false,
    isBusy: false,

    isNew: false,
    isDeleted: false,

    onFetched: moment.now(),
    // onCreated:
    // onUpdated:
    // onDeleted:
    onSynced: null,
  }
}

const reducer = (state = initialState, action) => {
  if (action.type.startsWith(name)) console.log(action.type, {action, state});

  switch (action.type) {
    case actionTypes.INIT: {
      if (state.initialized) return state
      return {...state, ...localStorageRepo(name), initialized: true}
    }
    case actionTypes.SYNC: {
      localStorageRepo(name, state)
      return {...state}
    }
    case actionTypes.CLEAR: {
      action.dispatch(actions.sync())
      return {...initialState}
    }
    case actionTypes.ERROR: {
      return {...state}
    }

    case actionTypes.ACTIVE: {
      const id = action.payload && action.payload.id || null
      action.dispatch(actions.sync())

      // const muons = {...state.muons}
      // if (state.active == 'NEW') {
      //   delete muons[state.active]
      // }
      // return {...state, muons, active: id}

      return {...state, active: id}
    }
    case actionTypes.SELECT: {
      const id = action.payload.id

      const muons = {...state.muons}

      muons[id].isSelected = !muons[id].isSelected

      action.dispatch(actions.sync())

      return {...state, muons}
    }

    case actionTypes.NEW: {
      //TODO: Pull in model for NEW template

      const muon = muonCreate('NEW', {
        id: 'NEW',
        name: null,
        category: null,
        version: null,
        createdAt: null,
        updatedAt: null,
      })
      muon.isNew = true
      muon.isDirty = !isEqual(muon.current, muon.initial)

      const muons = {...state.muons, NEW: muon }

      action.dispatch(actions.active(muon))
      action.dispatch(actions.sync())

      return {...state, muons}
    }
    case actionTypes.COPY: {
      return {...state}
    }
    case actionTypes.EDIT: {
      if (!state.active) return state

      const {column, value} = action.payload

      const muon = {...state.muons[state.active]}
      muon.current = {...muon.current, [column]: value}
      muon.isDirty = !isEqual(muon.current, muon.initial)
      const muons = {...state.muons, [muon.id]: muon}

      action.dispatch(actions.sync())

      return {...state, muons}
    }
    case actionTypes.SAVE: {
      return {...state}
    }
    case actionTypes.CANCEL: {
      if (!state.active) return state

      const muons = {...state.muons}
      if (state.active == 'NEW') {
        delete muons[state.active]
      } else {
        const muon = {...state.muons[state.active]}
        muon.current = {...muon.initial}
        muon.isDirty = !isEqual(muon.current, muon.initial)
        muons[muon.id] = muon
      }

      action.dispatch(actions.active())
      action.dispatch(actions.sync())

      return {...state, muons}
    }
    case actionTypes.REMOVE: {
      return {...state}
    }



    case actionTypes.READ: {
      return {...state}
    }
    case actionTypes.READ_RESPONSE: {
      return {...state}
    }
    case actionTypes.LIST: {
      axiosRepo(action).list()

      return {...state}
    }
    case actionTypes.LIST_RESPONSE: {
      const muons = action.payload.data.reduce(
        (muons, entity) => {
          const id = entity[pkey]

          const muonCurrent = muons[id]

          if (!muonCurrent) {
            muons[id] = muonCreate(id, entity)
          } else {
            muonCurrent.initial = entity
            muonCurrent.isDirty = !isEqual(muonCurrent.current, muonCurrent.initial)
          }

          return muons
        },
        state.muons
      )

      action.dispatch(actions.sync())

      return {...state, rows: action.payload.data, muons}
    }

    case actionTypes.QUERY: {
      return {...state}
    }
    case actionTypes.QUERY_RESPONSE: {
      return {...state}
    }
    case actionTypes.CREATE: {
      return {...state}
    }
    case actionTypes.CREATE_RESPONSE: {
      return {...state}
    }
    case actionTypes.UPDATE: {
      return {...state}
    }
    case actionTypes.UPDATE_RESPONSE: {
      return {...state}
    }
    case actionTypes.DELETE: {
      return {...state}
    }
    case actionTypes.DELETE_RESPONSE: {
      return {...state}
    }
  }

  return state
}

export default {
  name,
  reducer,
  dispatchs,
}

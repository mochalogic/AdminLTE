import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'




const asyncDispatchMiddleware = store => next => action => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach(a => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function dispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { dispatch });

  const res = next(actionWithAsyncDispatch);

  syncActivityFinished = true;

  flushQueue();

  return res
};






const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, asyncDispatchMiddleware)))
// const d = store.dispatch({type: 'EricINIT'})
// console.log({f:'store', store, d});

export const initStore = (initialState) => store

// export const initStore = (initialState = exampleInitialState) => {
//   return createStore(combined, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
// }

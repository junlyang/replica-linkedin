import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware, {Task}  from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers'
import rootSaga from '../sagas';

const configureStore = (() => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );
  const store = createStore(reducer,enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store
  })

const wrapper = createWrapper(configureStore, {
    debug: false
})

export default wrapper;  

import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers'

const configureStore = (() => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
    );
    const store = createStore(reducer,enhancer);
    return store
  })

const wrapper = createWrapper(configureStore, {
    debug: false
})

export default wrapper;  

import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, applyMiddleware, compose} from 'redux'
import { createStore,applyMiddleware } from './woniu-redux';
import thunk from './woniu-redux-thunk';
import arrThunk from './woniu-redux-array';
import { counter } from './index.redux'
import { Provider } from './woniu-react-redux';
import App from './App'
// import Demo from './demo';
// import './01.learn.redux.js';
// import Page from './context.demo'
// ReactDOM.render(<Demo></Demo>, document.getElementById('root'))
// ReactDOM.render(<Page></Page>, document.getElementById('root'))

// const store = createStore(counter, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ))
const store = createStore(counter, applyMiddleware(thunk, arrThunk))
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'))

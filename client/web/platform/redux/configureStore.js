import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import rootReducer from './reducers'
import rootSaga from './saga'

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const persistConfig = { key: 'session', storage: sessionStorage }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  persistStore(store)
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore

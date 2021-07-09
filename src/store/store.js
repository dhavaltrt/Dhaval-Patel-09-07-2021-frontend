import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

import { createLogger } from 'redux-logger';

const logger = createLogger({
    level: 'info',
    collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

let middlewares;

if (process.env.NODE_ENV === 'development') {
    middlewares = [sagaMiddleware, logger];    
} else {
    middlewares = [sagaMiddleware];
}

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middlewares)
        )
    );

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

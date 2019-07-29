import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import mainReducer from './reducers';

const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    return createStore(
        mainReducer,
        applyMiddleware(...middlewares));

};

export default configureStore;

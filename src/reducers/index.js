import { combineReducers } from 'redux';
import notesReducer from './notes';

const mainReducer = combineReducers({
    notes: notesReducer,
});

export default mainReducer;
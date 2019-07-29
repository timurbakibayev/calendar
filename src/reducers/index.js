import { combineReducers } from 'redux';
import notesReducer from './notes';
import noteReducer from './note';

const mainReducer = combineReducers({
    notes: notesReducer,
    note: noteReducer,
});

export default mainReducer;
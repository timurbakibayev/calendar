import {combineReducers} from 'redux';
import * as actions from '../actionTypes';
import defaultNotes from '../defaultNotes';

const notesListReducer = (state = defaultNotes, action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_SAVED:
            return [...state.filter((note)=>note.id !== action.data.id), {
                "id": action.data.id,
                "description": action.data.description,
                "time": action.data.time,
                "date": action.data.date,
                "color": action.data.color,
            }];
        case actions.ACTION_NOTE_DELETED:
            return [...state.filter((note)=>note.id !== action.data.id)];
        case actions.ACTION_NOTE_ADDED:
            return [...state, {
                "id": action.data.id,
                "description": action.data.description,
                "time": action.data.time,
                "date": action.data.date,
                "color": action.data.color,
            }];
        case actions.ACTION_NOTES_LOADED:
            return action.data;
        case actions.ACTION_NOTE_LOADED:
            var newState = [action.data];
            var oldStateUnchanged = [];
            state.forEach(note => {
                var isThere = newState.filter((item) => (item.id === note.id));
                if (isThere.length === 0) {
                    oldStateUnchanged.push(note)
                }
            });
            return oldStateUnchanged.concat(newState);
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NOTES_STARTED_LOADING:
            return true;
        case actions.ACTION_NOTES_LOADED:
        case actions.ACTION_NOTES_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const loadedReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NOTES_STARTED_LOADING:
        case actions.ACTION_NOTES_FAILED_TO_LOAD:
            return false;
        case actions.ACTION_NOTES_LOADED:
            return true;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_NOTES_FAILED_TO_LOAD:
            return action.data;
        case actions.ACTION_NOTES_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const submittingReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_NEW_CREATING:
            return true;
        case actions.ACTION_NOTE_NEW_FAILED:
        case actions.ACTION_NOTE_NEW_CREATED:
            return false;
        default:
            return state;
    }
};

const currentNoteIdReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_NEW_CREATING:
            return "";
        case actions.ACTION_NOTE_NEW_FAILED:
            return "";
        case actions.ACTION_NOTE_NEW_CREATED:
            return action.data.id;
        default:
            return state;
    }
};

const notesReducer = combineReducers({
    list: notesListReducer,
    loaded: loadedReducer,
    isLoading: isLoadingReducer,
    errorMessage: errorMessageReducer,
    submitting: submittingReducer,
    currentNoteId: currentNoteIdReducer,
});

export default notesReducer;
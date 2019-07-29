import { combineReducers } from 'redux';
import * as actions from '../actionTypes';

const noteDetailsReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_LOADED:
            return action.data;
        default:
            return state;
    }
};

const noteIdReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_STARTED_LOADING:
            return action.data;
        case actions.ACTION_NOTE_LOADED:
            return action.noteId;
        default:
            return state;
    }
};

const savedNoteReducer = (state = [  ], action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_SAVING:
        case actions.ACTION_NOTE_FAILED_TO_SAVE:
            return {};
        case actions.ACTION_NOTE_SAVED:
            return action.data;
        default:
            return state;
    }
};

const isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_STARTED_LOADING:
            return true;
        case actions.ACTION_NOTE_LOADED:
        case actions.ACTION_NOTE_FAILED_TO_LOAD:
            return false;
        default:
            return state;
    }
};

const isSavingReducer = (state = false, action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_SAVING:
            return true;
        case actions.ACTION_NOTE_SAVED:
        case actions.ACTION_NOTE_FAILED_TO_SAVE:
            return false;
        default:
            return state;
    }
};

const errorMessageReducer = (state = "", action) => {
    switch (action.type) {
        case actions.ACTION_NOTE_FAILED_TO_LOAD:
        case actions.ACTION_NOTE_FAILED_TO_SAVE:
            return action.data;
        case actions.ACTION_NOTE_STARTED_LOADING:
            return "";
        default:
            return state;
    }
};

const noteReducer = combineReducers({
    details: noteDetailsReducer,
    noteId: noteIdReducer,
    savedNote: savedNoteReducer,
    isLoading: isLoadingReducer,
    isSaving: isSavingReducer,
    errorMessage: errorMessageReducer,
});

export default noteReducer;
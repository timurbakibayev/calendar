import * as actionTypes from '../actionTypes';
import * as api from '../api/noteApi';

export const refreshNote = (noteId) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ACTION_NOTE_STARTED_LOADING,
        data: noteId,
    });

    try {
        const response = await api.loadNote(noteId);
        const text = await response.text();
        console.log("Note: trying to parse a note...", response);
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_NOTE_LOADED,
                noteId: noteId,
                data: JSON.parse(text),
            });
        } else {
            dispatch({
                type: actionTypes.ACTION_NOTE_FAILED_TO_LOAD,
                data: JSON.parse(text)
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_NOTE_FAILED_TO_LOAD);
        dispatch({
            type: actionTypes.ACTION_NOTE_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};

export const saveNote = (params) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.ACTION_NOTE_SAVED,
        data: params,
    });

    return Promise.resolve();
};

export const addNote = (params) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.ACTION_NOTE_ADDED,
        data: params,
    });

    return Promise.resolve();
};

export const deleteNote = (params) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.ACTION_NOTE_DELETED,
        data: params,
    });

    return Promise.resolve();
};
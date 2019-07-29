import * as actionTypes from '../actionTypes';
import * as api from '../api/notesApi';

export const refreshNotes = () => async (dispatch, getState) => {
    if (getState().notes.isLoading) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_NOTES_STARTED_LOADING
    });

    try {
        const response = await api.loadNotes();
        const text = await response.text();
        if (response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_NOTES_LOADED,
                data: JSON.parse(text)
            });
        } else {
            console.log("actions/notes error", JSON.parse(text));
            dispatch({
                type: actionTypes.ACTION_NOTES_FAILED_TO_LOAD,
                data: JSON.parse(text),
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ACTION_NOTES_FAILED_TO_LOAD,
            data: error.message
        });
    }

    return Promise.resolve();
};

export const newNote = (note) => async (dispatch, getState) => {
    if (getState().notes.creating) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_NOTE_NEW_CREATING
    });

    try {
        const response = await api.newNote(note);
        const text = await response.text();
        if (response.status === 201) {
            dispatch({
                type: actionTypes.ACTION_NOTE_NEW_CREATED,
                data: JSON.parse(text)
            });
        } else {
            dispatch({
                type: actionTypes.ACTION_NOTE_NEW_FAILED,
                data: JSON.parse(text)
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ACTION_NOTE_NEW_FAILED,
            data: error.message
        });
    }

    return Promise.resolve();
};
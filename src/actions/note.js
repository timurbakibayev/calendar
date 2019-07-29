import * as actionTypes from '../actionTypes';
import * as api from '../api/noteApi';

//TODO: If one note is loaded, it skips loading notes :(

export const refreshNote = (noteId) => async (dispatch, getState) => {
    if (getState().note.isLoading) {
        return Promise.resolve();
    }

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
    if (getState().note.isSaving) {
        return Promise.resolve();
    }

    dispatch({
        type: actionTypes.ACTION_NOTE_SAVING
    });

    try {
        const response = await api.saveNote(params);
        const text = await response.text();
        console.log("Note: trying to parse saved note...", response);
        if (response.status === 201 || response.status === 200) {
            dispatch({
                type: actionTypes.ACTION_NOTE_SAVED,
                data: JSON.parse(text)
            });
        } else {
            dispatch({
                type: actionTypes.ACTION_NOTE_FAILED_TO_SAVE,
                data: JSON.parse(text)
            })
        }
    } catch (error) {
        console.log(actionTypes.ACTION_NOTE_FAILED_TO_SAVE);
        dispatch({
            type: actionTypes.ACTION_NOTE_FAILED_TO_SAVE,
            data: error.message
        });
    }

    return Promise.resolve();
};
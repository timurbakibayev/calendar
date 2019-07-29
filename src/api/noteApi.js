import {URL} from './url'

export const loadNote = (noteId) => {
    return fetch(
        `${URL}api/notes/${noteId}/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    )
};

export const saveNote = (params) => {
    if (params.id >= 0)
        return fetch(
            `${URL}api/notes/${params.id}/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
        )
};
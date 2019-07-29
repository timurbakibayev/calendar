import { URL } from './url'
export const loadNotes = () => {
    return fetch(
        `${URL}api/notes/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    )
};

export const newNote = (note) => {
    return fetch(
        `${URL}api/notes/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        }
    )
};
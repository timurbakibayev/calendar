import React, {Component} from 'react';
import * as actionsNotes from '../actions/notes'
import * as actionsNote from '../actions/note'
import {connect} from 'react-redux';
import Note from './Note';

class _MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    renderNote(note) {
        return (
            <Note key={note.id} {...note} />
        )
    }

    componentWillMount() {
        // this.props.refreshNotes();
    }

    render() {
        document.title = "Yet another calendar";
        console.log("Main.js props", this.props);
        return (
            <div>
                {this.props.notes.map(this.renderNote.bind(this))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes.list,
});

const mapDispatchToProps = {
    refreshNotes: actionsNotes.refreshNotes,
    newNote: actionsNotes.newNote,
    refreshNote: actionsNote.refreshNote,
    saveNote: actionsNote.saveNote,
};

const MainComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_MainComponent);

export default MainComponent;

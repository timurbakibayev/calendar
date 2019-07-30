import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './../general.css'
import * as actionsNote from "../actions/note";
import {connect} from "react-redux";

class _NoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    };

    handleClose() {
        this.setState({open:false});
    }

    render() {
        return (
            <div className="NoteCard" style={{fontWeight: this.props.emph ? "bolder" : "normal"}} onClick={(e) => {
                e.stopPropagation();
                if (this.state.open === false) {
                    this.setState({
                        open: true,
                        description: this.props.description,
                        id: this.props.id,
                        time: this.props.time,
                        date: this.props.date,
                        color: this.props.color,
                    });
                }
            }}>
                <div className="NoteCircle" style={{backgroundColor: this.props.color}}></div>
                <div className="NoteTime">{this.props.time.substr(0, 5)}</div>
                <div className="NoteDescription">{this.props.description}</div>
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent onKeyUp={(e)=> {
                        if (e.keyCode === 13) {
                            this.props.saveNote(this.state);
                            this.setState({open: false});
                        }
                    }}>
                        <DialogContentText>
                            To edit this note, please enter the new description and time here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            value={this.state.description}
                            onChange={(e)=>{this.setState({description: e.target.value})}}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Time"
                            type="text"
                            fullWidth
                            value={this.state.time}
                            onChange={(e)=>{this.setState({time: e.target.value})}}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Color"
                            type="text"
                            fullWidth
                            value={this.state.color}
                            onChange={(e)=>{this.setState({color: e.target.value})}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.setState({open:false}); }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>{
                            this.props.deleteNote(this.state);
                            this.setState({open: false});
                        }} color="primary">
                            Delete
                        </Button>
                        <Button onClick={()=>{
                            this.props.saveNote(this.state);
                            this.setState({open: false});
                        }} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes.list,
});

const mapDispatchToProps = {
    saveNote: actionsNote.saveNote,
    deleteNote: actionsNote.deleteNote,
};

const NoteComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_NoteComponent);

export default NoteComponent;

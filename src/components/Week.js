import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SomeIcon from 'material-ui-icons/DateRange';
import './../general.css'
import Note from "./Note";
import * as actionsNote from "../actions/note";
import {connect} from "react-redux";
import descriptions from "../descriptions";
import colors from "../colors";
import times from "../times";

class _WeekComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    };

    renderNote(note) {
        return (
            <Note key={note.id} {...note} />
        )
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        let year = new Date().getFullYear().toString();
        let month2 = (new Date().getMonth() + 1).toString().padStart(2, "0");
        let day2 = new Date().getDate().toString().padStart(2, "0");
        let today = `${year}-${month2}-${day2}`;
        return (
            <div className="Week">
                {this.props.week.days.map((day) =>
                    <div className="Day" key={day.id} onClick={(e) => {
                        e.stopPropagation();
                        if (this.state.open === false) {
                            if (day.date !== undefined) {
                                this.setState({
                                    open: true,
                                    description: "",
                                    id: Math.floor(Math.random() * 10000),
                                    time: "10:00",
                                    date: day.date.replace("-", "").replace("-", ""),
                                    color: "green",
                                });
                            }
                        }
                    }}>
                        <span className="DayNumber">{day.date === today && <SomeIcon color="green"/>}{day.day}</span>
                        <div className="Notes">
                            {day.notes.map(this.renderNote.bind(this))}
                        </div>
                    </div>
                )}

                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
                    <DialogContent onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            if (this.state.description.length > 0) {
                                this.props.addNote(this.state);
                                this.setState({open: false});
                            }
                        }
                    }}>
                        <DialogContentText>
                            To add a new note, please enter the description and time here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            value={this.state.description}
                            onChange={(e) => {
                                this.setState({description: e.target.value})
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Time"
                            type="text"
                            fullWidth
                            value={this.state.time}
                            onChange={(e) => {
                                this.setState({time: e.target.value})
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Color"
                            type="text"
                            fullWidth
                            value={this.state.color}
                            onChange={(e) => {
                                this.setState({color: e.target.value})
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false});
                        }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                "description": descriptions[Math.floor(Math.random() * descriptions.length)],
                                "time": times[Math.floor(Math.random() * times.length)],
                                "color": colors[Math.floor(Math.random() * colors.length)],
                            });
                        }} color="primary">
                            Random
                        </Button>
                        <Button disabled={this.state.description === undefined || this.state.description.length === 0} onClick={() => {
                            this.props.addNote(this.state);
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
    addNote: actionsNote.addNote,
};

const WeekComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WeekComponent);

export default WeekComponent;
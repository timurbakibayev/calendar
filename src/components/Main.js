import React, {Component} from 'react';
import * as actionsNotes from '../actions/notes'
import * as actionsNote from '../actions/note'
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui-icons/ChevronLeft';
import RightIcon from 'material-ui-icons/ChevronRight';
import Week from './Week';
import {generateWeeks} from '../calendar';
import './../general.css';

class _MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        };
    };

    clickToday() {
        this.setState( {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        });
    }

    clickLeft() {
        console.log(this.state);
        let year = this.state.year;
        let month = this.state.month;
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        this.setState({year, month})
    }

    clickRight() {
        console.log(this.state);
        let year = this.state.year;
        let month = this.state.month;
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        this.setState({year, month})
    }


    renderWeek(week) {
        return (
            <Week key={week.id} week={week}/>
        )
    }

    componentWillMount() {
        // this.props.refreshNotes();

    }

    render() {
        document.title = "Yet another calendar";
        console.log("Main.js props", this.props);

        const weekDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December"]

        const weeks = generateWeeks(this.props.notes, this.state.year, this.state.month);

        const currentYearMonth = `${monthNames[this.state.month]} ${this.state.year}`;

        return (
            <div className="Container">
                <div className="SelectionRow">
                    <IconButton onClick={this.clickLeft.bind(this)}><LeftIcon/></IconButton>
                    <div onClick={this.clickToday.bind(this)} className="MonthName"><span>{currentYearMonth}</span></div>
                    <IconButton onClick={this.clickRight.bind(this)}><RightIcon/></IconButton>
                </div>
                <div className="Month">
                    <div className="WeekHeader">
                        {weekDayNames.map((weekDayName) =>
                            <div className="Day" key={weekDayName}>{weekDayName}</div>
                        )}
                    </div>
                    {weeks.map(
                        this.renderWeek.bind(this)
                    )}
                </div>
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

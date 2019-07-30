import React, {Component} from 'react';
// import Card, {CardHeader, CardMedia} from 'material-ui/Card';
import SomeIcon from 'material-ui-icons/DateRange';
import './../general.css'
import Note from "./Note";

class WeekComponent extends Component {

    renderNote(note) {
        return (
            <Note key={note.id} {...note} />
        )
    }

    render() {
        let year = new Date().getFullYear().toString();
        let month2 = (new Date().getMonth() + 1).toString().padStart(2,"0");
        let day2 = new Date().getDate().toString().padStart(2,"0");
        let today = `${year}-${month2}-${day2}`;
        return (
            <div className="Week">
                {this.props.week.days.map((day) =>
                    <div className="Day" key={day.id} onClick={()=>{
                        alert(day.date);
                    }}>
                        <span className="DayNumber">{day.date === today && <SomeIcon/>}{day.day}</span>
                        <div className="Notes">
                            {day.notes.map(this.renderNote.bind(this))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default WeekComponent;
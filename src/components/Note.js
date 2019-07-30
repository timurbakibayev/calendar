import React, {Component} from 'react';
import './../general.css'

class NoteComponent extends Component {
    render() {
        return (
            <div className="NoteCard" style={{fontWeight: this.props.emph ? "bolder" : "normal"}} onClick={()=>{
                        alert(this.props.description);
                    }}>
                        <div className="NoteCircle" style={{backgroundColor: this.props.color}}> </div>
                        <div className="NoteTime">{this.props.time.substr(0,5)}</div>
                        <div className="NoteDescription">{this.props.description}</div>
            </div>
        );
    }
}

export default NoteComponent;
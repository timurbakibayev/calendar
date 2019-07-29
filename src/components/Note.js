import React, {Component} from 'react';
import Card, {CardHeader, CardMedia} from 'material-ui/Card';
import SomeIcon from 'material-ui-icons/Done';
import './../general.css'

class NoteComponent extends Component {
    render() {
        return (
            <Card className="NoteCard" style={{fontWeight: this.props.emph ? "bolder" : "normal"}}>
                <div className="details" style={{flex: 1}}>
                    {/*<CardMedia className="avatar"*/}
                    {/*           image={this.props.img_url}*/}
                    {/*/>*/}
                    <div style={{flex: 1}}>
                        <span>{this.props.description}, date: {this.props.date}, time: {this.props.time} </span>
                    </div>
                </div>
            </Card>
        );
    }
}

export default NoteComponent;
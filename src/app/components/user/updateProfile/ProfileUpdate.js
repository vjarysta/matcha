import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
// import {MyChip} from "./user/MyChip"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import {orange500, blue500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export class ProfileUpdate extends React.Component {

    constructor() {
        super();
        // this.setState({canSave: 'true'});
        this.state = {
            user: {},
            canSave: true
        };
    }

    componentWillMount() {
        var url = "http://46.101.198.52:3000/api/users/" + this.props.params.id;
        console.log(url);
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user
            })
        });
    }

    handleEnd() {
        var url = "http://46.101.198.52:3000/api/users/" + this.props.params.id;
        console.log(this.state);
        console.log(url);
        Request.put(url)
            .set('Content-Type', 'application/json')
            .send({ name: this.state.user.name })
            .send({ age: this.state.user.age })
            .send({ mail: this.state.user.mail })
            .send({ bio: this.state.user.bio })
            .end((response) => {
                console.log('inserted');
                console.log(response);
                // browserHistory.push("/home", "jdec");
            });
    }

    _handleTextFieldChange(e) {
        this.setState({
            user: update(this.state.user, {[e.target.name]: {$set: e.target.value}}),
            canSave: false
        });
    }

    render() {
        var name = this.state.user.name;
        var age = this.state.user.age;
        var bio = this.state.user.bio;
        var style = {color: 'red'};
        var like = <FontAwesome className="fa fa-heartbeat" name="" style={{color: 'red'}}/>;
        var mail = <FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>;
        var icon = <FontAwesome className='fa fa-mars' name=''/>;
        var text = <div>From Paris | interested in <FontAwesome className='fa fa-mars' name=''/></div>;
        var icontext = [text, icon];
        console.log(typeof icon);
        const styles = {
            errorStyle: {
                textAlign: "left",
            },
            underlineStyle: {
                borderColor: orange500,
            },
            floatingLabelStyle: {
                color: orange500,
            },
            floatingLabelFocusStyle: {
                color: blue500,
            },
        };
        return (
            <div className="">
                <div className="">
                    <div className="">
                            <TextField
                                floatingLabelText="Name"
                                name="name"
                                value={this.state.user.name}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                            <TextField
                                floatingLabelText="Age"
                                name="age"
                                value={this.state.user.age}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                            <TextField
                                floatingLabelText="Mail"
                                name="mail"
                                value={this.state.user.mail}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                        <br/>
                        <TextField
                            hintText="Hi, I like stamps and cactus..."
                            floatingLabelText="Tell us about you"
                            multiLine={true}
                            rows={2}
                            name="bio"
                            value={this.state.user.bio}
                            onChange={this._handleTextFieldChange.bind(this)}
                        />
                        <br/>
                        <RaisedButton
                            label="Save"
                            primary={true}
                            disabled={this.state.canSave}
                            id="mdrlol"
                            onTouchTap={() => this.handleEnd()}
                        />



                        <hr />
                        <p className="text-center"><small> ID: {this.props.params.id}</small></p>
                    </div>
                </div>
                <div className="row">
                    <Card>
                        <CardHeader
                        />
                        <CardMedia>
                            <img src="http://placekitten.com/800/250" alt=""/>
                        </CardMedia>
                        <CardActions style={{textAlign: 'center'}}>
                            <FlatButton label={like} />
                            <FlatButton label={<FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>} />
                        </CardActions>
                    </Card>
                </div>
                <br/>
                <div className="row">
                    <Card>
                        <CardText>
                            <h4>A few words</h4>

                        </CardText>
                    </Card>
                </div>
                <br />
                <div className="row">
                    <div className="">
                        <Card>
                            <CardText>
                            </CardText>
                        </Card>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="">
                        <Card>
                            <CardText>
                                <Table>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn>Height</TableRowColumn>
                                            <TableRowColumn>180 cm</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>Weight</TableRowColumn>
                                            <TableRowColumn>79 kg</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>Eyes</TableRowColumn>
                                            <TableRowColumn>Blue</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )
    };
}
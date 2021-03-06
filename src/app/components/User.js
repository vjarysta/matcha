import React from "react";
import { browserHistory } from "react-router";
import Request from "superagent";
import _ from "lodash";
import {Link} from "react-router";

export class User extends React.Component {

    constructor() {
        super();
        this.state = {};
        // this.state.users = [];
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users";
        Request.get(url).then((response) => {
            this.setState({
                users: response.body.users
            });
            // console.log(this.state.users);
            // console.log(jrigole);
        });
        // console.log(this.state.movies);
    }

    onNavigateHome() {
        browserHistory.push("/home");
    }

    render() {
        var users = _.map(this.state.users, (user) => {
            return (
                <li key={user._id}>
                    <Link to={"/profile/" + user._id} activeStyle={{color: "red"}}>{user.name}</Link>
                    <span> | </span>
                    <Link to={"/profile/update/" + user._id} activeStyle={{color: "red"}}>Edit</Link>
                    <span> | </span>
                    <Link to={"/profile/delete/" + user._id} activeStyle={{color: "red"}}>Delete</Link>
                </li>)
        });
        return (
            <div>
                <h3>The User Page</h3>
                <ul>{users}</ul>
                <p>User ID: {this.props.params.id}</p>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        )
    };
}
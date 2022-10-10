import React from "react";
import { Navigate } from "react-router-dom";

export default class UnknownPath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        if (this.state.redirect)
            return <Navigate to = "/" />;

        return (
            <div className = "unknownPathContainer">
                <div>
                    Invalid path
                </div>
                
                <button onClick = {() => this.setState({redirect: true})} >
                    Go to home page
                </button>
            </div>
        );
    }
}

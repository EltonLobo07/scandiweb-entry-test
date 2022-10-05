import React from "react";

export default class CategoryLink extends React.Component {
    render() {
        return (
            <li style = {{display: "flex", alignItems: "center"}}>
                <button style = {{height: "100%", textTransform: "uppercase", color: this.props.selected ? "#5ECE7B" : "black", borderBottom: `1px solid ${this.props.selected ? "#5ECE7B" : "white"}`}} onClick = {() => this.props.setAppState({category: this.props.name})}>
                    {
                        this.props.name
                    }
                </button>
            </li>
        );
    }
}
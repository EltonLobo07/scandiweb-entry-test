import React from "react";
import CategoryLink from "./CategoryLink";

export default class CategoryFilter extends React.Component {
    render() {
        return (
            <ul style = {{display: "flex", columnGap: "32px", height: "100%"}}>
                {
                    this.props.appState.categories.map((categoryObj, i) => <CategoryLink key = {i} name = {categoryObj.name} selected = {this.props.appState.category === categoryObj.name} setAppState = {this.props.setAppState} />)
                }
            </ul>
        );
    }
} 

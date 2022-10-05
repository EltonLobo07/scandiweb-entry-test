import React from "react";
import CategoryFilter from "./CategoryFilter";
import SwicthCurrencyOrViewCart from "./SwitchCurrencyOrViewCart";

export default class Header extends React.Component{
    render() {
        return (
            <nav style = {{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 128px", height: "80px"}}>
                <CategoryFilter appState = {this.props.appState} setAppState = {this.props.setAppState} />

                <div style = {{height: "32px", width: "24px", background: "linear-gradient(316.98deg, #52D67A 16.88%, #5AEE87 84.04%)"}}>
                </div>

                <SwicthCurrencyOrViewCart appState = {this.props.appState} setAppState = {this.props.setAppState} />
            </nav>
        );
    }
}

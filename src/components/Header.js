import React from "react";
import CurrencySwicther from "./CurrencySwitcher";

export default class Header extends React.Component {
    render() {
        const { categoryNames, curCategoryName } = this.props.appState;

        return (
            <header style = {{border: "1px solid black", display: "flex", justifyContent: "space-around"}}>
                <nav style = {{display: "flex", columnGap: "12px"}}>
                    {
                        categoryNames.map(categoryName => {
                            return (
                                <button key = {categoryName}
                                        onClick = {() => this.handleCategoryNameClick(categoryName)}
                                        style = {{border: `1px solid ${categoryName === curCategoryName ? "black" : "white"}`}}>
                                    {categoryName}
                                </button>
                            );
                        })
                    }
                </nav>

                <div>
                    Shop logo
                </div>

                <div style = {{display: "flex", columnGap: "12px"}}>
                    <CurrencySwicther appState = {this.props.appState}
                                      setAppState = {this.props.setAppState} />

                    <div>
                        Cart button
                    </div>
                </div>
            </header>
        )
    }

    handleCategoryNameClick(categoryName) {
        this.props.setAppState({curCategoryName: categoryName, categoryChangedUsingHeader: true});
    }
}

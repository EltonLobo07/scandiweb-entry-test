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
                        Cart ({this.getTotalProductsInTheCart()})
                    </div>
                </div>
            </header>
        )
    }

    getTotalProductsInTheCart() {
        const cart = this.props.appState.cart;

        let count = 0;

        for (let i = 0; i < cart.length; i++)
            count += cart[i].attrState.at(-1);

        return count;
    }

    handleCategoryNameClick(categoryName) {
        this.props.setAppState({curCategoryName: categoryName, categoryChangedUsingHeader: true});
    }
}

import React from "react";
import AppState from "../AppState";
import CurrencySwicther from "./CurrencySwitcher";
import DisplayCartProduct from "./DisplayCartProduct";

export default class Header extends React.Component {
    render() {
        const { appState, setAppState } = this.context;
        const { categoryNames, curCurrencySymbol, curCategoryName, displayCartOverlay } = appState;

        const { totalQuantity, totalAmount } = this.getTotalQuantityAndAmount();
        const cartOverLayDisplay = displayCartOverlay ? "inline-block" : "none";

        return (
            <header style = {{position: "relative", zIndex: "2", border: "1px solid black", display: "flex", justifyContent: "space-around"}}>
                <nav style = {{display: "flex", columnGap: "12px"}}>
                    {
                        categoryNames.map(categoryName => {
                            return (
                                <button key = {categoryName}
                                        onClick = {() => this.handleCategoryNameClick(categoryName)}
                                        style = {{border: `1px solid ${categoryName === curCategoryName ? "black" : "white"}`}}
                                >
                                    {categoryName}
                                </button>
                            );
                        })
                    }
                </nav>

                <div>
                    Shop logo
                </div>

                <div style = {{display: "flex", columnGap: "12px", position: "relative"}}>
                    <CurrencySwicther appState = {appState}
                                      setAppState = {setAppState} />

                    <div onClick = {() => this.handleCartClick()}>
                        Cart ({this.getTotalProductsInTheCart()})
                    </div>

                    <div style = {{position: "absolute", display: cartOverLayDisplay, top: "27px", right: "0px", backgroundColor: "white", padding: "4px", width: "500px"}}>
                        <div>
                            My bag {totalQuantity} items
                        </div>

                        <div>
                            {
                                appState.cart.map((prodObj, prodObjIdx) => <DisplayCartProduct key = {prodObj.id} appState = {appState} prodObjIdx = {prodObjIdx} setAppState = {setAppState} />)
                            }
                        </div>

                        <div>
                            Total: {`${curCurrencySymbol}${totalAmount.toFixed(2)}`}
                        </div>

                        <div>
                            <button onClick = {() => setAppState({viewBag: true, displayCartOverlay: false})} style = {{border: "1px solid black"}}>
                                View Bag
                            </button>
                            <button style = {{border: "1px solid black"}}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    getTotalQuantityAndAmount() {
        const { cart, curCurrencySymbol } = this.context.appState;

        let totalQuantity = 0;
        let totalAmount = 0;

        for (let i = 0; i < cart.length; i++) {
            const prodObj = cart[i];
            const qty = prodObj.attrState.at(-1);
            totalQuantity += qty;
            totalAmount += qty * prodObj.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount; 
        }

        return {totalQuantity, totalAmount};
    }

    handleCartClick() {
        const { appState, setAppState } = this.context;
        setAppState({displayCartOverlay: !appState.displayCartOverlay});
    }

    getTotalProductsInTheCart() {
        const cart = this.context.appState.cart;

        let count = 0;

        for (let i = 0; i < cart.length; i++)
            count += cart[i].attrState.at(-1);

        return count;
    }

    handleCategoryNameClick(categoryName) {
        this.context.setAppState({curCategoryName: categoryName, categoryChangedUsingHeader: true, displayCartOverlay: false});
    }
}

Header.contextType = AppState;

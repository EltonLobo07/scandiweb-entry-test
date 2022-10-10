import React from "react";
import AppState from "../AppState";
import CartOverLayOpener from "./CartOverlayOpener";
import CurrencySwicther from "./CurrencySwitcher";
import DisplayCartProduct from "./DisplayCartProduct";

export default class Header extends React.Component {
    render() {
        const { appState, setAppState } = this.context;
        const { categoryNames, curCurrencySymbol, curCategoryName, displayCartOverlay } = appState;

        const { totalQuantity, totalAmount } = this.getTotalQuantityAndAmount();
        const cartOverLayDisplay = displayCartOverlay ? "inline-block" : "none";

        return (
            <header style = {{zIndex: "2"}}>
                <nav>
                    {
                        categoryNames.map(categoryName => {
                            return (
                                <button key = {categoryName}
                                        onClick = {() => this.handleCategoryNameClick(categoryName)}
                                        style = {{borderBottomColor: `${categoryName === curCategoryName ? "#5ECE7B" : "white"}`, color: `${categoryName === curCategoryName ? "#5ECE7B" : "black"}`}}
                                >
                                    {categoryName}
                                </button>
                            );
                        })
                    }
                </nav>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                </svg>

                <div className = "mainHeaderContainer">
                    <CurrencySwicther appState = {appState}
                                      setAppState = {setAppState} />

                    <CartOverLayOpener onClick = {() => this.handleCartClick()} 
                                       numItems = {this.getTotalProductsInTheCart()} />

                    <div style = {{position: "absolute", display: cartOverLayDisplay, top: "59px", right: "0px", backgroundColor: "white", padding: "8px", maxHeight: "calc(100vh - 85px)", overflowY: "auto", minWidth: "320px"}}>
                        <div style = {{marginBottom: "24px"}}>
                            <span style = {{fontWeight: "bold", textTransform: "capitalize"}}>
                                My bag,
                            </span> 
                            {` ${totalQuantity}`} items
                        </div>

                        <div style = {{display: "flex", flexDirection: "column", rowGap: "32px"}}>
                            {
                                appState.cart.map((prodObj, prodObjIdx) => <DisplayCartProduct key = {prodObj.id} appState = {appState} prodObjIdx = {prodObjIdx} setAppState = {setAppState} smallVersion = {true} />)
                            }
                        </div>

                        <div style = {{display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "24px", marginBottom: "24px"}}>
                            <div>
                                Total:
                            </div>
                            <div>
                                {`${curCurrencySymbol}${totalAmount.toFixed(2)}`}
                            </div>
                        </div>

                        <div style = {{display: "flex", justifyContent: "center", columnGap: "24px"}}>
                            <button onClick = {() => setAppState({viewBag: true, displayCartOverlay: false})} className = "cartOverlayBtn" style = {{backgroundColor: "white", color: "black"}}>
                                View Bag
                            </button>
                            <button className = "cartOverlayBtn" style = {{backgroundColor: "#5ECE7B", color: "white", borderColor: "#5ECE7B"}}>
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

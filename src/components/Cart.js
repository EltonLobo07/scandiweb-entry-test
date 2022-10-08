import React from "react";
import DisplayCartProduct from "./DisplayCartProduct";
import AppState from "../AppState";

export default class Cart extends React.Component {
    render() {
        const { appState, setAppState } = this.context;
        const { totalQuantity, totalAmount } = this.getTotalQuantityAndAmount(); 

        return (
            <section>
                <h1>
                    Cart
                </h1>

                <div>
                    {
                        appState.cart.map((prodObj, prodObjIdx) => <DisplayCartProduct key = {prodObj.id} appState = {appState} prodObjIdx = {prodObjIdx} setAppState = {setAppState} />)
                    }
                </div>

                <div>
                    <div>
                        Quantity: {totalQuantity}
                    </div>
                    <div>
                        Total: {`${appState.curCurrencySymbol}${totalAmount.toFixed(2)}`}
                    </div>
                    <button style = {{border: "1px solid black"}}>
                        Order
                    </button>
                </div>
            </section>
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
}

Cart.contextType = AppState;

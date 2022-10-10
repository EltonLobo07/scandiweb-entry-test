import React from "react";
import DisplayCartProduct from "./DisplayCartProduct";
import AppState from "../AppState";

export default class Cart extends React.Component {
    render() {
        const { appState, setAppState } = this.context;
        const { totalQuantity, totalAmount } = this.getTotalQuantityAndAmount(); 

        return (
            <section className = "mainContainer cartContainer" style = {{position: "relative", zIndex: "1"}}>
                <h1>
                    Cart
                </h1>

                <div className = "dash"></div>

                <div style = {{width: "1180px"}}>
                    {
                        appState.cart.map((prodObj, prodObjIdx) => <DisplayCartProduct key = {`${prodObj.id},${prodObj.attrState.slice(0,-1).join(",")}`} appState = {appState} prodObjIdx = {prodObjIdx} setAppState = {setAppState} addDash = {true} />)
                    }
                </div>

                <div className = "cartFinalSection">
                    <div className = "cartFinalInfo">
                        <div className = "flexColGap4px">
                            <div>
                                Quantity:
                            </div>
                            <div>
                                Total:
                            </div>
                        </div>
                        <div className = "flexColGap4px" style = {{fontWeight: "bold"}}>
                            <div>
                                {totalQuantity}
                            </div>
                            <div>
                                {`${appState.curCurrencySymbol}${totalAmount.toFixed(2)}`}
                            </div>
                        </div>
                    </div>
                    <button className = "cartOrderBtn">
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

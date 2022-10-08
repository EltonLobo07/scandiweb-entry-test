import React from "react";
import DisplayCartProduct from "./DisplayCartProduct";
import AppState from "../AppState";

export default class Cart extends React.Component {
    render() {
        const { appState, setAppState } = this.context; 

        return (
            <section>
                <h1>
                    Cart
                </h1>

                <section>
                    {
                        appState.cart.map((prodObj, prodObjIdx) => <DisplayCartProduct key = {prodObj.id} appState = {appState} prodObjIdx = {prodObjIdx} setAppState = {setAppState} />)
                    }
                </section>
            </section>
        )
    }
}

Cart.contextType = AppState;

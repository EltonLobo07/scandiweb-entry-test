import React from "react";

export default class SwicthCurrencyOrViewCart extends React.Component {
    render() {
        return (
            <div style = {{display: "flex", columnGap: "24px"}}>

                <select>
                    {
                        this.props.appState.currencies.map((currencyObj, i) => <option key = {i} onChange = {() => this.props.setAppState(currencyObj.symbol)}>{currencyObj.symbol} {currencyObj.label}</option>)
                    }
                </select>

                <button>
                    Cart logo
                </button>
            </div>
        );
    }
}
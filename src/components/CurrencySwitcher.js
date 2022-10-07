import React from "react";

export default class CurrencySwicther extends React.Component {
    render() {
        const { currencies, curCurrencySymbol } = this.props.appState;

        return (
            <select value = {curCurrencySymbol} onChange = {e => this.handleCurrencySwitch(e)}>
                {
                    currencies.map(currencyObj => {
                        return (
                            <option key = {currencyObj.symbol} value = {currencyObj.symbol}>
                                {`${currencyObj.symbol} ${currencyObj.label}`}
                            </option>
                        );
                    })
                }
            </select>
        );
    }

    handleCurrencySwitch(e) {
        this.props.setAppState({curCurrencySymbol: e.target.value});
    }
}

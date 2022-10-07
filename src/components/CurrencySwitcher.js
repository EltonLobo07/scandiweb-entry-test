import React from "react";

export default class CurrencySwicther extends React.Component {
    render() {
        const { currencies, curCurrencyLabel } = this.props.appState;

        return (
            <select value = {curCurrencyLabel} onChange = {e => this.handleCurrencySwitch(e)}>
                {
                    currencies.map(currencyObj => {
                        return (
                            <option key = {currencyObj.label} value = {currencyObj.label}>
                                {`${currencyObj.symbol} ${currencyObj.label}`}
                            </option>
                        );
                    })
                }
            </select>
        );
    }

    handleCurrencySwitch(e) {
        this.props.setAppState({curCurrencyLabel: e.target.value});
    }
}

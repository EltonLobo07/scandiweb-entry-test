import React from "react";

export default class CurrencySwicther extends React.Component {
    render() {
        const { appState } = this.props;
        const { currencies, curCurrencySymbol, displayCurrencyOptions } = appState;

        return (
            <div style = {{position: "relative", zIndex: "0"}}>
                <div style = {{display: "flex", alignItems: "center", columnGap: "4px", cursor: "pointer"}} id = "currencySwitcher">
                    <div style = {{fontWeight: "500", fontSize: "18px", width: "24px"}}>
                        {
                            curCurrencySymbol
                        }
                    </div>
                    <div style = {{backgroundColor: "white"}}>
                        {
                            displayCurrencyOptions
                            ?
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style = {{width: "10px", height: "10px", backgroundColor: "white", border: "none", cursor: "pointer"}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style = {{width: "10px", height: "10px"}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            )
                        }
                    </div>
                </div>
                
                {
                    displayCurrencyOptions
                    ?
                    (
                        <div style = {{position: "absolute", top: "30px", left: "-20px", backgroundColor: "white", width: "max-content", boxShadow: "0 0 10px lightgray"}}>
                            {
                                currencies.map(currency => (
                                    <button key = {currency.symbol} onClick = {() => this.handleOptionClick(currency.symbol)} style = {{display: "flex", columnGap: "8px", padding: "8px", cursor: "pointer", fontWeight: "500", fontSize: "18px", border: "none", width: "100%"}} className = "currencyBtn">
                                        <span style = {{width: "24px"}}>
                                            {
                                                currency.symbol
                                            }
                                        </span>

                                        <span style = {{textTransform: "uppercase"}}>
                                            {
                                                currency.label
                                            }
                                        </span>
                                    </button>
                                ))
                            }
                        </div>
                    )
                    :
                    null
                }
            </div>
        );
    }

    handleOptionClick(currencySymbol) {
        this.props.setAppState({curCurrencySymbol: currencySymbol});
    }
}

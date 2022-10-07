import React from "react";

export default class DisplayMinimalProductInfo extends React.Component {
    render() {
        const { product, curCurrencySymbol } = this.props;

        return (
            <section style = {{border: "1px solid yellow", display: "flex", flexDirection: "column", rowGap: "8px", alignItems: "center"}}>
                <img src = {product.gallery[0]} 
                     alt = {`${product.name}`}
                     style = {{width: "350px", height: "350px"}} />

                <h2>
                    {product.name}
                </h2>

                <div>
                    {curCurrencySymbol}
                    {product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount}
                </div>

                <div>
                    {
                        product.inStock
                        ?
                        "In stock"
                        :
                        "Out of stock"
                    }
                </div>
            </section>
        );
    }
}
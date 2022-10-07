import React from "react";
import { Navigate } from "react-router-dom";

export default class DisplayMinProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    
    render() {
        const { product, curCurrencySymbol } = this.props;

        if (this.state.redirect)
            return <Navigate to = {`/${product.id}`} />;

        return (
            <section onClick = {() => this.setState({redirect: true})} style = {{border: "1px solid yellow", display: "flex", flexDirection: "column", rowGap: "8px", alignItems: "center"}}>
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
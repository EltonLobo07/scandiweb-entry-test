import React from "react";
import { Navigate } from "react-router-dom";
import AppState from "../AppState";

export default class DisplayMinProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    
    render() {
        const { product, curCurrencySymbol } = this.props;
        const { appState } = this.context;
        this.isProductInCart = appState.cart.find(prodObj => prodObj.id === product.id) !== undefined;

        if (this.state.redirect)
            return <Navigate to = {`/${product.id}`} />;

        return (
            <section onClick = {e => this.handleProductClick(e)} style = {{border: "1px solid yellow", display: "flex", flexDirection: "column", rowGap: "8px", alignItems: "center"}}>
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

                {

                    !this.isProductInCart
                    ?
                    (
                        <button onClick = {() => this.handleCartClick()}
                                style = {{border: "1px solid black", padding: "4px"}}>
                            {
                                product.inStock
                                ?
                                "Add to cart"
                                :
                                "Out of stock"
                            }
                        </button>
                    )
                    :
                    null
                }
            </section>
        );
    }

    handleProductClick(e) {
        if (e.target.tagName.toLowerCase() !== "button")
            this.setState({redirect: true});
    }

    handleCartClick() {
        const { product } = this.props;
        const { appState, setAppState } = this.context;

        if (product.inStock) {
            const productInLS = window.localStorage.getItem(product.id);

            let attrState;

            if (productInLS)
                attrState = JSON.parse(productInLS);
            else {
                attrState = [];
                for (let i = 0; i < product.attributes.length; i++)
                    attrState.push(0);
                attrState.push(1);
            }

            const newProductInCart = {...product, attrState};
            newProductInCart.gallery = newProductInCart.gallery[0];
            // delete newProductInCart["description"];
            setAppState({cart: [...appState.cart, newProductInCart]});
        }
    }
}

DisplayMinProductInfo.contextType = AppState;

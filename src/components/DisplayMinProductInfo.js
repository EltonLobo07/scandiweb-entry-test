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
            <section onClick = {e => this.handleProductClick(e)} className = "productsCard">
                <div className = "imgContainer">
                    <img src = {product.gallery[0]} alt = {`${product.name}`} />
                    <div style = {{zIndex: product.inStock ? "0" : "2"}}>
                        Out of stock
                    </div>
                </div>

                <h2>
                    {`${product.brand} ${product.name}`}
                </h2>

                <div className = "price">
                    {curCurrencySymbol}
                    {product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount.toFixed(2)}
                </div>

                <button className = "svgContainer" onClick = {() => this.handleCartClick()} style = {{display: product.inStock && !this.isProductInCart ? "inline-block" : "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#5ECE7B" viewBox="0 0 24 24" strokeWidth="1" stroke="white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </section>
        );
    }

    handleProductClick(e) {
        const tagName = e.target.tagName.toLowerCase(); 
    
        if (tagName !== "button" && tagName !== "path" && tagName !== "svg")
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

            const newProductInCart = {...product, attrState, moreThanOnePic: product.gallery.length > 1};
            newProductInCart.gallery = newProductInCart.gallery[0];
            setAppState({cart: [...appState.cart, newProductInCart]});
        }
    }
}

DisplayMinProductInfo.contextType = AppState;

import React from "react";
import service from "../services";
import UnknownPath from "./UnknownPath";
import AppState from "../AppState";
import DisplayAttrObj from "./DisplayAttrObj";
import DisplaySmallImage from "./DisplaySmallImage";

export default class DisplayMaxProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: undefined,
            curImgIdx: 0,
            attrState: undefined
        };
        this.descriptionRef = React.createRef();
        this.setParentState = this.setParentState.bind(this);
    }

    componentDidMount() {
        const productId = window.location.pathname.slice(1);
        
        service.getSingleProduct(productId)
               .then(res => {
                    const inCartProd = this.context.appState.cart.find(prodObj => prodObj.id === productId);
                    
                    if (inCartProd !== undefined) {
                        this.setState({product: res, attrState: inCartProd.attrState});
                        return;
                    }

                    const initialAttrState = [];

                    if (res !== null) {
                        for (let i = 0; i < res.attributes.length; i++)
                            initialAttrState.push(0);

                        initialAttrState.push(1);
                    }
                    
                    this.setState({product: res, attrState: initialAttrState});
               })
               .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.product && this.descriptionRef.current.innerHTML === "")
            this.descriptionRef.current.innerHTML = this.state.product.description;

        if (this.isProductInCart && prevState.attrState !== undefined && this.state.attrState.join(",") !== prevState.attrState.join(",")) {
            this.setAppState({cart: this.appState.cart.map(prodObj => prodObj.id === this.productId ? {...prodObj, attrState: [...this.state.attrState]} : prodObj)});
        }
    }

    render() {
        if (this.state.product === undefined)
            return <div>Loading...</div>;

        if (this.state.product === null)
            return <UnknownPath />;

        const { product, curImgIdx } = this.state;
        const { curCurrencySymbol, cart } = this.context.appState;
        this.productId = product.id;
        this.appState = this.context.appState;
        this.setAppState = this.context.setAppState;
        this.isProductInCart = cart.find(cartProdObj => cartProdObj.id === product.id) !== undefined;

        return (
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", columnGap: "12px"}}>
                <div style = {{display: "flex", columnGap: "12px"}}>
                    <div style = {{display: "flex", flexDirection: "column", rowGap: "12px"}}>
                        {
                            product.gallery.map((imgLink, imgIdx) => <DisplaySmallImage key = {imgLink} imgIdx = {imgIdx} product = {product} curImgIdx = {curImgIdx} setParentState = {this.setParentState} />)
                        }
                    </div>
                    <img src = {product.gallery[curImgIdx]} 
                         alt = {`${product.name} number ${curImgIdx + 1}`}
                         style = {{width: "350px", height: "350px"}} />
                </div>
                <div style = {{display: "flex", flexDirection: "column", rowGap: "8px"}}>
                    <h3>
                        {product.brand}
                    </h3>
                    <h4>
                        {product.name}
                    </h4>
                    <div>
                        {
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {this.state.attrState} setAttrState = {this.setParentState} />)
                        }
                    </div>
                    <div>
                        <div>
                            PRICE:
                        </div>
                        <div>
                            {`${curCurrencySymbol} ${product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount}`}
                        </div>
                    </div>
                    <div>
                        <div>
                            QUANTITY:
                        </div>
                        <div style = {{display: "flex", columnGap: "12px"}}>
                            <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.decQuantity()}>
                                -
                            </button>
                            <div>
                                {this.state.attrState.at(-1)}
                            </div>
                            <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.incQuantity()}>
                                +
                            </button>
                        </div>
                    </div>
                    <button disabled = {!product.inStock} style = {{border: "1px solid black"}} onClick = {() => this.handleBtnClick()}>
                        {this.generateBtnLabel(product.inStock)}
                    </button>
                    <div ref = {this.descriptionRef}
                         style = {{width: "250px"}}>
                    </div>
                </div>
            </div>
        );
    }

    setParentState(obj) {
        this.setState(obj);
    }

    generateBtnLabel(inStock) {
        if (inStock)
            return this.isProductInCart ? "REMOVE FROM CART" : "ADD TO CART";

        return "OUT OF STOCK";
    }

    handleBtnClick() {
        if (this.isProductInCart)
            this.setAppState({cart: this.appState.cart.filter(prodObj => prodObj.id !== this.productId)});
        else {
            const newCartProduct = {...this.state.product, gallery: this.state.product.gallery[0], attrState: this.state.attrState};
            delete newCartProduct["description"];
            this.setAppState({cart: [...this.appState.cart, newCartProduct]});
        }
    }

    incQuantity() {
        const attrStateCpy = [...this.state.attrState];
        attrStateCpy[attrStateCpy.length - 1]++;
        this.setState({attrState: attrStateCpy});
    }

    decQuantity() {
        const attrStateCpy = [...this.state.attrState];
        const lastIdx = attrStateCpy.length - 1;
        attrStateCpy[lastIdx] = Math.max(attrStateCpy[lastIdx] - 1, 1);
        this.setState({attrState: attrStateCpy});
    }
}

DisplayMaxProductInfo.contextType = AppState;

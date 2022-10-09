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
        this.setAttrState = this.setAttrState.bind(this);
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

                    const attrStateInLS = window.localStorage.getItem(productId);

                    if (attrStateInLS) {
                        this.setState({product: res, attrState: JSON.parse(attrStateInLS)});
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

    componentDidUpdate() {
        if (this.isProductInCart) {
            const cartAttrState = this.prodObj.attrState;
            if (cartAttrState.join(",") !== this.state.attrState.join(","))
                this.setState({attrState: [...cartAttrState]});
        }

        window.localStorage.setItem(this.productId, JSON.stringify(this.state.attrState));
    }

    render() {
        if (this.state.product === undefined)
            return <div style = {{position: "relative", zIndex: 1}}>Loading...</div>;

        if (this.state.product === null)
            return <UnknownPath />;

        const { product, curImgIdx } = this.state;
        const { curCurrencySymbol, cart } = this.context.appState;
        this.productId = product.id;
        this.appState = this.context.appState;
        this.setAppState = this.context.setAppState;
        const prodObj = cart.find(prodObj => prodObj.id === this.productId);
        this.prodObj = prodObj;
        this.isProductInCart = prodObj !== undefined;
        const curAttrState = this.isProductInCart ? prodObj.attrState : this.state.attrState;

        return (
            <div style = {{position: "relative", zIndex: "1", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "12px"}}>
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
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {curAttrState} setAttrState = {this.setAttrState} />)
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
                                {curAttrState.at(-1)}
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

    setAttrState({ attrState }) {
        if (this.isProductInCart) {
            const { appState, setAppState } = this.context;
            const { cart } = appState;

            const newCart = cart.map(prodObj => prodObj.id === this.productId ? {...prodObj, attrState} : prodObj);
            setAppState({cart: newCart});
            return;
        }
        
        this.setState({attrState});
    }

    generateBtnLabel(inStock) {
        if (inStock)
            return this.isProductInCart ? "REMOVE FROM CART" : "ADD TO CART";

        return "OUT OF STOCK";
    }

    handleBtnClick() {
        if (this.isProductInCart) {
            const { appState, setAppState } = this.context;
            const prodObj = appState.cart.find(prodObj => prodObj.id === this.productId);
            this.setState({attrState: [...prodObj.attrState]});
            setAppState({cart: appState.cart.filter(prodObj => prodObj.id !== this.productId)});
        }
        else {
            const newCartProduct = {...this.state.product, gallery: this.state.product.gallery[0], attrState: this.state.attrState};
            delete newCartProduct["description"];
            this.setAppState({cart: [...this.appState.cart, newCartProduct]});
        }
    }

    incQuantity() {
        if (this.isProductInCart) {
            const { appState, setAppState } = this.context;
            const newCart = appState.cart.map(prodObj => {
                if (prodObj.id === this.productId) {
                    const newProdAttrState = [...prodObj.attrState];
                    newProdAttrState[newProdAttrState.length - 1]++;
                    return {...prodObj, attrState: newProdAttrState};
                }
                return prodObj;
            });
            setAppState({cart: newCart});
        }
        else {
            const newAttrState = [...this.state.attrState];
            newAttrState[newAttrState.length - 1]++;
            this.setState({attrState: newAttrState});
        }
    }

    decQuantity() {
        if (this.isProductInCart) {
            const { appState, setAppState } = this.context;
            const newCart = appState.cart.map(prodObj => {
                if (prodObj.id === this.productId) {
                    const newProdAttrState = [...prodObj.attrState];
                    const lastIdx = newProdAttrState.length - 1;
                    newProdAttrState[lastIdx] = Math.max(1, newProdAttrState[lastIdx] - 1);
                    return {...prodObj, attrState: newProdAttrState};
                }
                return prodObj;
            });
            setAppState({cart: newCart});
        }
        else {
            const newAttrState = [...this.state.attrState];
            const lastIdx = newAttrState.length - 1;
            newAttrState[lastIdx] = Math.max(1, newAttrState[lastIdx] - 1);
            this.setState({attrState: newAttrState});
        }
    }
}

DisplayMaxProductInfo.contextType = AppState;

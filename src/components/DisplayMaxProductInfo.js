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
        if (this.state.product && this.descriptionRef.current.innerHTML === "")
            this.descriptionRef.current.innerHTML = this.state.product.description;

        window.localStorage.setItem(this.productId, JSON.stringify(this.state.attrState));
    }

    render() {
        if (this.state.product === undefined)
            return <div className = "loadingScreen">Loading...</div>;

        if (this.state.product === null)
            return <UnknownPath />;

        const { product, curImgIdx } = this.state;
        const { curCurrencySymbol } = this.context.appState;
        this.productId = product.id;
        this.appState = this.context.appState;
        this.setAppState = this.context.setAppState;
        const curAttrState = this.state.attrState;

        return (
            <div className = "mainContainer productDescriptionContainer" style = {{position: "relative", zIndex: "0", overflowY: "scroll"}}>
                <div className = "imagesContainer">
                    <div style = {{display: "flex", flexDirection: "column", rowGap: "12px"}}>
                        {
                            product.gallery.map((imgLink, imgIdx) => <DisplaySmallImage key = {imgLink} imgIdx = {imgIdx} product = {product} curImgIdx = {curImgIdx} setParentState = {this.setParentState} />)
                        }
                    </div>
                    <img src = {product.gallery[curImgIdx]} 
                         alt = {`${product.name} number ${curImgIdx + 1}`}
                         className = "mainImage" />
                </div>
                <div className = "productInfoContainer">
                    <div className = "productBrandAndNameContainer">
                        <h3>
                            {product.brand}
                        </h3>
                        <h4>
                            {product.name}
                        </h4>
                    </div>
                    
                    <div className = "attrsContainer">
                        {
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {curAttrState} setAttrState = {this.setAttrState} />)
                        }
                    </div>
                    <div className = "attrNameAndSelector">
                        <div className = "productInfoAttrName">
                            Price:
                        </div>
                        <div className = "pDPPriceDisplayer">
                            {`${curCurrencySymbol} ${product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount.toFixed(2)}`}
                        </div>
                    </div>
                    <div className = "attrNameAndSelector">
                        <div className = "productInfoAttrName">
                            Quantity:
                        </div>
                        <div className = "quantityChangersAndDisplay">
                            <button className = "quantityChangeBtn" onClick = {() => this.decQuantity()}>
                                -
                            </button>
                            <div className = "quantityDisplay">
                                {curAttrState.at(-1)}
                            </div>
                            <button className = "quantityChangeBtn" onClick = {() => this.incQuantity()}>
                                +
                            </button>
                        </div>
                    </div>
                    <button disabled = {!product.inStock} className = "pDPAddToCartBtn" onClick = {() => this.handleBtnClick()} style = {{backgroundColor: !product.inStock || this.isProductInCart ? "red" : "#5ECE7B"}}>
                        {this.generateBtnLabel(product.inStock)}
                    </button>
                    <div ref = {this.descriptionRef}
                         className = "pDPProductDescription">
                    </div>
                </div>
            </div>
        );
    }

    setParentState(obj) {
        this.setState(obj);
    }

    setAttrState({ attrState }) {
        this.setState({attrState});
    }

    generateBtnLabel(inStock) {
        if (inStock)
            return "ADD TO CART";

        return "OUT OF STOCK";
    }

    handleBtnClick() {
        const { appState, setAppState } = this.context;
        const { cart } = appState;
        const curAttrState = this.state.attrState;
        const lastIdx = curAttrState.length - 1;

        const curProductState = `${this.productId},${curAttrState.slice(0, lastIdx).join(",")}`;

        const idxOfSimilarEntry = cart.findIndex(prodObj => {
            const cartProductStr = `${prodObj.id},${prodObj.attrState.slice(0, prodObj.attrState.length - 1).join(",")}`;
            return cartProductStr === curProductState;
        });

        if (idxOfSimilarEntry === -1) {
            const newCartProduct = {...this.state.product, gallery: this.state.product.gallery[0], attrState: curAttrState, moreThanOnePic: this.state.product.gallery.length > 1};
            delete newCartProduct["description"];
            this.setAppState({cart: [...this.appState.cart, newCartProduct]});
        }
        else {
            setAppState({cart: cart.map((prodObj, prodObjIdx) => {
                if (prodObjIdx !== idxOfSimilarEntry)
                    return prodObj;
                    
                const newAttrState = [...prodObj.attrState];
                newAttrState[lastIdx] += curAttrState.at(-1);
                return {...prodObj, attrState: newAttrState};
            })});
        }
    }

    incQuantity() {
        const newAttrState = [...this.state.attrState];
        newAttrState[newAttrState.length - 1]++;
        this.setState({attrState: newAttrState});
    }

    decQuantity() {
        const newAttrState = [...this.state.attrState];
        const lastIdx = newAttrState.length - 1;
        newAttrState[lastIdx] = Math.max(1, newAttrState[lastIdx] - 1);
        this.setState({attrState: newAttrState});
    }
}

DisplayMaxProductInfo.contextType = AppState;

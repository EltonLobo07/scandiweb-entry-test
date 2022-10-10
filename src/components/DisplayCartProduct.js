import React from "react";
import DisplayAttrObj from "./DisplayAttrObj";

export default class DisplayCartProduct extends React.Component {
    constructor(props) {
        super(props);
        this.setProductAttrState = this.setProductAttrState.bind(this);
    }

    handleRemoveFromCartBtnClick() {
        const { appState, setAppState, prodObjIdx } = this.props;
        setAppState({cart: appState.cart.filter((prodObj, poi) => poi !== prodObjIdx)});
    }

    setProductAttrState({ attrState }) {
        const { appState, setAppState, prodObjIdx } = this.props;
        const newCart = appState.cart.map((prodObj, poi) => {
            if (poi === prodObjIdx)
                return {...prodObj, attrState};
            
            return prodObj;
        });
        setAppState({cart: newCart});
    } 

    componentDidUpdate() {
        const { appState, prodObjIdx } = this.props;
        const product = appState.cart[prodObjIdx];
        window.localStorage.setItem(product.id, JSON.stringify(product.attrState));
    }

    render() {
        const { appState, prodObjIdx } = this.props;

        const { curCurrencySymbol, cart  } = appState;
        const product = cart[prodObjIdx];
        const productAttrState = product.attrState;

        return (
        <div>
            <div className = "cartProductContainer">
                <div className = "cartProductInfo">
                    <div>
                        <div className = "productBrandName">
                            {
                                product.brand
                            }
                        </div>
                        <div className = "productName">
                            {
                                product.name
                            }
                        </div>
                    </div>
                    
                    <div className = "cartPrice">
                        {`${curCurrencySymbol} ${product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount.toFixed(2)}`}
                    </div>
                    <div className = "cartAttrs">
                        {
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {productAttrState} setAttrState = {this.setProductAttrState} />)
                        }
                    </div>
                    <button onClick = {() => this.handleRemoveFromCartBtnClick()}
                            className = "cartRemoveBtn">
                        Remove from cart
                    </button>
                </div>
                <div className = "cartImageQuantityChangeAndDisplay">
                    <div className = "cartQuantityChangeAndDisplay">
                        <button className = "quantityChangeBtn" onClick = {() => this.incQuantity()}>
                            +
                        </button>
                        <div className = "cartQuantityDisplay">
                            {productAttrState.at(-1)}
                        </div>
                        <button className = "quantityChangeBtn" onClick = {() => this.decQuantity()}>
                            -
                        </button>
                    </div>
                    <img src = {product.gallery} 
                         alt = {`${product.name}`}
                         className = "cartImage" />
                </div>
            </div>
            {
                this.props.addDash 
                ?
                <div className = "dash"></div>
                :
                null
            }
        </div>
        );
    }

    incQuantity() {
        const { appState, setAppState, prodObjIdx } = this.props;
        const newCart = appState.cart.map((prodObj, poi) => {
            if (poi === prodObjIdx) {
                const newProdAttrState = [...prodObj.attrState];
                newProdAttrState[newProdAttrState.length - 1]++;
                return {...prodObj, attrState: newProdAttrState};
            }
            return prodObj;
        });
        setAppState({cart: newCart});
    }

    decQuantity() {
        const { appState, setAppState, prodObjIdx } = this.props;
        const newCart = appState.cart.map((prodObj, poi) => {
            if (poi === prodObjIdx) {
                const newProdAttrState = [...prodObj.attrState];
                const lastIdx = newProdAttrState.length - 1;
                newProdAttrState[lastIdx] = Math.max(1, newProdAttrState[lastIdx] - 1);
                return {...prodObj, attrState: newProdAttrState};
            }
            return prodObj;
        });
        setAppState({cart: newCart});
    }
}

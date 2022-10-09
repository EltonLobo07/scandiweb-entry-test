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

    render() {
        const { appState, prodObjIdx } = this.props;

        const { curCurrencySymbol, cart  } = appState;
        const product = cart[prodObjIdx];
        const productAttrState = product.attrState;

        return (
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <div>
                        {
                            product.brand
                        }
                    </div>
                    <div>
                        {
                            product.name
                        }
                    </div>
                    <div>
                        {`${curCurrencySymbol} ${product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount}`}
                    </div>
                    <div>
                        {
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {productAttrState} setAttrState = {this.setProductAttrState} />)
                        }
                    </div>
                    <button onClick = {() => this.handleRemoveFromCartBtnClick()}
                            style = {{border: "1px solid black"}}>
                        Remove from cart
                    </button>
                </div>
                <div style = {{display: "flex", columnGap: "8px"}}>
                    <div style = {{display: "flex", flexDirection: "column", RowGap: "12px", justifyContent: "space-between"}}>
                        <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.incQuantity()}>
                            +
                        </button>
                        <div>
                            {productAttrState.at(-1)}
                        </div>
                        <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.decQuantity()}>
                            -
                        </button>
                    </div>
                    <img src = {product.gallery} 
                         alt = {`${product.name}`}
                         style = {{width: "100px", height: "150px"}} />
                </div>
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

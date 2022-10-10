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

    setProductAttrState({ attrState, oldAttrState }) {
        const { appState, setAppState, prodObjIdx } = this.props;
        const { cart } = appState;
        const productId = cart[prodObjIdx].id;
        const lastIdx = attrState.length - 1;
        const curProductState = `${productId},${attrState.slice(0, -1).join(",")}`;

        const idxOfSimilarEntry = cart.findIndex(prodObj => {
            const cartProductStr = `${prodObj.id},${prodObj.attrState.slice(0, prodObj.attrState.length - 1).join(",")}`;
            return cartProductStr === curProductState;
        });

        const oldAttrStateStr = oldAttrState.join(",");

        if (idxOfSimilarEntry === -1) {
            const newCart = cart.map(prodObj => {
                if (!(prodObj.id === productId && prodObj.attrState.join(",") === oldAttrStateStr)) 
                    return prodObj;

                return {...prodObj, attrState: attrState};
            });

            setAppState({cart: newCart});
        }
        else {
            let newCart = cart.map((prodObj, prodObjIdx) => {
                if (prodObjIdx !== idxOfSimilarEntry)
                    return prodObj;
                    
                const newAttrState = [...prodObj.attrState];
                newAttrState[lastIdx] += attrState.at(-1);
                return {...prodObj, attrState: newAttrState};
            });

            newCart = newCart.filter(prodObj => {
                return !(prodObj.id === productId && prodObj.attrState.join(",") === oldAttrStateStr);    
            });

            setAppState({cart: newCart});
        }
    }

    render() {
        const { appState, prodObjIdx, smallVersion } = this.props;

        const { curCurrencySymbol, cart  } = appState;
        const product = cart[prodObjIdx];
        const productAttrState = product.attrState;

        let quantityChangeBtnDim, reduceFontSize, imageWidth, imageHeight;
        if (smallVersion) {
            quantityChangeBtnDim = "24px";
            reduceFontSize = {fontSize: "16px"};
            imageWidth = "121px";
            imageHeight = "190px";
        }
        else {
            quantityChangeBtnDim = "45px";
            reduceFontSize = {};
            imageWidth = "200px";
            imageHeight = "288px";
        }

        return (
        <div>
            <div className = "cartProductContainer">
                <div className = "cartProductInfo" style = {{rowGap: smallVersion ? "8px" : "16px"}}>
                    <div>
                        <div className = "productBrandName" style = {{...reduceFontSize, fontWeight: smallVersion ? "400" : "bold"}}>
                            {
                                product.brand
                            }
                        </div>
                        <div className = "productName" style = {reduceFontSize}>
                            {
                                product.name
                            }
                        </div>
                    </div>
                    
                    <div className = "cartPrice" style = {reduceFontSize}>
                        {`${curCurrencySymbol} ${product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount.toFixed(2)}`}
                    </div>
                    <div className = "cartAttrs">
                        {
                            product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {productAttrState} setAttrState = {this.setProductAttrState} smallVersion = {smallVersion} />)
                        }
                    </div>
                    <button onClick = {() => this.handleRemoveFromCartBtnClick()}
                            className = "cartRemoveBtn"
                            style = {reduceFontSize}>
                        Remove from cart
                    </button>
                </div>
                <div className = "cartImageQuantityChangeAndDisplay">
                    <div className = "cartQuantityChangeAndDisplay">
                        <button className = "quantityChangeBtn" onClick = {() => this.incQuantity()}
                                style = {{...reduceFontSize, width: quantityChangeBtnDim, height: quantityChangeBtnDim}}>
                            +
                        </button>
                        <div className = "cartQuantityDisplay" style = {reduceFontSize}>
                            {productAttrState.at(-1)}
                        </div>
                        <button className = "quantityChangeBtn" onClick = {() => this.decQuantity()} style = {{...reduceFontSize, width: quantityChangeBtnDim, height: quantityChangeBtnDim}}>
                            -
                        </button>
                    </div>
                    <img src = {product.gallery} 
                         alt = {`${product.name}`}
                         className = "cartImage"
                         style = {{width: imageWidth, height: imageHeight}} />
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

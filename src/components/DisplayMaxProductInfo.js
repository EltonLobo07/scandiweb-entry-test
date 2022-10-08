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
            imgIdx: 0
        };
        this.descriptionRef = React.createRef();
        this.setParentState = this.setParentState.bind(this);
    }

    componentDidMount() {
        const productId = window.location.pathname.slice(1);
        
        service.getSingleProduct(productId)
               .then(res => this.setState({product: res}))
               .catch(err => console.log(err.message));
    }

    componentDidUpdate() {
        if (this.state.product && this.descriptionRef.current.innerHTML === "")
            this.descriptionRef.current.innerHTML = this.state.product.description;
    }

    render() {
        if (this.state.product === undefined)
            return <div>Loading...</div>;

        if (this.state.product === null)
            return <UnknownPath />;

        const { product, imgIdx } = this.state;
        const { curCurrencySymbol } = this.context.appState;

        return (
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", columnGap: "12px"}}>
                <div style = {{display: "flex", columnGap: "12px"}}>
                    <div style = {{display: "flex", flexDirection: "column", rowGap: "12px"}}>
                        {
                            product.gallery.map((imgLink, imgIdx) => <DisplaySmallImage key = {imgLink} imgIdx = {imgIdx} product = {product} curImgIdx = {this.state.imgIdx} setParentState = {this.setParentState} />)
                        }
                    </div>
                    <img src = {product.gallery[imgIdx]} 
                         alt = {`${product.name} number ${imgIdx}`}
                         style = {{width: "350px", height: "350px"}} />
                </div>
                <div>
                    <h3>
                        {product.brand}
                    </h3>
                    <h4>
                        {product.name}
                    </h4>
                    <div>
                        {
                            product.attributes.map(attrObj => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} />)
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
                    <button disabled = {!product.inStock} style = {{border: "1px solid black"}}>
                        {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
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
}

DisplayMaxProductInfo.contextType = AppState;

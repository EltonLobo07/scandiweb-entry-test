import React from "react";
import DisplayAttrObj from "./DisplayAttrObj";

export default class DisplayCartProduct extends React.Component {
    constructor(props) {
        super(props);

        const { cart } = this.props.appState;
        this.product = cart[this.props.prodObjIdx];

        this.state = {
            attrState: [...this.product.attrState]
        };

        this.setParentState = this.setParentState.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.attrState.join(",") !== prevState.attrState.join(",")) {
            const cart = this.props.appState.cart;
            const newCart = cart.map(prodObj => prodObj.id === this.product.id ? {...this.product, attrState: [...this.state.attrState]} : prodObj);
            this.props.setAppState({cart: newCart});
        } 
    }

    render() {
        const { appState } = this.props;

        const { curCurrencySymbol } = appState;

        return (
            <div style = {{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <div>
                        {
                            this.product.brand
                        }
                    </div>
                    <div>
                        {
                            this.product.name
                        }
                    </div>
                    <div>
                        {`${curCurrencySymbol} ${this.product.prices.find(priceObj => priceObj.currency.symbol === curCurrencySymbol).amount}`}
                    </div>
                    <div>
                        {
                            this.product.attributes.map((attrObj, attrIdx) => <DisplayAttrObj  key = {attrObj.id} attrObj = {attrObj} attrIdx = {attrIdx} attrState = {this.state.attrState} setAttrState = {this.setParentState} />)
                        }
                    </div>
                </div>
                <div style = {{display: "flex", columnGap: "8px"}}>
                    <div style = {{display: "flex", flexDirection: "column", RowGap: "12px", justifyContent: "space-between"}}>
                        <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.incQuantity()}>
                            +
                        </button>
                        <div>
                            {this.state.attrState.at(-1)}
                        </div>
                        <button style = {{border: "1px solid black", padding: "4px", width: "24px"}} onClick = {() => this.decQuantity()}>
                            -
                        </button>
                    </div>
                    <img src = {this.product.gallery} 
                         alt = {`${this.product.name}`}
                         style = {{width: "100px", height: "150px"}} />
                </div>
            </div>
        );
    }

    setParentState(obj) {
        this.setState(obj);
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

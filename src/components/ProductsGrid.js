import React from "react";
import AppState from "../AppState";
import services from "../services";
import DisplayMinProductInfo from "./DisplayMinProductInfo";

export default class ProductsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        };
        this.prevCurCategoryName = null;
    }

    componentDidMount() {
        const { curCategoryName } = this.context.appState;
        
        if (curCategoryName !== null) {
            this.getProducts();            
        }

        this.prevCurCategoryName = curCategoryName;
    }

    componentDidUpdate() {
        const { curCategoryName } = this.context.appState;

        if (curCategoryName !== null && this.prevCurCategoryName !== curCategoryName) {
            this.getProducts();
        }

        this.prevCurCategoryName = curCategoryName;
    }

    getProducts() {
        const { curCategoryName } = this.context.appState;

        services.getProductsWithHavingCurCategoryName(curCategoryName)
                .then(res => this.setState({products: res}))
                .catch(err => console.log(err.message));
    }
    
    render() {
        if (this.state.products === null)
            return <div style = {{position: "relative", zIndex: 1}}>Loading...</div>; 

        const { curCategoryName, curCurrencySymbol } = this.context.appState;

        return (
            <section style = {{backgroundColor: "lightblue", position: "relative", zIndex: 1}}>
                <h1 style = {{fontSize: "48px", fontWeight: "bold"}}>
                    {curCategoryName}
                </h1>

                <div style = {{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", rowGap: "8px", columnGap: "8px"}}>
                    {
                        this.state.products.map(product => {
                            return (
                                <DisplayMinProductInfo key = {product.id}
                                                       product = {product} 
                                                       curCurrencySymbol = {curCurrencySymbol} />
                            );
                        })
                    }
                </div>
            </section>
        );
    }
}

ProductsGrid.contextType = AppState;

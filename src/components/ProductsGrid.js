import React from "react";
import services from "../services";
import DisplayMinimalProductInfo from "./DisplayMinimalProductInfo";

/*
    ProductsGrid needs the following as props:
        -Current category name                                   X               
        -Array of product objects of the current category
            Each product object should have the following keys
                -Image                                           X
                -Name                                            X 
                -Id                                              X
                -Price                                           X
                -isOutOfStock                                    X
*/

export default class ProductsGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null
        };
    }

    componentDidMount() {
        const { curCategoryName } = this.props.appState;
        
        if (curCategoryName !== null) {
            this.getProducts();            
        }
    }

    componentDidUpdate(prevProps) {
        const { curCategoryName } = this.props.appState;

        if (curCategoryName !== null && prevProps.appState.curCategoryName !== curCategoryName) {
            this.getProducts();
        }
    }

    getProducts() {
        const { curCategoryName } = this.props.appState;

        services.getProductsWithHavingCurCategoryName(curCategoryName)
                .then(res => this.setState({products: res}))
                .catch(err => console.log(err.message));
    }
    
    render() {
        if (this.state.products === null)
            return <div>Loading...</div>;

        const { curCategoryName, curCurrencySymbol } = this.props.appState;

        return (
            <section>
                <h1 style = {{fontSize: "48px", fontWeight: "bold"}}>
                    {curCategoryName}
                </h1>

                <div style = {{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", rowGap: "8px", columnGap: "8px"}}>
                    {
                        this.state.products.map(product => {
                            return (
                                <DisplayMinimalProductInfo key = {product.id}
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

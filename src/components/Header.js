import React from "react";

/*
    Header needs the following as props:
        -Category names                   X
        -Currencies
        -Total number of products
        -List of products in the cart 
*/

export default class Header extends React.Component {
    render() {
        const categoryNames = this.props.appState.categoryNames;
        const curCategoryName = this.props.appState.curCategoryName;

        return (
            <header style = {{border: "1px solid black"}}>
                <nav style = {{display: "flex", columnGap: "12px"}}>
                    {
                        categoryNames.map(categoryName => {
                            return (
                                <button key = {categoryName}
                                        onClick = {() => this.handleCategoryNameClick(categoryName)}
                                        style = {{border: `1px solid ${categoryName === curCategoryName ? "black" : "white"}`}}>
                                    {categoryName}
                                </button>
                            );
                        })
                    }
                </nav>
            </header>
        )
    }

    handleCategoryNameClick(categoryName) {
        this.props.setAppState({curCategoryName: categoryName});
    }
}

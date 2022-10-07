import React from "react";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductsGrid";
import services from "./services"; 

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryNames: null,
      curCategoryName: null,
      currencies: null,
      curCurrencySymbol: null
    }
  }

  componentDidMount() {
    services.getCategoryNamesAndCurrencies()
            .then(res => {
              this.setState({...res, curCategoryName: res.categoryNames[0], curCurrencySymbol: res.currencies[0].symbol});
            })
            .catch(err => console.log(err.message));
  }

  render() {
    if (this.state.categoryNames === null || this.state.currencies === null)
      return <div>Loading...</div>;

    console.log(this.state.curCategoryName, this.state.curCurrencySymbol);

    return (
      <div>
        <Header appState = {this.state} setAppState = {obj => this.setState(obj)} />

        <ProductsGrid appState = {this.state} />
      </div>
    );
  }
}

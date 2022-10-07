import React from "react";
import Header from "./components/Header";
import services from "./services"; 

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryNames: null,
      curCategoryName: null,
      currencies: null,
      curCurrencyLabel: null
    }
  }

  componentDidMount() {
    /*
    services.getCategoryNames()
            .then(categoryNames => {
              this.setState({categoryNames, curCategoryName: categoryNames[0]});
             })
            .catch(err => console.log(err.message));

    services.getCurrencies()
            .then(currencies => {
              this.setState({currencies, curCurrencyLabel: currencies[0].label});
            })
            .catch(err => console.log(err.message));
    */
    
    services.getCategoryNamesAndCurrencies()
            .then(res => {
              this.setState({...res, curCategoryName: res.categoryNames[0], curCurrencyLabel: res.currencies[0].label});
            })
            .catch(err => console.log(err.message));
  }

  render() {
    if (this.state.categoryNames === null || this.state.currencies === null)
      return <div>Loading...</div>;

    console.log(this.state.curCategoryName, this.state.curCurrencyLabel);

    return (
      <div>
        <Header appState = {this.state} setAppState = {obj => this.setState(obj)} />
      </div>
    );
  }
}

import React from "react";
import Header from "./components/Header";
import services from "./services"; 
import { Navigate, Outlet } from "react-router-dom";
import AppState from "./AppState";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryNames: null,
      curCategoryName: null,
      currencies: null,
      curCurrencySymbol: null,
      categoryChangedUsingHeader: false,
      cart: []
    };
    this.setAppState = this.setAppState.bind(this); 
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

    if (this.state.categoryChangedUsingHeader) {
      this.setState({categoryChangedUsingHeader: false});
      return <Navigate to = "/" />;
    }

    console.log("Current cart state:", JSON.stringify(this.state.cart));

    return (
      <div>
        <Header appState = {this.state} setAppState = {this.setAppState} />

        <AppState.Provider value = {{appState: this.state, setAppState: this.setAppState}}>
          <Outlet />
        </AppState.Provider>
      </div>
    );
  }

  setAppState(obj) {
    this.setState(obj);
  }
}

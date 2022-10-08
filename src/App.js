import React from "react";
import Header from "./components/Header";
import services from "./services"; 
import { Navigate, Outlet } from "react-router-dom";
import AppState from "./AppState";

export default class App extends React.Component {
  constructor() {
    super();
    this.appStateLocalStorageKey = "appState";

    const appStateInLS = window.localStorage.getItem(this.appStateLocalStorageKey);
    this.state = appStateInLS ? JSON.parse(appStateInLS) : this.getDefaultValState();
    this.setAppState = this.setAppState.bind(this); 
  }

  getDefaultValState() {
    return (
      {
        categoryNames: null,
        curCategoryName: null,
        currencies: null,
        curCurrencySymbol: null,
        categoryChangedUsingHeader: false,
        cart: []
      }
    );
  }

  componentDidMount() {
    services.getCategoryNamesAndCurrencies()
            .then(res => {
              this.setState({...res, curCategoryName: res.categoryNames[0], curCurrencySymbol: res.currencies[0].symbol});
            })
            .catch(err => console.log(err.message));
  }

  componentDidUpdate() {
    if (this.state.categoryChangedUsingHeader)
      this.setState({categoryChangedUsingHeader: false});

    this.syncLocalStorage();
  }

  syncLocalStorage() {
    window.localStorage.setItem(this.appStateLocalStorageKey, JSON.stringify(this.state));
  }

  render() {
    if (this.state.categoryNames === null || this.state.currencies === null)
      return <div>Loading...</div>;

    if (this.state.categoryChangedUsingHeader)
      return <Navigate to = "/" />;

    // console.log("Current cart state:", JSON.stringify(this.state.cart));

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

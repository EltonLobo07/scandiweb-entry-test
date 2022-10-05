import React from "react";
import Header from "./components/Header";
import { GET_CURRENCIES_AND_CATEGORIES } from "./queries";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: null,
      category: null,
      currencies: null,
      currency: null
    }
  }

  componentDidMount() {
    axios.post("http://localhost:4000/graphql", {query: GET_CURRENCIES_AND_CATEGORIES})
         .then(res => {
          this.setState({categories: res.data.data.categories, category: res.data.data.categories[0].name, currencies: res.data.data.currencies, currency: res.data.data.currencies[0].symbol});
         })
         .catch(err => console.log(err.message));
  }
  
  render() {
    if (this.state.categories === null)
      return (
        <div>
          Loading...
        </div>
      )

    return (
      <div>
        <Header appState = {this.state} setAppState = {obj => this.setState(obj)} />
      </div>
    );
  }
}

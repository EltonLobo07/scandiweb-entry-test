import React from "react";
import Header from "./components/Header";
import services from "./services"; 

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryNames: null,
      curCategoryName: null
    }
  }

  componentDidMount() {
    services.getCategoryNames()
            .then(categoryNames => {
              this.setState({categoryNames, curCategoryName: categoryNames[0]});
             })
            .catch(err => console.log(err.message));
  }

  render() {
    if (this.state.categoryNames === null)
      return <div>Loading...</div>;

    return (
      <div>
        <Header appState = {this.state} setAppState = {obj => this.setState(obj)} />
      </div>
    );
  }
}

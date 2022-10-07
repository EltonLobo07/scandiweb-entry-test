import React from "react";
import service from "../services";
import UnknownPath from "./UnknownPath";

export default class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: undefined
        };
    }

    componentDidMount() {
        const productId = window.location.pathname.slice(1);
        
        service.getSingleProduct(productId)
               .then(res => this.setState({product: res}))
               .catch(err => console.log(err.message));
    }

    render() {
        if (this.state.product === undefined)
            return <div>Loading...</div>;

        if (this.state.product === null)
            return <UnknownPath />;

        return (
            <div>
                Hello from Single Product!
            </div>
        );
    }
}

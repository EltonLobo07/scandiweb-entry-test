import React from "react";

export default class DisplaySmallImage extends React.Component {
    render() {
        const { imgIdx, product } = this.props;

        return (
            <img src = {product.gallery[imgIdx]} 
                 alt = {`${product.name} number ${imgIdx + 1}`}
                 style = {{width: "75px", height: "75px"}} />
        )
    }
}

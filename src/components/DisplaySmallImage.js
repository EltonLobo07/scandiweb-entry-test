import React from "react";

export default class DisplaySmallImage extends React.Component {
    render() {
        const { imgIdx, product, curImgIdx, setParentState } = this.props;

        return (
            <img src = {product.gallery[imgIdx]} 
                 alt = {`${product.name} number ${imgIdx + 1}`}
                 onClick = {() => setParentState({curImgIdx: imgIdx})}
                 style = {{width: "75px", height: "75px", border: `1px solid ${curImgIdx === imgIdx ? "yellow" : "white"}`}} />
        )
    }
}

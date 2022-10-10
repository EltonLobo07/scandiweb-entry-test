import React from "react";

export default class DisplaySmallImage extends React.Component {
    render() {
        const { imgIdx, product, curImgIdx, setParentState } = this.props;

        return (
            <div style = {{border: `2px solid ${curImgIdx === imgIdx ? "#5ECE7B" : "white"}`}}>
                <img src = {product.gallery[imgIdx]} 
                 alt = {`${product.name} number ${imgIdx + 1}`}
                 onClick = {() => setParentState({curImgIdx: imgIdx})}
                 className = "smallImage" />
            </div>
        )
    }
}

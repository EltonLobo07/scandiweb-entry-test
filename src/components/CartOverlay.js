import React from "react";
import AppState from "../AppState";

export default class CartOverlay extends React.Component {
    render() {
        const { appState, setAppState } = this.context;
        const { displayCartOverlay } = appState;

        const cartOverlayZIdx = displayCartOverlay ? "2" : "0";

        return (
            <div className = ".cartOverlayTransparentScreen mainContainer" style = {{position: "absolute", zIndex: cartOverlayZIdx, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)"}} onClick = {() => setAppState({displayCartOverlay: false})}>
            </div>
        );
    }
}

CartOverlay.contextType = AppState;

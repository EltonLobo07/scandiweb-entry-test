import React from "react";

export default class DisplayAttrObjItem extends React.Component {
    render() {
        const { type, itemObj, itemIdx, attrIdx, attrState, setAttrState } = this.props;

        this.itemIdx = itemIdx;
        this.attrIdx = attrIdx;
        this.attrState = attrState;
        this.setAttrState = setAttrState;

        const selectedItemIdx = attrState[attrIdx];
        const isCurItemSelected = itemIdx === selectedItemIdx;

        return (
            <>
                {
                    type === "swatch"
                    ?
                    (
                        <div onClick = {() => this.handleAttrClick()}
                             style = {{width: "32px", height: "32px",
                                       backgroundColor: itemObj.value,
                                       border: `2px solid ${isCurItemSelected ? "yellow" : "white"}`}}>
                        </div>
                    )
                    :
                    (
                        <div onClick = {() => this.handleAttrClick()}
                             style = {{width: "63px", height: "45px",
                                       border: "1px solid black",
                                       textAlign: "center",
                                       backgroundColor: `${isCurItemSelected ? "black" : "white"}`,
                                       color: `${isCurItemSelected ? "white" : "black"}`}}>
                            {
                                itemObj.displayValue
                            }
                        </div>
                    )
                }
            </>
        );
    }

    handleAttrClick() {
        const attrStateCpy = [...this.attrState];
        attrStateCpy[this.attrIdx] = this.itemIdx;
        this.setAttrState({attrState: attrStateCpy});
    }
}

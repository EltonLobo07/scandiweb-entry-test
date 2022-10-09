import React from "react";

export default class DisplayAttrObjItem extends React.Component {
    render() {
        const { type, itemObj, itemIdx, attrIdx, attrState } = this.props;

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
        const { itemIdx, attrIdx, attrState, setAttrState } = this.props;
        const attrStateCpy = [...attrState];
        attrStateCpy[attrIdx] = itemIdx;
        setAttrState({attrState: attrStateCpy});
    }
}

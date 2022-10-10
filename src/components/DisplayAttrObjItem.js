import React from "react";

export default class DisplayAttrObjItem extends React.Component {
    render() {
        const { type, itemObj, itemIdx, attrIdx, attrState, smallVersion } = this.props;

        const selectedItemIdx = attrState[attrIdx];
        const isCurItemSelected = itemIdx === selectedItemIdx;

        return (
            <>
                {
                    type === "swatch"
                    ?
                    (
                        <div style = {{border: `2px solid ${isCurItemSelected ? "#5ECE7B" : "white"}`}}>
                            <div onClick = {() => this.handleAttrClick()}
                                 className = "attrOption swatchAttrOption"
                                 style = {{backgroundColor: itemObj.value,
                                           width: smallVersion ? "17px" : "34px",
                                           height: smallVersion ? "17px" : "34px"}}>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div onClick = {() => this.handleAttrClick()}
                             className = "attrOption textAttrOption"
                             style = {{backgroundColor: `${isCurItemSelected ? "black" : "white"}`,
                                       color: `${isCurItemSelected ? "white" : "black"}`,
                                       width: smallVersion ? "40px" : "63px",
                                       height: smallVersion ? "24px" : "45px",
                                       fontSize: smallVersion ? "12px" : "16px"}}>
                            {
                                itemObj.value
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

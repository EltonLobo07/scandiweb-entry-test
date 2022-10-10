import React from "react";
import DisplayAttrObjItem from "./DisplayAttrObjItem";

export default class DisplayAttrObj extends React.Component {
    render() {
        const { attrObj, attrIdx, attrState, setAttrState, smallVersion } = this.props;

        return (
            <div className = "attrNameAndSelector">
                <div style = {{fontSize: "16px", rowGap: smallVersion ? "1px" : "4px", fontWeight: smallVersion ? "400" : "bold", textTransform: smallVersion ? "none" : "uppercase"}}>    
                    {
                        attrObj.name
                    }
                    :
                </div>

                <div style = {{display: "flex", columnGap: "8px"}}>
                    {
                        attrObj.items.map((itemObj, itemIdx) => <DisplayAttrObjItem key = {itemObj.id}
                                                                                    type = {attrObj.type.toLowerCase()}
                                                                                    itemObj = {itemObj}
                                                                                    itemIdx = {itemIdx}
                                                                                    attrIdx = {attrIdx}
                                                                                    attrState = {attrState}
                                                                                    setAttrState = {setAttrState}
                                                                                    smallVersion = {smallVersion} />)
                    }
                </div>
            </div>
        );
    }
}

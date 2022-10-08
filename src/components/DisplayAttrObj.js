import React from "react";
import DisplayAttrObjItem from "./DisplayAttrObjItem";

export default class DisplayAttrObj extends React.Component {
    render() {
        const { attrObj, attrIdx, attrState, setAttrState } = this.props;

        return (
            <div>
                <div>
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
                                                                                    setAttrState = {setAttrState} />)
                    }
                </div>
            </div>
        );
    }
}

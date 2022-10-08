import React from "react";

export default class DisplayAttrObjItem extends React.Component {
    render() {
        const { type, itemObj } = this.props;

        return (
            <>
                {
                    type === "swatch"
                    ?
                    (
                        <div style = {{width: "32px", height: "32px", backgroundColor: itemObj.value}}>
                        </div>
                    )
                    :
                    (
                        <div style = {{width: "63px", height: "45px", border: "1px solid black"}}>
                            {
                                itemObj.displayValue
                            }
                        </div>
                    )
                }
            </>
        );
    }
}

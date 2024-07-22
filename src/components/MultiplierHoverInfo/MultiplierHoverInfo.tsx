import React from "react";
import "./MultiplierHoverInfo.scss";

const MultiplierHoverInfo = ({ multiplier }: any) => {
    return (
        <div className="multiplier-hover-container">
            <p>{multiplier.description}</p>
            <p>{+multiplier.value * +multiplier.multiplier}</p>
        </div>
    );
};

export default MultiplierHoverInfo;

import React, { useEffect, useRef, useState } from "react";
import "./FarmContainer.scss";
import FarmItem from "../../FarmItem/FarmItem";

const FarmsContainer = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            const { offsetWidth, offsetHeight } = divRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    return (
        <section
            className="farms-container"
            ref={divRef}
        >
            <div className="farm-container-header">
                <div className="farm-header-sides stats">
                    <p>Stats</p>
                </div>
                <div className="random-texts"></div>
                <div className="farm-header-sides options">
                    <p>Options</p>
                </div>
            </div>
            <div className="line-horizontal"></div>
            <div className="farm-items-scrollable">
                {Array.from(Array(10)).map((_, index) => {
                    return (
                        <React.Fragment key={index}>
                            <FarmItem dimensions={dimensions} />
                            <div className="line-horizontal"></div>
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default FarmsContainer;

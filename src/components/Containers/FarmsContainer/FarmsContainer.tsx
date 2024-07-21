import React, { useEffect, useRef, useState } from "react";
import "./FarmContainer.scss";
import FarmItem from "../../FarmItem/FarmItem";
import IMAGES from "../../../utils/images";
import { useCookies } from "../../../App";

const FarmsContainer = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const divRef = useRef(null);

    const { upgrades } = useCookies();

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
                <div
                    className="farm-header-sides stats"
                    style={{ backgroundImage: `url(${IMAGES.farmHeaderBg})` }}
                >
                    <p>Stats</p>
                </div>
                <div className="random-texts"></div>
                <div
                    className="farm-header-sides options"
                    style={{ backgroundImage: `url(${IMAGES.headerBg})` }}
                >
                    <p>Options</p>
                </div>
            </div>
            <div
                className="line-horizontal"
                style={{ backgroundImage: `url(${IMAGES.panelHorizontal})` }}
            ></div>
            <div className="farm-items-scrollable">
                {upgrades.map((upgrade: any, index: number) => {
                    return (
                        upgrade.boughtCount > 0 &&
                        index > 0 && (
                            <React.Fragment key={index}>
                                <FarmItem
                                    dimensions={dimensions}
                                    item={upgrade}
                                />
                                <div
                                    className="line-horizontal"
                                    style={{ backgroundImage: `url(${IMAGES.panelHorizontal})` }}
                                ></div>
                            </React.Fragment>
                        )
                    );
                })}
            </div>
        </section>
    );
};

export default FarmsContainer;

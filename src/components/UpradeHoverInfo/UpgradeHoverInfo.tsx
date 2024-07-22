import React from "react";
import "./UpgradeHoverInfo.scss";
import IMAGES from "../../utils/images";
import { useCookies } from "../../App";

const UpgradeHoverInfo = ({ upgrade }: any) => {
    const { cookiesCount } = useCookies();

    return (
        <div className="upgrade-hover-container">
            <div className="top-part">
                <div className="avatar">
                    <img
                        src={IMAGES.buildingIconsSprite}
                        alt="Avatar"
                        width={64}
                        height={64}
                    />
                </div>
                <div className="info">
                    <p>{upgrade.label}</p>
                    <div>owned: {upgrade.boughtCount}</div>
                </div>
                <div className="price">
                    <img
                        src={IMAGES.cookie}
                        alt="Cookie"
                        width={30}
                        height={"auto"}
                    />
                    <span>{upgrade.price[upgrade.boughtCount]}</span>
                </div>
            </div>
            <hr />
            <p className="text-align-right">{upgrade.description}</p>
            {upgrade.boughtCount > 0 && (
                <>
                    <hr />
                    <div>
                        <div>
                            <p>
                                each {upgrade.category} produces {upgrade.value * upgrade.multiplier} cookies per second
                            </p>
                        </div>

                        <div>
                            <p>
                                {upgrade.boughtCount} {upgrade.category} producing {upgrade.value} cookies per second (
                                {(
                                    ((upgrade.boughtCount * upgrade.multiplier * upgrade.value) / cookiesCount) *
                                    100
                                ).toFixed(1)}
                                % of total CpS)
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpgradeHoverInfo;

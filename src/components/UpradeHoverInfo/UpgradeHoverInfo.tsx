import React from "react";
import "./UpgradeHoverInfo.scss";
import IMAGES from "../../utils/images";
import { useCookies } from "../../App";
import numeral from "numeral";

const UpgradeHoverInfo = ({ upgrade, position }: any) => {
    const { cookiesCount } = useCookies();

    const available = cookiesCount >= upgrade.price[upgrade.boughtCount];

    const formatNumber = (number: number) => {
        let formatted = numeral(number).format("0.00a");

        formatted = formatted.replace(/\.00([a-z])$/, "$1");

        if (number < 1000) {
            formatted = numeral(number).format("0");
        }

        return formatted;
    };

    return (
        <div className="upgrade-hover-container">
            <div className="top-part">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${IMAGES.buildingIconsSprite})`,
                        backgroundPosition: `0px -${position * 64}px`,
                    }}
                ></div>
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
                    <span className={available ? "available" : ""}>
                        {available ? formatNumber(upgrade.price[upgrade.boughtCount]) : "???"}
                    </span>
                </div>
            </div>
            <hr />
            <p className="text-align-right">
                <i>"{upgrade.description}"</i>{" "}
            </p>
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
                                {upgrade.boughtCount} {upgrade.category} producing{" "}
                                {upgrade.boughtCount * upgrade.multiplier * upgrade.value} cookies per second (
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

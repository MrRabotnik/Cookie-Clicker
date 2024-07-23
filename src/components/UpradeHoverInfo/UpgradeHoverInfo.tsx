import React from "react";
import "./UpgradeHoverInfo.scss";
import IMAGES from "../../utils/images";
import { useCookies } from "../../App";
import { formatNumber } from "../../utils/formatNumber";

const UpgradeHoverInfo = ({ upgrade, position, infoContainerY, shouldBeDark, setModalIsOpen }: any) => {
    const { cookiesCount, cookiesPerSecond } = useCookies();

    const available = +cookiesCount >= +upgrade.price[upgrade.boughtCount];

    return (
        <div
            className="upgrade-hover-container"
            style={{
                backgroundImage: `url(${IMAGES.darkNoise})`,
                top: infoContainerY + "px",
            }}
            onMouseEnter={() => {
                setModalIsOpen(false);
            }}
        >
            <div className="top-part">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${IMAGES.buildingIconsSprite})`,
                        backgroundPosition: `${shouldBeDark ? "64px" : 0} -${
                            position > 1 ? (position + 1) * 64 : position * 64
                        }px`,
                    }}
                ></div>
                <div className="info">
                    <p>{upgrade.label}</p>
                    <div className="chip">owned: {upgrade.boughtCount}</div>
                </div>
                <div className="price">
                    <img
                        src={IMAGES.cookie}
                        alt="Cookie"
                        width={30}
                        height={"auto"}
                    />
                    <span className={available ? "available" : ""}>
                        {upgrade.boughtCount === 0 && shouldBeDark
                            ? "???"
                            : formatNumber(upgrade.price[upgrade.boughtCount])}
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
                    <div className="list">
                        <div>
                            <p>
                                each {upgrade.category} produces {formatNumber(upgrade.value * upgrade.multiplier)}{" "}
                                cookies per second
                            </p>
                        </div>

                        <div>
                            <p>
                                {upgrade.boughtCount} {upgrade.category} producing{" "}
                                {formatNumber(upgrade.boughtCount * upgrade.multiplier * upgrade.value)} cookies per
                                second (
                                {(
                                    ((upgrade.boughtCount * upgrade.multiplier * upgrade.value) / cookiesPerSecond) *
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

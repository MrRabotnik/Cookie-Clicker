import React from "react";
import "./UpgradeHoverInfo.scss";
import IMAGES from "../../utils/images";
import { useCookies } from "../../App";
import { formatNumber } from "../../utils/formatNumber";

const UpgradeHoverInfo = ({ upgrade, position, infoContainerY, shouldBeDark, setModalIsOpen }: any) => {
    const { cookiesCount, cookiesPerSecond } = useCookies();

    const boughtCount = upgrade.boughtCount;
    const available = +cookiesCount >= +upgrade.price[boughtCount];
    const singleItemProducing =
        upgrade.category === "cursor"
            ? upgrade.value * upgrade.multiplier + upgrade.bonusValue * upgrade.bonusMultiplier
            : upgrade.value * upgrade.multiplier;
    const calculatedCookieProduction = boughtCount * singleItemProducing;

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
                    <div className="chip">owned: {boughtCount}</div>
                </div>
                <div className="price">
                    <img
                        src={IMAGES.cookie}
                        alt="Cookie"
                        width={30}
                        height={"auto"}
                    />
                    <span className={available ? "available" : ""}>
                        {boughtCount === 0 && shouldBeDark ? "???" : formatNumber(upgrade.price[boughtCount])}
                    </span>
                </div>
            </div>
            <hr />
            <p className="text-align-right">
                <i>"{upgrade.description}"</i>{" "}
            </p>
            {boughtCount > 0 && (
                <>
                    <hr />
                    <div className="list">
                        <div>
                            <p>
                                each {upgrade.category} produces {formatNumber(singleItemProducing)} cookies per second
                            </p>
                        </div>

                        <div>
                            <p>
                                {upgrade.boughtCount} {upgrade.category} producing{" "}
                                {formatNumber(calculatedCookieProduction)} cookies per second (
                                {((calculatedCookieProduction / cookiesPerSecond) * 100).toFixed(1)}% of total CpS)
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpgradeHoverInfo;

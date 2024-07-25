import React from "react";
import "./MultiplierHoverInfo.scss";
import { useCookies } from "../../App";
import IMAGES from "../../utils/images";
import { formatNumber } from "../../utils/formatNumber";

const MultiplierHoverInfo = ({ multiplier, imagePos, setModalIsOpen }: any) => {
    const { cookiesCount } = useCookies();

    const available = cookiesCount >= multiplier.price;

    return (
        <div
            className="multiplier-hover-container"
            style={{ backgroundImage: `url(${IMAGES.darkNoise})` }}
            onMouseEnter={() => {
                setModalIsOpen(false);
            }}
        >
            <div className="top-part">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${IMAGES.multipliersIconsSprite})`,
                        backgroundPosition: `-${imagePos.x}px -${imagePos.y}px`,
                    }}
                ></div>
                <div className="info">
                    <p>{multiplier.label}</p>
                    <div className="chip">Upgrade</div>
                </div>
                <div className="price">
                    <img
                        src={IMAGES.cookie}
                        alt="Cookie"
                        width={30}
                        height={"auto"}
                    />
                    <span className={available ? "available" : ""}>{formatNumber(multiplier.price)}</span>
                </div>
            </div>
            <hr />
            <p>{multiplier.description}</p>
            <p className="text-align-right">
                <i>"{multiplier.quote}"</i>{" "}
            </p>
            <hr />
            <p
                className="text-align-center mg-0"
                style={{ color: "grey" }}
            >
                <i>Click to purchase</i>
            </p>
        </div>
    );
};

export default MultiplierHoverInfo;

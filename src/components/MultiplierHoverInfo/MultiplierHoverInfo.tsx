import React from "react";
import "./MultiplierHoverInfo.scss";
import numeral from "numeral";
import { useCookies } from "../../App";
import IMAGES from "../../utils/images";

const MultiplierHoverInfo = ({ multiplier, position }: any) => {
    const { cookiesCount } = useCookies();

    const available = cookiesCount >= multiplier.price;

    const formatNumber = (number: number) => {
        let formatted;

        if (number < 1000 && number >= 0) {
            formatted = numeral(number).format("0.0");
        } else {
            formatted = numeral(number)
                .format("0.00a")
                .replace(/\.00([a-z])$/, "$1");
        }

        return formatted;
    };

    return (
        <div
            className="multiplier-hover-container"
            style={{ backgroundImage: `url(${IMAGES.darkNoise})` }}
        >
            <div className="top-part">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${IMAGES.multipliersIconsSprite})`,
                        backgroundPosition: `0 -${position * 48}px`,
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
                <i>"{multiplier.author}"</i>{" "}
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

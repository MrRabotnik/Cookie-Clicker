import React from "react";
import "./MultiplierHoverInfo.scss";
import numeral from "numeral";
import { useCookies } from "../../App";
import IMAGES from "../../utils/images";

const MultiplierHoverInfo = ({ multiplier }: any) => {
    const { cookiesCount } = useCookies();

    const available = cookiesCount >= multiplier.price;

    const formatNumber = (number: number) => {
        let formatted = numeral(number).format("0.00a");

        formatted = formatted.replace(/\.00([a-z])$/, "$1");

        if (number < 1000) {
            formatted = numeral(number).format("0");
        }

        return formatted;
    };

    return (
        <div className="multiplier-hover-container">
            <div className="top-part">
                <div
                    className="avatar"
                    style={{ backgroundImage: IMAGES.multipliersIconsSprite }}
                ></div>
                <div className="info">
                    <p>{multiplier.label}</p>
                    <div>Upgrade</div>
                </div>
                <div className="price">
                    <img
                        src={IMAGES.cookie}
                        alt="Cookie"
                        width={30}
                        height={"auto"}
                    />
                    <span>{available ? formatNumber(multiplier.price) : "???"}</span>
                </div>
            </div>
            <hr />
            <p>{multiplier.description}</p>
            <p className="text-align-right">
                <i>"{multiplier.author}"</i>{" "}
            </p>
        </div>
    );
};

export default MultiplierHoverInfo;

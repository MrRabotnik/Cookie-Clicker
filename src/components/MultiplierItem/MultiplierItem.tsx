import React from "react";
import { Stage, Layer, Image as KonvaImage, Group, Rect } from "react-konva";
import useImage from "use-image";

import "./MultiplierItem.scss";
import IMAGES from "../../utils/images";

import "react-tooltip/dist/react-tooltip.css";
import { useCookies } from "../../App";
import MultiplierHoverInfo from "../MultiplierHoverInfo/MultiplierHoverInfo";
// import numeral from "numeral";

const MultiplierItem = ({ dimensions, item, position }: any) => {
    const {
        cookiesCount,
        setCookiesCount,
        cookiesPerSecond,
        setCookiesPerSecond,
        setCookiesPerClick,
        upgrades,
        updateMultipliers,
        updateUpgrades,
    } = useCookies();

    const [containerFrame] = useImage(IMAGES.multiplierFrame);
    const [avatar] = useImage(IMAGES.multipliersIconsSprite);

    // const formatNumber = (number: number) => {
    //     let formatted = numeral(number).format("0.00a");

    //     formatted = formatted.replace(/\.00([a-z])$/, "$1");

    //     if (number < 1000) {
    //         formatted = numeral(number).format("0");
    //     }

    //     return formatted;
    // };

    // const textColor = cookiesCount >= item.price ? "#6f6" : "#f66";

    const upgradeAvailable = cookiesCount >= item.price;

    const buyAMultiplier = () => {
        if (!upgradeAvailable) return;

        setCookiesCount((prev: number) => prev - item.price);
        const foundUpgrade = upgrades.find((upgrade: any) => upgrade.category === item.category);
        if (item.category === "cursor") {
            setCookiesPerClick((prev: number) => prev * item.value);
        }
        const newCookiesPerSecond = cookiesPerSecond - foundUpgrade.boughtCount * foundUpgrade.value;
        setCookiesPerSecond(newCookiesPerSecond + foundUpgrade.value * item.value * foundUpgrade.boughtCount);

        updateUpgrades(foundUpgrade.label, {
            description: `Each ${foundUpgrade.label} generates ${
                foundUpgrade.value * item.value
            } cookies in 10 seconds`,
            multiplier: foundUpgrade.multiplier * item.value,
            value: foundUpgrade.value * item.value,
        });

        updateMultipliers(item.label, {
            value: item.value,
            bought: true,
        });
    };

    return (
        <div
            className="multiplier-item"
            data-tooltip-id={`multiplier-item${position}`}
            onClick={buyAMultiplier}
            onTouchStart={buyAMultiplier}
        >
            <div className={upgradeAvailable ? "display-none" : "disabled-upgrade"}></div>
            <MultiplierHoverInfo multiplier={item} />

            {/* <Tooltip
                id={`multiplier-item${index}`}
                content={"Price: " + item.price + ", " + item.description}
                style={{ color: textColor }}
            /> */}
            <Stage
                width={dimensions.width / 5.1}
                height={dimensions.width / 5.1}
            >
                <Layer>
                    <Group
                        x={0}
                        y={0}
                    >
                        <Rect
                            width={dimensions.width / 5.1}
                            height={dimensions.width / 5.1}
                            fill={`rgba(0,0,0,0.7)`}
                        />
                        <KonvaImage
                            image={containerFrame}
                            width={dimensions.width / 2.5}
                            height={dimensions.width / 5.1}
                            x={0}
                            y={0}
                        />
                        <KonvaImage
                            image={avatar}
                            width={dimensions.width / 5.1 / 1.5}
                            height={dimensions.width / 5.1 / 1.5}
                            crop={{
                                x: 0,
                                y: position * 48,
                                width: 48,
                                height: 48,
                            }}
                            x={(dimensions.width / 5.1 - dimensions.width / 5.1 / 1.5) / 2}
                            y={(dimensions.width / 5.1 - dimensions.width / 5.1 / 1.5) / 2}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default MultiplierItem;

import React, { useState } from "react";
import { Stage, Layer, Image as KonvaImage, Group, Rect } from "react-konva";
import useImage from "use-image";

import "./MultiplierItem.scss";
import IMAGES from "../../utils/images";

import "react-tooltip/dist/react-tooltip.css";
import { useCookies } from "../../App";
import MultiplierHoverInfo from "../MultiplierHoverInfo/MultiplierHoverInfo";

const MultiplierItem = ({ dimensions, item }: any) => {
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

    const [modalIsOpen, setModalIsOpen] = useState(false);

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

        updateMultipliers(item.description, {
            value: item.value,
            bought: true,
        });
    };

    return (
        <div
            className="multiplier-item"
            onMouseEnter={() => {
                setModalIsOpen(true);
            }}
            onMouseLeave={() => {
                setModalIsOpen(false);
            }}
        >
            <div className={upgradeAvailable ? "display-none" : "disabled-upgrade"}></div>

            {modalIsOpen && (
                <MultiplierHoverInfo
                    multiplier={item}
                    imagePos={item.imagePos}
                    setModalIsOpen={setModalIsOpen}
                />
            )}

            <Stage
                width={dimensions.width / 5.1}
                height={80}
                onClick={buyAMultiplier}
                onTouchStart={buyAMultiplier}
            >
                <Layer>
                    <Group
                        x={0}
                        y={0}
                    >
                        <Rect
                            width={dimensions.width / 5.1}
                            height={80}
                            fill={`rgba(0,0,0,0.7)`}
                        />
                        <KonvaImage
                            image={containerFrame}
                            width={dimensions.width / 2.5}
                            height={80}
                            x={0}
                            y={0}
                        />
                        <KonvaImage
                            image={avatar}
                            width={dimensions.width / 5.1 / 1.5}
                            height={dimensions.width / 5.1 / 1.5}
                            crop={{
                                x: item.imagePos.x,
                                y: item.imagePos.y,
                                width: 48,
                                height: 48,
                            }}
                            x={(dimensions.width / 5.1 - dimensions.width / 5.1 / 1.5) / 2}
                            y={(80 - 80 / 1.8) / 2}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default MultiplierItem;

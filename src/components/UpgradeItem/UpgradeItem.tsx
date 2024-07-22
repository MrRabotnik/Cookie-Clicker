import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Group } from "react-konva";
import useImage from "use-image";

import "./UpgradeItem.scss";
import { useCookies } from "../../App";
import numeral from "numeral";
import IMAGES from "../../utils/images";
import UpgradeHoverInfo from "../UpradeHoverInfo/UpgradeHoverInfo";

const UpgradeItem = ({
    dimensions,
    upgrade,
    buying,
    buySellMultiplier,
    updateUpgrades,
    position,
    shouldBeDark = false,
}: any) => {
    const { cookiesCount, setCookiesCount, setCookiesPerSecond } = useCookies();

    const [infoContainerY, setInfoContainerY] = useState(200);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [bg] = useImage(IMAGES.upgradeBg);
    const [cookie] = useImage(IMAGES.cookie);
    const [avatar] = useImage(IMAGES.buildingIconsSprite);

    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef(null);

    const sumPriceArray = () => {
        if (!Array.isArray(upgrade.price) || buySellMultiplier + upgrade.boughtCount > upgrade.price.length) {
            return;
        }

        const slicedArray = upgrade.price.slice(upgrade.boughtCount, buySellMultiplier + upgrade.boughtCount);
        const sum = slicedArray.reduce((acc: number, value: number) => acc + +value, 0);
        return sum;
    };

    const summedPriceArray = sumPriceArray();

    const formatNumber = (number: number) => {
        let formatted = numeral(number).format("0.00a");

        formatted = formatted.replace(/\.00([a-z])$/, "$1");

        if (number < 1000) {
            formatted = numeral(number).format("0");
        }

        return formatted;
    };

    const textColor = buying
        ? cookiesCount >= summedPriceArray
            ? "#6f6"
            : "#f66"
        : buySellMultiplier <= upgrade.boughtCount
        ? "#6f6"
        : "#f66";

    const upgradeAvailable = buying ? cookiesCount >= summedPriceArray : buySellMultiplier <= upgrade.boughtCount;

    useEffect(() => {
        if (textRef.current) {
            const textNode: any = textRef.current;
            const textWidth = textNode.getTextWidth();
            setTextWidth(textWidth);
        }
    }, [upgrade.boughtCount]);

    const buyAnUpgrade = () => {
        if (!upgradeAvailable) return;

        setCookiesCount((prev: number) => prev - summedPriceArray);
        setCookiesPerSecond((prev: number) => prev + upgrade.value * buySellMultiplier * upgrade.multiplier);

        updateUpgrades(upgrade.label, {
            boughtCount: upgrade.boughtCount + buySellMultiplier,
        });
    };

    const sellAnUpgrade = () => {
        if (!upgradeAvailable) return;

        setCookiesCount((prev: number) => +prev + summedPriceArray);
        setCookiesPerSecond((prev: number) => +prev - upgrade.value * buySellMultiplier * upgrade.multiplier);

        updateUpgrades(upgrade.label, {
            boughtCount: upgrade.boughtCount - buySellMultiplier,
        });
    };

    return (
        <div
            className="upgrade-item"
            onClick={buying ? buyAnUpgrade : sellAnUpgrade}
            onTouchStart={buying ? buyAnUpgrade : sellAnUpgrade}
            onMouseMove={(e) => {
                setModalIsOpen(true);
                if (e.clientY + 200 >= window.innerHeight) {
                    setInfoContainerY(e.clientY - 200);
                } else {
                    setInfoContainerY(e.clientY);
                }
            }}
            onMouseLeave={() => {
                setModalIsOpen(false);
            }}
        >
            <div className={upgradeAvailable ? "display-none" : "disabled-upgrade"}></div>

            {modalIsOpen && (
                <UpgradeHoverInfo
                    upgrade={upgrade}
                    position={position}
                    infoContainerY={infoContainerY}
                    shouldBeDark={shouldBeDark}
                />
            )}

            <Stage
                width={dimensions.width}
                height={64}
            >
                <Layer>
                    <KonvaImage
                        image={bg}
                        width={dimensions.width}
                        height={256}
                    />
                    <Group
                        width={dimensions.width}
                        height={64}
                        x={0}
                        y={0}
                    >
                        <KonvaImage
                            image={avatar}
                            width={dimensions.width / 5}
                            height={64}
                            crop={{
                                x: shouldBeDark ? 64 : 0,
                                y: position >= 2 ? (position + 1) * 64 : position * 64,
                                width: 63,
                                height: 64,
                            }}
                            x={0}
                            y={0}
                        />
                        <Text
                            text={upgrade.label}
                            x={dimensions.width / 5}
                            y={5}
                            fill="white"
                            fontSize={32}
                            fontFamily="Arial"
                            shadowBlur={6}
                            shadowOffsetX={0}
                            shadowOffsetY={2}
                        />
                        <KonvaImage
                            image={cookie}
                            x={dimensions.width / 5 - 5}
                            y={35}
                            width={30}
                            height={25}
                        />
                        <Text
                            text={
                                shouldBeDark
                                    ? "???"
                                    : formatNumber(
                                          buying ? summedPriceArray : summedPriceArray - (summedPriceArray * 50) / 100
                                      )
                            }
                            x={dimensions.width / 5 + 20}
                            y={40}
                            fill={textColor}
                            fontSize={16}
                            fontFamily="Arial"
                            shadowColor="black"
                            shadowBlur={6}
                            shadowOffsetX={0}
                            shadowOffsetY={2}
                        />
                        <Text
                            text={upgrade.boughtCount ? upgrade.boughtCount : ""}
                            x={Math.max(dimensions.width - textWidth - 10, 0)}
                            y={15}
                            fill="rgba(187, 187, 187, 0.5)"
                            fontSize={48}
                            fontFamily="Arial"
                            ref={textRef}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default UpgradeItem;

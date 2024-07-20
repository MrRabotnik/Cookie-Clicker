import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Group } from "react-konva";
import useImage from "use-image";

import "./UpgradeItem.scss";
import { useCookies } from "../../App";

const UpgradeItem = ({ dimensions, upgrade, buying, buySellMultiplier, updateUpgrades }: any) => {
    const { cookiesCount, setCookiesCount, setCookiesPerSecond } = useCookies();

    const [bg] = useImage("./assets/upgradeBg.jpeg");
    const [cookie] = useImage("./assets/cookie.png");
    const [avatar] = useImage(upgrade.avatar);

    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef(null);

    const textColor = buying
        ? cookiesCount >= buySellMultiplier * upgrade.price[upgrade.boughtCount]
            ? "#6f6"
            : "#f66"
        : "#6f6";

    const upgradeAvailable = cookiesCount >= buySellMultiplier * upgrade.price[upgrade.boughtCount];

    useEffect(() => {
        if (textRef.current) {
            const textNode: any = textRef.current;
            const textWidth = textNode.getTextWidth();
            setTextWidth(textWidth);
        }
    }, [upgrade.boughtCount]);

    const buyAnUpgrade = () => {
        if (!upgradeAvailable) return;

        setCookiesCount((prev: number) => prev - upgrade.price[upgrade.boughtCount]);
        setCookiesPerSecond((prev: number) => prev + upgrade.value);

        updateUpgrades(upgrade.label, {
            boughtCount: upgrade.boughtCount + 1,
        });
    };

    const sellAnUpgrade = () => {};

    return (
        <div
            className="upgrade-item"
            onClick={buying ? buyAnUpgrade : sellAnUpgrade}
        >
            <div className={upgradeAvailable ? "display-none" : "disabled-upgrade"}></div>

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
                            width={dimensions.width / 6}
                            height={64}
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
                            text={upgrade.price[upgrade.boughtCount]}
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

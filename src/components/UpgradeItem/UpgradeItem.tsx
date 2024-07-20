import React from "react";
import { Stage, Layer, Image as KonvaImage, Text, Group } from "react-konva";
import useImage from "use-image";

import "./UpgradeItem.scss";
import { useCookies } from "../../App";

const UpgradeItem = ({ dimensions, upgrade, buying, buySellMultiplier, updateUpgrades }: any) => {
    const { cookiesCount, setCookiesCount, setCookiesPerSecond } = useCookies();

    const [bg] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/sand_template_0.jpg");
    const [cookie] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/Cookie.png");
    const [avatar] = useImage(upgrade.avatar);

    const textColor = buying
        ? cookiesCount >= buySellMultiplier * upgrade.price[upgrade.boughtCount]
            ? "#6fc276"
            : "#ff0000"
        : "#6fc276";

    const upgradeAvailable = cookiesCount >= buySellMultiplier * upgrade.price[upgrade.boughtCount];

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
                height={100}
            >
                <Layer>
                    <KonvaImage
                        image={bg}
                        width={dimensions.width}
                        height={100}
                    />
                    <Group
                        width={dimensions.width}
                        height={100}
                        x={0}
                        y={0}
                    >
                        <KonvaImage
                            image={avatar}
                            width={dimensions.width / 4}
                            height={100}
                        />
                        <Text
                            text={upgrade.label}
                            x={100}
                            y={10}
                            fill="white"
                            fontSize={32}
                            fontFamily="Arial"
                        />
                        <KonvaImage
                            image={cookie}
                            x={100}
                            y={50}
                            width={20}
                            height={20}
                        />
                        <Text
                            text={upgrade.price[upgrade.boughtCount]}
                            x={125}
                            y={55}
                            fill={textColor}
                            fontSize={12}
                            fontFamily="Arial"
                        />
                        <Text
                            text={upgrade.description}
                            x={100}
                            y={75}
                            fill={"#ededed"}
                            fontSize={12}
                            fontFamily="Arial"
                        />
                        <Text
                            text={upgrade.boughtCount ? upgrade.boughtCount : ""}
                            x={dimensions.width - 50}
                            y={30}
                            fill="white"
                            fontSize={48}
                            fontFamily="Arial"
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default UpgradeItem;

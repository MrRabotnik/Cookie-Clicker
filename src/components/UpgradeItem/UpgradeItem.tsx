import React from "react";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group } from "react-konva";
import useImage from "use-image";

import "./UpgradeItem.scss";

const UpgradeItem = ({ dimensions, upgrade, position }: any) => {
    const [bg] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/sand_template_0.jpg");
    const [avatar] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/profile_0.png");

    return (
        <div className="upgrade-item">
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
                            width={dimensions.width / 5}
                            height={100}
                        />
                        <Text
                            text={upgrade.label}
                            x={80}
                            y={10}
                            fill="white"
                            fontSize={32}
                            fontFamily="Arial"
                        />
                        <KonvaImage
                            image={avatar}
                            x={80}
                            y={50}
                            width={20}
                            height={20}
                        />
                        <Text
                            text={upgrade.price[0]}
                            x={105}
                            y={55}
                            fill="white"
                            fontSize={12}
                            fontFamily="Arial"
                        />
                        <Text
                            // text={upgrade.bought_count}
                            text={"7"}
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

import React from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";

const MultiplierItem = ({ dimensions }: any) => {
    const [containerFrame] = useImage("./assets/images/multiplier-frame.png");

    return (
        <div className="multiplier-item">
            <Stage
                width={dimensions.width}
                height={100}
            >
                <Layer>
                    <Group
                        x={dimensions.width / 2}
                        y={dimensions.height / 2}
                    >
                        <KonvaImage
                            image={containerFrame}
                            width={dimensions.width / 5}
                            height={dimensions.width / 5}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default MultiplierItem;

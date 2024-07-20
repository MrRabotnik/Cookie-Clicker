import React from "react";
import { Stage, Layer, Rect, Group } from "react-konva";

const MultiplierItem = ({ dimensions }: any) => {
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
                        <Rect
                            width={dimensions.width}
                            height={100}
                            x={0}
                            y={0}
                            fill="rgba(0,0,0,0.7)"
                            opacity={0.5}
                            cornerRadius={10}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default MultiplierItem;

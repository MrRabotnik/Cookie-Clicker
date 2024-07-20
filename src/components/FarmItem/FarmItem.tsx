import React from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";

import "./FarmItem.scss";
import IMAGES from "../../utils/images";

const FarmItem = ({ dimensions }: any) => {
    const [bg] = useImage(IMAGES.grandmaFieldBg);

    return (
        <div className="farm-item">
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
                        x={dimensions.width / 2}
                        y={dimensions.height / 2}
                    ></Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default FarmItem;

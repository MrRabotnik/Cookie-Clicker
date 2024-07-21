import React, { useEffect, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

import "./FarmItem.scss";
import IMAGES from "../../utils/images";

const FarmItem = ({ dimensions }: any) => {
    const [bg] = useImage(IMAGES.grandmaFieldBg);
    const [dogImage] = useImage(IMAGES.doggo);
    const dogRef = useRef<any>(null);

    useEffect(() => {
        const animation = new Konva.Animation((frame: any) => {
            if (dogRef.current) {
                const stageWidth = dimensions.width;
                const newX = (frame.time * 0.1) % stageWidth;
                dogRef.current.x(newX);
            }
        }, dogRef.current.getLayer());

        animation.start();

        return () => {
            animation.stop();
        };
    }, [dimensions.width]);

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
                        width={dimensions.width}
                        height={100}
                        x={0}
                        y={0}
                    >
                        <KonvaImage
                            image={dogImage}
                            width={100}
                            height={100}
                            ref={dogRef}
                            y={0}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default FarmItem;

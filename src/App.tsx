import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const App = () => {
    const [cookieImage] = useImage("./assets/cookie.png");
    const stageRef = useRef(null);
    const layerRef = useRef(null);
    const imageRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [direction, setDirection] = useState({ x: 1, y: 1 });

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const animate: any = () => {
            if (!layerRef.current) return;

            // Get the current stage dimensions
            const stage: any = stageRef.current;
            const layer: any = layerRef.current;
            const image: any = imageRef.current;
            const stageWidth = stage.width();
            const stageHeight = stage.height();

            // Clear the canvas
            layer.clear();

            // Update position
            let newX = position.x + direction.x;
            let newY = position.y + direction.y;

            // Check for boundaries
            if (newX <= 0 || newX + image.width() >= stageWidth) {
                setDirection((prevDirection) => ({ ...prevDirection, x: -prevDirection.x }));
            }
            if (newY <= 0 || newY + image.height() >= stageHeight) {
                setDirection((prevDirection) => ({ ...prevDirection, y: -prevDirection.y }));
            }

            // Set new position
            setPosition({ x: newX, y: newY });

            // Request the next frame
            requestAnimationFrame(animate);
        };

        // Start the animation loop
        // animate();

        // Cleanup on unmount
        return () => cancelAnimationFrame(animate);
    }, [position, direction]);

    return (
        <Stage
            width={dimensions.width}
            height={dimensions.height}
            ref={stageRef}
        >
            <Layer ref={layerRef}>
                <Image
                    image={cookieImage}
                    x={position.x}
                    y={position.y}
                    ref={imageRef}
                />
            </Layer>
        </Stage>
    );
};

export default App;

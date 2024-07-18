import React, { useEffect, useRef, useState } from "react";
import "./CookieContainer.scss";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group } from "react-konva";
import useImage from "use-image";

const CookieContainer = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const divRef = useRef(null);
    const haloRef = useRef<any>(null);

    const [cookie] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/Cookie.png");
    const [cookieHalo] = useImage("https://orteil.dashnet.org/cookieclicker/img/shine.png");

    const [cookiesCount, setCookiesCount] = useState(0);
    const [cookiesPerClick, setCookiesPerClick] = useState(1);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [fadingTexts, setFadingTexts] = useState<any[]>([]);

    useEffect(() => {
        if (divRef.current) {
            const { offsetWidth, offsetHeight } = divRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }

        const handleMouseMove = (e: any) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        if (haloRef.current) {
            const anim = new Konva.Animation((frame: any) => {
                const angleDiff = (frame.timeDiff * 90) / 5000;
                haloRef.current.rotate(angleDiff);
            }, haloRef.current.getLayer());

            anim.start();
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        fadingTexts.forEach((text) => {
            const tween = new Konva.Tween({
                node: text.node,
                y: text.node.y() - 100,
                opacity: 0,
                duration: 3,
                onFinish: () => {
                    setFadingTexts((prev) => prev.filter((t) => t.id !== text.id));
                },
            });
            tween.play();
        });
    }, [fadingTexts]);

    const handleClickOnCookie = () => {
        const addedNewCookies = cookiesPerClick * multiplier;
        setCookiesCount((prev) => prev + addedNewCookies);

        const newText = {
            id: Date.now(),
            text: `+${cookiesPerClick}`,
            x: mousePos.x,
            y: mousePos.y - 50,
            opacity: 1,
        };
        setFadingTexts((prev) => [...prev, newText]);
    };

    return (
        <div
            className="cookie-container"
            ref={divRef}
        >
            <Stage
                width={dimensions.width}
                height={dimensions.height}
            >
                <Layer>
                    <Group
                        x={dimensions.width / 2}
                        y={dimensions.height / 2}
                        draggable
                        dragBoundFunc={(pos) => {
                            return {
                                x: dimensions.width / 2,
                                y: pos.y < 0 ? 0 : pos.y > dimensions.height - 100 ? dimensions.height - 100 : pos.y,
                            };
                        }}
                    >
                        <KonvaImage
                            image={cookieHalo}
                            x={0}
                            y={0}
                            width={300}
                            height={300}
                            offsetX={150}
                            offsetY={150}
                            ref={haloRef}
                        />
                        <KonvaImage
                            image={cookie}
                            width={300}
                            height={220}
                            x={0}
                            y={40}
                            offsetX={150}
                            offsetY={150}
                            onClick={handleClickOnCookie}
                        />
                    </Group>

                    <Group
                        x={0}
                        y={0}
                        draggable
                        dragBoundFunc={(pos) => {
                            return {
                                x: 0,
                                y: pos.y < 0 ? 0 : pos.y > dimensions.height - 100 ? dimensions.height - 100 : pos.y,
                            };
                        }}
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
                        <Text
                            text={`${cookiesCount} cookies`}
                            x={10}
                            y={20}
                            fill="white"
                            fontSize={32}
                            fontFamily="Arial"
                        />
                        <Text
                            text={`per second: ${cookiesPerSecond}`}
                            x={10}
                            y={60}
                            fill="white"
                            fontSize={24}
                            fontFamily="Arial"
                        />
                    </Group>

                    {fadingTexts.map((text) => (
                        <Text
                            key={text.id}
                            text={text.text}
                            x={text.x}
                            y={text.y}
                            fill="white"
                            fontSize={32}
                            opacity={text.opacity}
                            onClick={handleClickOnCookie}
                            ref={(node) => {
                                if (node && !text.node) {
                                    text.node = node;
                                    const tween = new Konva.Tween({
                                        node: text.node,
                                        y: text.y - 100,
                                        opacity: 0,
                                        duration: 3,
                                        onFinish: () => {
                                            setFadingTexts((prev) => prev.filter((t) => t.id !== text.id));
                                        },
                                    });
                                    tween.play();
                                }
                            }}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default CookieContainer;

import React, { useEffect, useRef, useState } from "react";
import "./CookieContainer.scss";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group } from "react-konva";
import useImage from "use-image";
import { useCookies } from "../../../App";

const CookieContainer = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const divRef = useRef(null);
    const haloRef = useRef<any>(null);
    const cursorRefs = useRef<any[]>([]);
    const fallingCookiesRefs = useRef<any[]>([]);

    const [cookie] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/Cookie.png");
    const [cookieHalo] = useImage("https://orteil.dashnet.org/cookieclicker/img/shine.png");
    const [cursor] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/pointer_1.png");
    const [fallingCookies, setFallingCookies] = useState<any[]>([]);

    const { upgrades, cookiesCount, setCookiesCount, cookiesPerClick, cookiesPerSecond, multiplier } = useCookies();

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

    useEffect(() => {
        const interval = setInterval(() => {
            setFallingCookies((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    x: Math.random() * dimensions.width,
                    y: 0,
                    velocity: 100 + Math.random() * 200,
                },
            ]);
        }, 1000);

        return () => clearInterval(interval);
    }, [dimensions.width]);

    useEffect(() => {
        const anim = new Konva.Animation((frame: any) => {
            const timeDiff = frame.timeDiff / 5000;
            setFallingCookies((prev) =>
                prev.map((cookie) => ({
                    ...cookie,
                    y: cookie.y + cookie.velocity * timeDiff,
                }))
            );
        });

        anim.start();

        return () => {
            anim.stop();
        };
    }, []);

    useEffect(() => {
        const anim = new Konva.Animation((frame: any) => {
            const time = frame.time / 3000;
            const radius = 150;
            cursorRefs.current.forEach((cursor, i) => {
                const angle = (i / cursorRefs.current.length) * 2 * Math.PI + time;
                const x = dimensions.width / 2 + radius * Math.cos(angle);
                const y = dimensions.height / 2 + radius * Math.sin(angle);
                cursor.x(x);
                cursor.y(y);

                const dx = dimensions.width / 2 - x;
                const dy = dimensions.height / 2 - y;
                const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
                cursor.rotation(rotation + 90);
            });
        });

        anim.start();

        return () => {
            anim.stop();
        };
    }, [dimensions, cursorRefs.current.length]);

    const handleClickOnCookie = () => {
        const addedNewCookies = cookiesPerClick * multiplier;
        setCookiesCount((prev: number) => prev + addedNewCookies);

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
                    {fallingCookies.map((fallingCookie) => (
                        <KonvaImage
                            key={fallingCookie.id}
                            image={cookie}
                            width={100}
                            height={80}
                            x={fallingCookie.x}
                            y={fallingCookie.y}
                            ref={(node) => {
                                fallingCookiesRefs.current[fallingCookie.id] = node;
                            }}
                        />
                    ))}
                    <Group
                        x={dimensions.width / 2}
                        y={dimensions.height / 2}
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

                    {Array.from({ length: upgrades[0].boughtCount }).map((_, i) => (
                        <KonvaImage
                            key={i}
                            image={cursor}
                            width={50}
                            height={50}
                            x={dimensions.width / 2}
                            y={dimensions.height / 2}
                            offsetX={25}
                            offsetY={25}
                            ref={(node) => {
                                cursorRefs.current[i] = node;
                            }}
                        />
                    ))}

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

import React, { useEffect, useRef, useState } from "react";
import "./CookieContainer.scss";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group, Shape } from "react-konva";
import useImage from "use-image";
import { useCookies } from "../../../App";
import { useSpring, animated } from "@react-spring/konva";
import IMAGES from "../../../utils/images";
import { formatNumber } from "../../../utils/formatNumber";
import SOUNDS from "../../../utils/sounds";

const CookieContainer = () => {
    const { upgrades, cookiesCount, setCookiesCount, cookiesPerClick, cookiesPerSecond, multiplier } = useCookies();
    const [displayedCount, setDisplayedCount] = useState(cookiesCount);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const divRef = useRef(null);
    const cookieRef = useRef<any>(null);
    const haloRef = useRef<any>(null);
    const halo2Ref = useRef<any>(null);
    const cursorRefs = useRef<any[]>([]);
    const fallingCookiesFullImageRefs = useRef<any[]>([]);
    const waveRef = useRef<any>(null);

    const AnimatedGroup: any = animated(Group);

    const [cookie] = useImage(IMAGES.cookie);
    const [fallingCookieImage] = useImage(IMAGES.fallingCookies2);
    const [cookieHalo] = useImage(IMAGES.halo);
    const [cursor] = useImage(IMAGES.rotatingCursorGif);
    const [fallingCookiesFullImage, setFallingCookiesFullImage] = useState<any[]>([]);

    const [invert, setInvert] = useState(false);

    const props = useSpring({
        transform: invert ? "scaleY(-1)" : "scaleY(1)",
        config: { duration: 2000 },
    });

    const [fadingTexts, setFadingTexts] = useState<any[]>([]);

    useEffect(() => {
        const handleTouchMove = (e: any) => {
            setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        };

        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    useEffect(() => {
        if (divRef.current) {
            const { offsetWidth, offsetHeight } = divRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }

        let timeoutId: any;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (divRef.current) {
                    const { offsetWidth, offsetHeight } = divRef.current;
                    setDimensions({ width: offsetWidth, height: offsetHeight });
                }
            }, 200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        let animation: any;
        const duration = 500;
        const startValue = displayedCount;
        const endValue = cookiesCount;
        const startTime = performance.now();

        const animate = (time: any) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = startValue + (endValue - startValue) * progress;

            setDisplayedCount(currentCount);

            if (progress < 1) {
                animation = requestAnimationFrame(animate);
            }
        };

        animation = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animation);
    }, [cookiesCount, displayedCount]);

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        if (haloRef.current && halo2Ref.current) {
            const anim = new Konva.Animation((frame: any) => {
                const angleDiff = (frame.timeDiff * 90) / 5000;
                const angle2Diff = -(frame.timeDiff * 90) / 5000;
                if (haloRef?.current && halo2Ref?.current) {
                    haloRef.current.rotate(angleDiff);
                    halo2Ref.current.rotate(angle2Diff);
                }
            }, haloRef.current.getLayer());

            anim.start();
        }

        const wave = setInterval(() => {
            setInvert((prev) => !prev);
        }, 2000);

        return () => {
            clearInterval(wave);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const anim = new Konva.Animation((frame: any) => {
            if (waveRef.current) {
                const time = frame.time / 3000;
                waveRef.current.sceneFunc((context: any, shape: any) => {
                    context.beginPath();
                    for (let x = 0; x < dimensions.width; x++) {
                        const y = dimensions.height / 1.2 + Math.sin((x + time * 200) / 20) * 10;
                        context.lineTo(x, y);
                    }
                    context.lineTo(dimensions.width, dimensions.height);
                    context.lineTo(0, dimensions.height);
                    context.closePath();
                    context.fillStrokeShape(shape);
                });
                waveRef.current.getLayer().batchDraw();
            }
        }, waveRef.current.getLayer());

        anim.start();

        return () => {
            anim.stop();
        };
    }, [dimensions.height, dimensions.width]);

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
            setFallingCookiesFullImage((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    x: Math.random() * dimensions.width,
                    y: -512,
                    velocity: 128,
                },
            ]);
        }, 4000);

        const anim = new Konva.Animation((frame: any) => {
            const timeDiff = frame.timeDiff / 3000;
            setFallingCookiesFullImage((prev) =>
                prev.map((cookie) => ({
                    ...cookie,
                    y: cookie.y + cookie.velocity * timeDiff,
                }))
            );
        });

        anim.start();

        return () => {
            anim.stop();
            clearInterval(interval);
        };
    }, [dimensions]);

    useEffect(() => {
        const anim = new Konva.Animation((frame: any) => {
            const time = frame.time / 3000;
            let radius = 130;
            cursorRefs.current.forEach((cursor, i) => {
                let angle = (i / 50) * 2 * Math.PI + time;

                if (i > 50) {
                    radius = 160;
                    angle = (i / 100) * 2 * Math.PI + time;
                }

                if (i > 150) {
                    radius = 190;
                    angle = (i / 150) * 2 * Math.PI + time;
                }

                if (i > 300) {
                    radius = 220;
                    angle = (i / 250) * 2 * Math.PI + time;
                }

                const x = dimensions.width / 2 + radius * Math.cos(angle);
                const y = dimensions.height / 2 + radius * Math.sin(angle);
                if (cursor) {
                    cursor.x(x);
                    cursor.y(y);
                    const dx = dimensions.width / 2 - x;
                    const dy = dimensions.height / 2 - y;
                    const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
                    cursor.rotation(rotation + 115);
                }
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

        const audio = new Audio(SOUNDS.cookieClickSound);
        audio.volume = 0.3;
        audio.play();
    };

    const mouseDownOnCookie = () => {
        const anim = new Konva.Animation((frame: any) => {
            const scale = 1 - Math.sin(frame.time * 0.01) * 0.1;
            cookieRef.current.scale({ x: scale, y: scale });
        }, cookieRef.current.getLayer());

        anim.start();

        const generateCookies = setInterval(() => {
            handleClickOnCookie();
        }, 500);

        cookieRef.current.on("mouseup", () => {
            anim.stop();
            cookieRef.current.scale({ x: 1, y: 1 });
            clearInterval(generateCookies);
        });

        cookieRef.current.on("mouseout", () => {
            anim.stop();
            cookieRef.current.scale({ x: 1, y: 1 });
            clearInterval(generateCookies);
        });
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
                    {fallingCookiesFullImage.map((fallingCookieImageItem: any) => (
                        <KonvaImage
                            key={fallingCookieImageItem.id}
                            image={fallingCookieImage}
                            width={dimensions.width}
                            height={dimensions.width}
                            x={0}
                            y={fallingCookieImageItem.y}
                            ref={(node) => {
                                fallingCookiesFullImageRefs.current[fallingCookieImageItem.id] = node;
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
                            image={cookieHalo}
                            x={0}
                            y={0}
                            width={300}
                            height={300}
                            offsetX={150}
                            offsetY={150}
                            ref={halo2Ref}
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
                            onTouchStart={handleClickOnCookie}
                            onMouseDown={mouseDownOnCookie}
                            ref={cookieRef}
                        />
                    </Group>

                    {Array.from({ length: upgrades[0].boughtCount }).map((_, i) => {
                        return (
                            <KonvaImage
                                key={i}
                                image={cursor}
                                crop={{
                                    x: 0,
                                    y: 0,
                                    width: 326,
                                    height: 326,
                                }}
                                width={30}
                                height={30}
                                x={dimensions.width / 2}
                                y={dimensions.height / 2}
                                offsetX={25}
                                offsetY={25}
                                ref={(node) => {
                                    cursorRefs.current[i] = node;
                                }}
                            />
                        );
                    })}

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
                            text={`${formatNumber(displayedCount)} cookies`}
                            x={10}
                            y={20}
                            fill="white"
                            fontSize={32}
                            fontFamily="Arial"
                            shadowColor="black"
                            shadowBlur={6}
                            shadowOffsetX={0}
                            shadowOffsetY={2}
                        />
                        <Text
                            text={`per second: ${formatNumber(cookiesPerSecond)}`}
                            x={10}
                            y={60}
                            fill="white"
                            fontSize={24}
                            fontFamily="Arial"
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOffsetX={1}
                            shadowOffsetY={3}
                        />
                    </Group>

                    {fadingTexts.map((text) => (
                        <Text
                            key={text.id}
                            text={`+${formatNumber(parseInt(text.text))}`}
                            x={text.x}
                            y={text.y}
                            fill="white"
                            fontSize={32}
                            opacity={text.opacity}
                            onClick={handleClickOnCookie}
                            onTouchStart={handleClickOnCookie}
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

                    <AnimatedGroup style={props}>
                        <Shape
                            ref={waveRef}
                            fill="rgba(238, 221, 238, 0.8)"
                            stroke="white"
                            strokeWidth={1}
                        />
                    </AnimatedGroup>
                </Layer>
            </Stage>
        </div>
    );
};

export default CookieContainer;

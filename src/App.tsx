import React, { useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group } from "react-konva";
import useImage from "use-image";

const App = () => {
    const [cookie] = useImage("https://opengameart.org/sites/default/files/styles/medium/public/Cookie.png");
    const [cookieHalo] = useImage("https://orteil.dashnet.org/cookieclicker/img/shine.png");
    const [bg] = useImage("https://wallpapercave.com/wp/wp7667538.jpg");

    const [cookiesCount, setCookiesCount] = useState(0);
    const [cookiesPerClick, setCookiesPerClick] = useState(1);
    const [multiplier, setMultiplier] = useState(1);

    const w = window.innerWidth;
    const h = window.innerHeight;

    const haloRef = useRef<any>(null);
    const [scrollY1, setScrollY1] = useState(0);
    const [scrollY2, setScrollY2] = useState(0);

    useEffect(() => {
        if (haloRef.current) {
            const anim = new Konva.Animation((frame: any) => {
                const angleDiff = (frame.timeDiff * 90) / 5000;
                haloRef.current.rotate(angleDiff);
            }, haloRef.current.getLayer());

            anim.start();
        }
    }, []);

    const handleClickOnCookie = () => {
        const addedNewCookies = cookiesPerClick * multiplier;
        setCookiesCount((prev) => prev + addedNewCookies);
        setCookiesPerClick(addedNewCookies);
    };

    return (
        <Stage
            width={w}
            height={h}
        >
            <Layer>
                <KonvaImage image={bg} />
                <KonvaImage
                    image={cookieHalo}
                    x={w / 3 / 2}
                    y={h / 2}
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
                    x={w / 3 / 2}
                    y={h / 1.8}
                    offsetX={150}
                    offsetY={150}
                    onClick={handleClickOnCookie}
                />
                <Rect
                    width={w / 3 / 1.5}
                    height={100}
                    x={80}
                    y={150}
                    fill="white"
                    opacity={0.5}
                    cornerRadius={10}
                />
                <Text
                    text={`Cookies ${cookiesCount.toString()}`}
                    x={150}
                    y={150}
                    fill="white"
                    fontSize={32}
                    fontFamily="Maname"
                />
                <Text
                    text={`Cookies per second +${cookiesPerClick.toString()}`}
                    x={120}
                    y={210}
                    fill="white"
                    fontSize={24}
                    fontFamily="Maname"
                />
                <Rect
                    width={10}
                    height={h}
                    x={w / 3}
                    fill="darkgreen"
                />

                <Group y={-scrollY1}>
                    {Array.from({ length: 30 }).map((_, i) => (
                        <Rect
                            key={i}
                            x={w / 3 + 50}
                            y={i * 110}
                            width={w / 3 / 1.2}
                            height={100}
                            fill="white"
                            opacity={0.5}
                            cornerRadius={10}
                        />
                    ))}
                </Group>
                <Rect
                    width={10}
                    height={h}
                    x={(w / 3) * 2}
                    fill="darkgreen"
                />
                <Group y={-scrollY2}>
                    {Array.from({ length: 30 }).map((_, i) => (
                        <Rect
                            key={i}
                            x={(w / 3) * 2 + 50}
                            y={i * 110}
                            width={w / 3 / 1.2}
                            height={100}
                            fill="white"
                            opacity={0.5}
                            cornerRadius={10}
                        />
                    ))}
                </Group>
            </Layer>
        </Stage>
    );
};

export default App;

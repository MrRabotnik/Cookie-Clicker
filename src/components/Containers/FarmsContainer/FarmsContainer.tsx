import React, { useEffect, useRef, useState } from "react";
import "./FarmContainer.scss";
import FarmItem from "../../FarmItem/FarmItem";
import IMAGES from "../../../utils/images";
import { useCookies } from "../../../App";
import axios from "axios";

const FarmsContainer = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const divRef = useRef(null);
    const [randomText, setRandomText] = useState("");
    const [author, setAuthor] = useState("");
    const [update, setUpdate] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const { upgrades, saveAll, deleteAll } = useCookies();

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
        let timeOut: any;
        axios
            .get(`https://cookieclicker-3181a99ad544.herokuapp.com/api/random-quote/`)
            .then((res: any) => {
                setRandomText(res.data.data.text);
                setAuthor(res.data.data.author);
                timeOut = setTimeout(() => {
                    setUpdate((prev) => !prev);
                }, 10000);
            })
            .catch((err: any) => {
                console.log(err);
            });

        return () => {
            clearTimeout(timeOut);
        };
    }, [update]);

    return (
        <section
            className="farms-container"
            ref={divRef}
        >
            <div className="farm-container-header">
                <div
                    className="farm-header-sides options"
                    style={{ backgroundImage: `url(${IMAGES.farmHeaderBg})` }}
                    onClick={() => {
                        setIsOptionsOpen((prev) => !prev);
                    }}
                >
                    <p>Options</p>
                </div>
                <div
                    className="random-texts"
                    onClick={() => setUpdate((prev) => !prev)}
                >
                    <p>"{randomText}"</p>
                    {author.length ? <p className="author">-{author}</p> : ""}
                </div>
            </div>
            <div
                className="line-horizontal"
                style={{ backgroundImage: `url(${IMAGES.panelHorizontal})` }}
            ></div>
            <div className="farm-items-scrollable">
                {isOptionsOpen && (
                    <div
                        className="options-container"
                        style={{ backgroundImage: `url(${IMAGES.darkNoise})` }}
                    >
                        <hr />
                        <h1>OPTIONS</h1>
                        <hr />
                        <div className="buttons-container">
                            <button
                                className="save-data"
                                onClick={saveAll}
                            >
                                Save data
                            </button>
                            <button
                                className="delete-save"
                                onClick={deleteAll}
                            >
                                Delete save
                            </button>
                        </div>
                    </div>
                )}
                {upgrades.map((upgrade: any, index: number) => {
                    return (
                        upgrade.boughtCount > 0 &&
                        index > 0 && (
                            <React.Fragment key={index}>
                                <FarmItem
                                    dimensions={dimensions}
                                    item={upgrade}
                                />
                                <div
                                    className="line-horizontal"
                                    style={{ backgroundImage: `url(${IMAGES.panelHorizontal})` }}
                                ></div>
                            </React.Fragment>
                        )
                    );
                })}
            </div>
        </section>
    );
};

export default FarmsContainer;

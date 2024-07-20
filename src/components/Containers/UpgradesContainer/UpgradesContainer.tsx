import React, { useEffect, useRef, useState } from "react";
import "./UpgradesContainer.scss";
import MultiplierItem from "../../MultiplierItem/MultiplierItem";
import UpgradeItem from "../../UpgradeItem/UpgradeItem";
import { useCookies } from "../../../App";
import IMAGES from "../../../utils/images";

const UpgradesContainer = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const divRef = useRef(null);

    const { upgrades, updateUpgrades, multipliers } = useCookies();

    const [buying, setBuying] = useState(true);
    const [buySellMultiplier, setBuySellMultiplier] = useState(1);

    useEffect(() => {
        if (divRef.current) {
            const { offsetWidth, offsetHeight } = divRef.current;
            setDimensions({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    return (
        <section
            className="upgrades-container"
            ref={divRef}
        >
            <h1>Store</h1>
            <div
                className="line-horizontal"
                style={{ backgroundImage: `url(${IMAGES.woodBg})` }}
            ></div>
            <div className="multipliers-container">
                {multipliers.map((multiplier: any) => {
                    return (
                        <MultiplierItem
                            key={multiplier.label}
                            dimensions={dimensions}
                            item={multiplier}
                        />
                    );
                })}
            </div>
            <div className="control-container">
                <span>
                    <p
                        className={buying ? "active" : "inactive"}
                        onClick={() => setBuying(true)}
                    >
                        Buy
                    </p>
                    <p
                        className={buying ? "inactive" : "active"}
                        onClick={() => setBuying(false)}
                    >
                        Sell
                    </p>
                </span>
                <div onClick={() => setBuySellMultiplier(1)}>
                    <p className={buySellMultiplier === 1 ? "active" : "inactive"}>1</p>
                </div>
                <div onClick={() => setBuySellMultiplier(10)}>
                    <p className={buySellMultiplier === 10 ? "active" : "inactive"}>10</p>
                </div>
                <div onClick={() => setBuySellMultiplier(100)}>
                    <p className={buySellMultiplier === 100 ? "active" : "inactive"}>100</p>
                </div>
            </div>
            {upgrades.map((upgrade: any, index: number) => {
                return (
                    <UpgradeItem
                        key={index}
                        dimensions={dimensions}
                        updateUpgrades={updateUpgrades}
                        upgrade={upgrade}
                        position={index}
                        buying={buying}
                        buySellMultiplier={buySellMultiplier}
                    />
                );
            })}
        </section>
    );
};

export default UpgradesContainer;

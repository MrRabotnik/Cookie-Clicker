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

    // const sortedMultipliers = multipliers.sort((a: any, b: any) => a.price - b.price);

    const [buying, setBuying] = useState(true);
    const [buySellMultiplier, setBuySellMultiplier] = useState(1);

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

    return (
        <section
            className="upgrades-container"
            ref={divRef}
        >
            <h1>Store</h1>
            <div
                className="line-horizontal"
                style={{ backgroundImage: `url(${IMAGES.panelHorizontal})` }}
            ></div>
            <div className="multipliers-container">
                {multipliers.map((multiplier: any, index: number) => {
                    const foundUpgrade = upgrades.find((upgrade: any) => upgrade.category === multiplier.category);
                    const isAvailable = foundUpgrade?.boughtCount >= multiplier.unlocksAt;

                    return (
                        !multiplier.bought &&
                        isAvailable && (
                            <MultiplierItem
                                key={index}
                                dimensions={dimensions}
                                item={multiplier}
                                position={index}
                            />
                        )
                    );
                })}
            </div>
            <div className="control-container">
                <span>
                    <p
                        className={buying ? "active" : "inactive"}
                        onClick={() => setBuying(true)}
                        onTouchStart={() => setBuying(true)}
                    >
                        Buy
                    </p>
                    <p
                        className={buying ? "inactive" : "active"}
                        onClick={() => setBuying(false)}
                        onTouchStart={() => setBuying(false)}
                    >
                        Sell
                    </p>
                </span>
                <div
                    onClick={() => setBuySellMultiplier(1)}
                    onTouchStart={() => setBuySellMultiplier(1)}
                >
                    <p className={buySellMultiplier === 1 ? "active" : "inactive"}>1</p>
                </div>
                <div
                    onClick={() => setBuySellMultiplier(10)}
                    onTouchStart={() => setBuySellMultiplier(1)}
                >
                    <p className={buySellMultiplier === 10 ? "active" : "inactive"}>10</p>
                </div>
                <div
                    onClick={() => setBuySellMultiplier(100)}
                    onTouchStart={() => setBuySellMultiplier(1)}
                >
                    <p className={buySellMultiplier === 100 ? "active" : "inactive"}>100</p>
                </div>
            </div>
            {upgrades.map((upgrade: any, index: number) => {
                let misteriousUpgrade = {
                    ...upgrade,
                    label: "???",
                    price: ["???"],
                    description: "???",
                };

                if (index > 1) {
                    if (upgrade.boughtCount > 0 || upgrades[index - 1].boughtCount !== 0) {
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
                    } else if (upgrades[index - 1].boughtCount === 0 && upgrades[index - 2].boughtCount !== 0) {
                        return (
                            <UpgradeItem
                                key={index}
                                dimensions={dimensions}
                                updateUpgrades={updateUpgrades}
                                upgrade={misteriousUpgrade}
                                position={index}
                                buying={buying}
                                buySellMultiplier={buySellMultiplier}
                                shouldBeDark={true}
                            />
                        );
                    }
                } else {
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
                }

                return null;
            })}
        </section>
    );
};

export default UpgradesContainer;

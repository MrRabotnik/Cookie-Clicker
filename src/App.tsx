import CookieContainer from "./components/Containers/CookieContainer/CookieContainer";
import FarmsContainer from "./components/Containers/FarmsContainer/FarmsContainer";
import UpgradesContainer from "./components/Containers/UpgradesContainer/UpgradesContainer";
import Header from "./components/Containers/Header/Header";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCookiesFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from "./utils/saveInLocalStorage";
import UPGRADES from "./utils/upgrades";
import MULTIPLIERS from "./utils/multipliers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMAGES from "./utils/images";

const CookiesContext = createContext<any>(undefined);

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (!context) {
        throw new Error("useCookies must be used within a CookiesProvider");
    }
    return context;
};

const App = () => {
    const cookiesCountFromLocalStorage = getCookiesFromLocalStorage("cookies_count");
    const clicksPerSecondFromLocalStorage = getCookiesFromLocalStorage("cookies_per_second");
    const cookiesPerClickFromLocalStorage = getCookiesFromLocalStorage("cookies_per_click");
    const multiplierCountFromLocalStorage = getCookiesFromLocalStorage("multiplier");
    const upgradesFromLocalStorage: any = getCookiesFromLocalStorage("upgrades");
    const multipliersFromLocalStorage: any = getCookiesFromLocalStorage("multipliers");

    const jsonParsedUpgrades = JSON.parse(upgradesFromLocalStorage);
    const jsonParsedMultipliers = JSON.parse(multipliersFromLocalStorage);

    const UPGRADES_MERGED = UPGRADES.map((item, index) => {
        return {
            ...item,
            ...jsonParsedUpgrades?.[index],
        };
    });
    const MULTIPLIERS_MERGED = MULTIPLIERS.map((item, index) => {
        return {
            ...item,
            ...jsonParsedMultipliers?.[index],
        };
    });

    const cookiesPerSecondRef = useRef<number>(0);
    const cookiesCountRef = useRef<number>(0);
    const cookiesPerClickRef = useRef<number>(0);
    const multiplierRef = useRef<any>(1);
    const upgradesRef = useRef<any>([]);
    const multipliersRef = useRef<any>([]);

    const [upgrades, setUpgrades] = useState(upgradesFromLocalStorage ? UPGRADES_MERGED : UPGRADES);
    const [multipliers, setMultipliers] = useState(multipliersFromLocalStorage ? MULTIPLIERS_MERGED : MULTIPLIERS);

    const [cookiesCount, setCookiesCount] = useState(
        cookiesCountFromLocalStorage && !isNaN(parseInt(cookiesCountFromLocalStorage))
            ? parseInt(cookiesCountFromLocalStorage)
            : 0
    );
    const [cookiesPerClick, setCookiesPerClick] = useState(
        cookiesPerClickFromLocalStorage ? parseInt(cookiesPerClickFromLocalStorage) : 1
    );
    const [cookiesPerSecond, setCookiesPerSecond] = useState(
        clicksPerSecondFromLocalStorage ? parseFloat(clicksPerSecondFromLocalStorage) : 0
    );
    const [multiplier, setMultiplier] = useState(
        multiplierCountFromLocalStorage ? parseInt(multiplierCountFromLocalStorage) : 1
    );

    const saveAll = () => {
        saveInLocalStorage("cookies_count", cookiesCountRef.current);
        saveInLocalStorage("cookies_per_second", cookiesPerSecondRef.current);
        saveInLocalStorage("multiplier", JSON.stringify(multiplierRef.current));
        saveInLocalStorage("cookies_per_click", JSON.stringify(cookiesPerClickRef.current));
        saveInLocalStorage(
            "upgrades",
            JSON.stringify(
                upgradesRef.current.map((item: any) => {
                    return {
                        value: item.value,
                        boughtCount: item.boughtCount,
                        multiplier: item.multiplier,
                    };
                })
            )
        );
        saveInLocalStorage(
            "multipliers",
            JSON.stringify(
                multipliersRef.current.map((item: any) => {
                    return {
                        bought: item.bought,
                    };
                })
            )
        );
        toast.success("Saved");
    };

    const deleteAll = () => {
        removeFromLocalStorage("cookies_count");
        removeFromLocalStorage("cookies_per_second");
        removeFromLocalStorage("multiplier");
        removeFromLocalStorage("cookies_per_click");
        removeFromLocalStorage("upgrades");
        removeFromLocalStorage("multipliers");
        toast.error("REMOVED ALL DATA");
    };

    useEffect(() => {
        const x = setInterval(() => {
            setCookiesCount((prev: number) => prev + cookiesPerSecondRef.current);
        }, 1000);

        const saveCookies = setInterval(() => {
            saveAll();
        }, 60000);

        const handleKeyDown = (event: any) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                saveAll();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(x);
            clearInterval(saveCookies);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        cookiesCountRef.current = cookiesCount;
        cookiesPerSecondRef.current = cookiesPerSecond;
        cookiesPerClickRef.current = cookiesPerClick;
        multiplierRef.current = multiplier;
        upgradesRef.current = upgrades;
        multipliersRef.current = multipliers;
    }, [cookiesCount, cookiesPerSecond, multiplier, upgrades, multipliers, cookiesPerClick]);

    const updateUpgrades = (label: string, updatedUpgrade: any) => {
        const arr = upgrades.map((upgrade: any) => {
            if (upgrade.label === label) {
                upgrade = {
                    ...upgrade,
                    ...updatedUpgrade,
                };
            }

            return upgrade;
        });

        setUpgrades(arr);
    };

    const updateMultipliers = (label: string, updatedUpgrade: any) => {
        const arr = multipliers.map((multiplierItem: any) => {
            if (multiplierItem.label === label) {
                multiplierItem = {
                    ...multiplierItem,
                    ...updatedUpgrade,
                };
            }

            return multiplierItem;
        });

        setMultipliers(arr);
    };

    return (
        <>
            <ToastContainer
                position="bottom-center"
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
            <Header></Header>
            <div
                className="game-wrapper"
                style={{ backgroundImage: `url(${IMAGES.bg})` }}
            >
                <CookiesContext.Provider
                    value={{
                        saveAll,
                        deleteAll,

                        upgrades,
                        updateUpgrades,

                        cookiesCount: cookiesCount.toFixed(0),
                        setCookiesCount,

                        cookiesPerClick,
                        setCookiesPerClick,

                        cookiesPerSecond: cookiesPerSecond.toFixed(1),
                        setCookiesPerSecond,

                        multiplier,
                        setMultiplier,

                        multipliers,
                        updateMultipliers,
                    }}
                >
                    <CookieContainer></CookieContainer>
                    <div
                        className="line-vertical"
                        style={{ backgroundImage: `url(${IMAGES.panelVertical})` }}
                    ></div>
                    <FarmsContainer></FarmsContainer>
                    <div
                        className="line-vertical"
                        style={{ backgroundImage: `url(${IMAGES.panelVertical})` }}
                    ></div>
                    <UpgradesContainer></UpgradesContainer>
                </CookiesContext.Provider>
            </div>
        </>
    );
};

export default App;

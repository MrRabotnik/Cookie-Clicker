import CookieContainer from "./components/Containers/CookieContainer/CookieContainer";
import FarmsContainer from "./components/Containers/FarmsContainer/FarmsContainer";
import UpgradesContainer from "./components/Containers/UpgradesContainer/UpgradesContainer";
import Header from "./components/Containers/Header/Header";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCookiesFromLocalStorage, saveInLocalStorage } from "./utils/saveInLocalStorage";
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
    const multiplierCountFromLocalStorage = getCookiesFromLocalStorage("multiplier");
    const upgradesFromLocalStorage = getCookiesFromLocalStorage("upgrades");
    const multipliersFromLocalStorage = getCookiesFromLocalStorage("multipliers");

    const cookiesPerSecondRef = useRef<number>(0);
    const cookiesCountRef = useRef<number>(0);
    const multiplierRef = useRef<any>(1);
    const upgradesRef = useRef<any>([]);
    const multipliersRef = useRef<any>([]);

    const [upgrades, setUpgrades] = useState(
        upgradesFromLocalStorage ? JSON.parse(upgradesFromLocalStorage) : UPGRADES
    );
    const [multipliers, setMultipliers] = useState(
        multipliersFromLocalStorage ? JSON.parse(multipliersFromLocalStorage) : MULTIPLIERS
    );

    const [cookiesCount, setCookiesCount] = useState(
        cookiesCountFromLocalStorage && !isNaN(parseInt(cookiesCountFromLocalStorage))
            ? parseInt(cookiesCountFromLocalStorage)
            : 0
    );
    const [cookiesPerClick, setCookiesPerClick] = useState(1);
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
        saveInLocalStorage("upgrades", JSON.stringify(upgradesRef.current));
        saveInLocalStorage("multipliers", JSON.stringify(multipliersRef.current));
        toast.success("Saved");
    };

    useEffect(() => {
        const x = setInterval(() => {
            setCookiesCount((prev: number) => prev + cookiesPerSecondRef.current);
        }, 1000);

        // const saveCookies = setInterval(() => {
        //     saveAll();
        // }, 60000);

        const handleKeyDown = (event: any) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                saveAll();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(x);
            // clearInterval(saveCookies);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        cookiesCountRef.current = cookiesCount;
        cookiesPerSecondRef.current = cookiesPerSecond;
        multiplierRef.current = multiplier;
        upgradesRef.current = upgrades;
        multipliersRef.current = multipliers;
    }, [cookiesCount, cookiesPerSecond, multiplier, upgrades, multipliers]);

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
                        style={{ backgroundImage: `url(${IMAGES.woodBg})` }}
                    ></div>
                    <FarmsContainer></FarmsContainer>
                    <div
                        className="line-vertical"
                        style={{ backgroundImage: `url(${IMAGES.woodBg})` }}
                    ></div>
                    <UpgradesContainer></UpgradesContainer>
                </CookiesContext.Provider>
            </div>
        </>
    );
};

export default App;

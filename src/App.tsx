import CookieContainer from "./components/Containers/CookieContainer/CookieContainer";
import FarmsContainer from "./components/Containers/FarmsContainer/FarmsContainer";
import UpgradesContainer from "./components/Containers/UpgradesContainer/UpgradesContainer";
import Header from "./components/Containers/Header/Header";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCookiesFromLocalStorage, saveInLocalStorage } from "./utils/saveInLocalStorage";
import UPGRADES from "./utils/upgrades";

const CookiesContext = createContext<any>(undefined);

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (!context) {
        throw new Error("useCookies must be used within a CookiesProvider");
    }
    return context;
};

const App = () => {
    const { count, perSecond } = getCookiesFromLocalStorage();
    const cookiesPerSecondRef = useRef<number>(0);
    const cookiesCountRef = useRef<number>(0);

    const [upgrades, setUpgrades] = useState(UPGRADES);
    const [cookiesCount, setCookiesCount] = useState(count ? parseInt(count) : 0);
    const [cookiesPerClick, setCookiesPerClick] = useState(1);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(perSecond ? parseInt(perSecond) : 0);
    const [multiplier, setMultiplier] = useState(1);

    useEffect(() => {
        const x = setInterval(() => {
            setCookiesCount((prev: number) => prev + cookiesPerSecondRef.current);
        }, 1000);

        const saveCookies = setInterval(() => {
            saveInLocalStorage(cookiesCountRef.current, cookiesPerSecondRef.current);
        }, 10000);

        return () => {
            clearInterval(x);
            clearInterval(saveCookies);
        };
    }, []);

    useEffect(() => {
        cookiesCountRef.current = cookiesCount;
    }, [cookiesCount]);

    useEffect(() => {
        cookiesPerSecondRef.current = cookiesPerSecond;
    }, [cookiesPerSecond]);

    const updateUpgrades = (label: string, updatedUpgrade: any) => {
        const arr = upgrades.map((upgrade) => {
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

    return (
        <>
            <Header></Header>
            <div className="game-wrapper">
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
                    }}
                >
                    <CookieContainer></CookieContainer>
                    <div className="line-vertical"></div>
                    <FarmsContainer></FarmsContainer>
                    <div className="line-vertical"></div>
                    <UpgradesContainer></UpgradesContainer>
                </CookiesContext.Provider>
            </div>
        </>
    );
};

export default App;

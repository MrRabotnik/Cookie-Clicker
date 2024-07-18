import CookieContainer from "./components/Containers/CookieContainer/CookieContainer";
import FarmsContainer from "./components/Containers/FarmsContainer/FarmsContainer";
import UpgradesContainer from "./components/Containers/UpgradesContainer/UpgradesContainer";
import Header from "./components/Containers/Header/Header";

const App = () => {
    return (
        <>
            <Header></Header>
            <div className="game-wrapper">
                <CookieContainer></CookieContainer>
                <div className="line-vertical"></div>
                <FarmsContainer></FarmsContainer>
                <div className="line-vertical"></div>
                <UpgradesContainer></UpgradesContainer>
            </div>
        </>
    );
};

export default App;

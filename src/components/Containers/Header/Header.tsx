import React from "react";
import "./Header.scss";
import IMAGES from "../../../utils/images";

const Header = () => {
    return (
        <header style={{ backgroundImage: `url(${IMAGES.headerBg})` }}>
            <div>
                <a
                    href="https://terbalyants.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Portfolio
                </a>
            </div>

            <div>
                <a href="https://github.com/mrrabotnik">Author: MrRabotnik</a>
            </div>
        </header>
    );
};

export default Header;

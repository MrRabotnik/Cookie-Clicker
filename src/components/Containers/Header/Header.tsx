import React from "react";
import "./Header.scss";

const Header = () => {
    return (
        <header>
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

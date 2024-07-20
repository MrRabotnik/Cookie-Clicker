export const getCookiesFromLocalStorage = () => {
    const count = localStorage.getItem("cookies_count");
    const perSecond = localStorage.getItem("cookies_per_second");

    return { count, perSecond };
};

export const saveInLocalStorage = (cookiesCount, cookiesPerSecond) => {
    localStorage.setItem("cookies_count", cookiesCount);
    // localStorage.setItem("cookies_per_second", cookiesPerSecond);
};

export const removeFromLocalStorage = (item) => {
    localStorage.removeItem(item);
};

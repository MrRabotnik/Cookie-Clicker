export const getCookiesFromLocalStorage = (item) => {
    return localStorage.getItem(item);
};

export const saveInLocalStorage = (name, item) => {
    localStorage.setItem(name, item);
};

export const removeFromLocalStorage = (item) => {
    localStorage.removeItem(item);
};

import numeral from "numeral";

export const formatNumber = (number) => {
    let formatted;

    if (number < 1000 && number >= 0) {
        formatted = numeral(number).format("0.0");
    } else {
        formatted = numeral(number)
            .format("0.00a")
            .replace(/\.00([a-z])$/, "$1");
    }

    return formatted;
};

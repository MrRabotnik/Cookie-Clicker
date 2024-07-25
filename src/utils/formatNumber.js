import numeral from "numeral";

numeral.register("format", "largeNumbers", {
    regexps: {
        format: /0(\.0+)?[a-z]+/,
        unformat: /0(\.0+)?[a-z]+/,
    },
    format: function (value, format, roundingFunction) {
        const units = ["", "k", "m", "b", "t", "q", "Q", "s", "S", "o", "n", "d"];
        let unit = "";
        let power = 1;

        while (value >= 1000 && power < units.length - 1) {
            value /= 1000;
            power++;
        }

        unit = units[power];
        const output = numeral._.numberToFormat(value, format, roundingFunction);
        return output + unit;
    },
    unformat: function (string) {
        const units = { "": 0, k: 3, m: 6, b: 9, t: 12, q: 15, Q: 18, s: 21, S: 24, o: 27, n: 30, d: 33 };
        let multiplier = 1;
        let num = numeral._.stringToNumber(string);

        Object.keys(units).forEach(function (unit) {
            if (string.indexOf(unit) > -1) {
                multiplier = Math.pow(10, units[unit]);
            }
        });

        return num * multiplier;
    },
});

export const formatNumber = (number) => {
    let formatted;

    if (number % 1 === 0) {
        // Check if the number is an integer
        if (number <= 999999 && number >= 0) {
            // Format numbers between 1 and 999,999 without dividing or adding a letter
            formatted = numeral(number).format("0,0");
        } else {
            // Use custom format for numbers 1,000,000 and above
            formatted = numeral(number)
                .format("0a")
                .replace(/([a-z])$/, "$1");
        }
    } else {
        // If the number has a decimal part
        if (number <= 999999 && number >= 0) {
            // Format numbers between 1 and 999,999 without dividing or adding a letter
            formatted = numeral(number).format("0,0.0");
        } else {
            // Use custom format for numbers 1,000,000 and above
            formatted = numeral(number)
                .format("0.0a")
                .replace(/([a-z])$/, "$1");
        }
    }

    return formatted;
};

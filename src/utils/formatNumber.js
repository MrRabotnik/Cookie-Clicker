import numeral from "numeral";

numeral.register("format", "largeNumbers", {
    regexps: {
        format: /0(\.0+)?[a-z]+/,
        unformat: /0(\.0+)?[a-z]+/,
    },
    format: function (value, format, roundingFunction) {
        const units = [
            "",
            "k",
            "m",
            "b",
            "t",
            "q",
            "Q",
            "s",
            "S",
            "o",
            "n",
            "d",
            "U",
            "D",
            "T",
            "Qt",
            "Qd",
            "Sd",
            "St",
            "O",
            "N",
            "v",
            "c",
        ];
        let unit = "";
        let power = 0;

        while (value >= 1000 && power < units.length - 1) {
            value /= 1000;
            power++;
        }

        unit = units[power];
        const output = numeral._.numberToFormat(value, format, roundingFunction);
        return output + unit;
    },
    unformat: function (string) {
        const units = {
            "": 0,
            k: 3,
            m: 6,
            b: 9,
            t: 12,
            q: 15,
            Q: 18,
            s: 21,
            S: 24,
            o: 27,
            n: 30,
            d: 33,
            U: 36,
            D: 39,
            T: 42,
            Qt: 45,
            Qd: 48,
            Sd: 51,
            St: 54,
            O: 57,
            N: 60,
            v: 63,
            c: 66,
        };
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
        if (number < 10000 && number >= 0) {
            formatted = numeral(number).format("0,0");
        } else if (number < 1000000 && number >= 10000) {
            formatted = numeral(number).format("0,0");
        } else {
            formatted = numeral(number)
                .format("0.0a")
                .replace(/([a-z]+)$/, "$1");
        }
    } else {
        if (number < 10000 && number >= 0) {
            formatted = numeral(number).format("0,0.0");
        } else if (number < 1000000 && number >= 10000) {
            formatted = numeral(number).format("0,0");
        } else {
            formatted = numeral(number)
                .format("0.0a")
                .replace(/([a-z]+)$/, "$1");
        }
    }

    return formatted;
};

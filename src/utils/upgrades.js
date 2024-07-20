import IMAGES from "./images";

const UPGRADES = [
    {
        label: "Cursor",
        avatar: IMAGES.upgradeCursorIcon,
        price: generateValues(15, 1.15),
        description: "Each Cursor generates 0.1 cookies in 10s.",
        value: 0.1,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Grandma",
        avatar: IMAGES.upgradeGrandmaIcon,

        price: generateValues(100, 1.15),
        description: "Each Grandma generates 1 cookies in 10s.",
        value: 1,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Farm",
        avatar: IMAGES.upgradeFarmIcon,
        price: generateValues(1100, 1.15),
        description: "Each Farm generates 8 cookies in 10s.",
        value: 8,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Mine",
        avatar: IMAGES.upgradeMineIcon,
        price: generateValues(12000, 1.15),
        description: "Each Mine generates 47 cookies in 10s.",
        value: 47,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Factory",
        avatar: IMAGES.upgradeFactoryIcon,
        price: generateValues(130000, 1.15),
        description: "Each Factory generates 260 cookies in 10s.",
        value: 260,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Bank",
        avatar: IMAGES.upgradeBankIcon,
        price: generateValues(1400000, 1.15),
        description: "Each Bank generates 1400 cookies in 10s.",
        value: 1400,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Temple",
        avatar: IMAGES.upgradeTempleIcon,
        price: generateValues(20000000, 1.15),
        description: "Each Temple generates 7800 cookies in 10s.",
        value: 7800,
        boughtCount: 0,
        multiplier: 1,
    },
    // {
    //     label: "",
    //     avatar: "https://opengameart.org/sites/default/files/styles/medium/public/usine5-red.png",
    //     price: generateValues(330000000, 1.15),
    //     description: "Each  generates       cookies in 10s.",
    //     value: 1,
    //     boughtCount: 0,
    //     multiplier: 1,
    // },
];

export default UPGRADES;

function generateValues(initialValue, percentage) {
    const array = [];

    for (let i = 0; i < 1000; i++) {
        array.push(initialValue.toFixed(0));
        initialValue *= percentage;
    }

    return array;
}

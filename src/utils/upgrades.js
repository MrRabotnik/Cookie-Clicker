const UPGRADES = [
    {
        label: "Cursor",
        avatar: "https://opengameart.org/sites/default/files/styles/medium/public/3_5.png",
        price: generateValues(15),
        description: "Each cursor generates 0.1 cookies in 10s.",
        value: 0.1,
        boughtCount: 0,
    },
    {
        label: "Grandma",
        avatar: "https://opengameart.org/sites/default/files/styles/medium/public/profile_0.png",
        price: generateValues(100),
        description: "Each Grandma generates 1 cookies in 10s.",
        value: 1,
        boughtCount: 0,
    },
    {
        label: "Factory",
        avatar: "https://opengameart.org/sites/default/files/styles/medium/public/usine5-red.png",
        price: generateValues(500),
        description: "Each Factory generates 10 cookies in 10s.",
        value: 10,
        boughtCount: 0,
    },
];

export default UPGRADES;

function generateValues(initialValue) {
    const array = [];

    for (let i = 0; i < 100; i++) {
        array.push(initialValue.toFixed(0));
        initialValue *= 1.25; // Increase the value by 25%
    }

    return array;
}

import BigNumber from "bignumber.js";
import IMAGES from "./images";

const UPGRADES = [
    {
        label: "Cursor",
        category: "cursor",
        price: generateValues(15, 1.15),
        description: "Autoclicks once every 10 seconds",
        value: 0.1,
        bonusValue: 0,
        bonusMultiplier: 1,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Grandma",
        category: "grandma",
        buildingImage: IMAGES.grandmaBuilding,
        backgroundImage: IMAGES.grandmaFieldBg,
        price: generateValues(100, 1.15),
        description: "Each Grandma generates 1 cookies in 10s.",
        value: 1,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Farm",
        category: "farm",
        buildingImage: IMAGES.farmBuilding,
        backgroundImage: IMAGES.farmFieldBg,
        price: generateValues(1100, 1.15),
        description: "Each Farm generates 8 cookies in 10s.",
        value: 8,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Mine",
        category: "mine",
        buildingImage: IMAGES.mineBuilding,
        backgroundImage: IMAGES.mineFieldBg,
        price: generateValues(12000, 1.15),
        description: "Each Mine generates 47 cookies in 10s.",
        value: 47,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Factory",
        category: "factory",
        buildingImage: IMAGES.factoryBuilding,
        backgroundImage: IMAGES.factoryFieldBg,
        price: generateValues(130000, 1.15),
        description: "Each Factory generates 260 cookies in 10s.",
        value: 260,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Bank",
        category: "bank",
        buildingImage: IMAGES.bankBuilding,
        backgroundImage: IMAGES.bankFieldBg,
        price: generateValues(1400000, 1.15),
        description: "Each Bank generates 1400 cookies in 10s.",
        value: 1400,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Temple",
        category: "temple",
        buildingImage: IMAGES.templeBuilding,
        backgroundImage: IMAGES.templeFieldBg,
        price: generateValues(20000000, 1.15),
        description: "Each Temple generates 7800 cookies in 10s.",
        value: 7800,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Wizard tower",
        category: "wizard-tower",
        buildingImage: IMAGES.wizardTowerBuilding,
        backgroundImage: IMAGES.wizardTowerFieldBg,
        price: generateValues(330000000, 1.15),
        description: "Each  generates 44000 cookies in 10s.",
        value: 44000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Shipment",
        category: "shipment",
        buildingImage: IMAGES.shipmentBuilding,
        backgroundImage: IMAGES.shipmentFieldBg,
        price: generateValues(5100000000, 1.15),
        description: "Each  generates 260000 cookies in 10s.",
        value: 260000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Alchemy Lab",
        category: "alchemy-lab",
        buildingImage: IMAGES.alchemyLabBuilding,
        backgroundImage: IMAGES.alchemyLabFieldBg,
        price: generateValues(75000000000, 1.15),
        description: "Each  generates 1600000 cookies in 10s.",
        value: 1600000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Portal",
        category: "portal",
        buildingImage: IMAGES.portalBuilding,
        backgroundImage: IMAGES.portalFieldBg,
        price: generateValues(1000000000000, 1.15),
        description: "Each  generates 10000000 cookies in 10s.",
        value: 10000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Time Machine",
        category: "time-machine",
        buildingImage: IMAGES.timeMachineBuilding,
        backgroundImage: IMAGES.timeMachineFieldBg,
        price: generateValues(14000000000000, 1.15),
        description: "Each  generates 65000000 cookies in 10s.",
        value: 65000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Antimatter Condenser",
        category: "antimatter-condenser",
        buildingImage: IMAGES.antimatterCondenserBuilding,
        backgroundImage: IMAGES.antimatterCondenserFieldBg,
        price: generateValues(170000000000000, 1.15),
        description: "Each  generates 430000000 cookies in 10s.",
        value: 430000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Prism",
        category: "prism",
        buildingImage: IMAGES.prismBuilding,
        backgroundImage: IMAGES.prismFieldBg,
        price: generateValues("21000000000000000", 1.15),
        description: "Each  generates 29000000000 cookies in 10s.",
        value: 29000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Chancemaker",
        category: "chancemaker",
        buildingImage: IMAGES.chancemakerBuilding,
        backgroundImage: IMAGES.chancemakerFieldBg,
        price: generateValues("26000000000000000", 1.15),
        description: "Each  generates 21000000000 cookies in 10s.",
        value: 21000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Fractal Engine",
        category: "fractal-engine",
        buildingImage: IMAGES.fractalEngineBuilding,
        backgroundImage: IMAGES.fractalEngineFieldBg,
        price: generateValues("310000000000000000", 1.15),
        description: "Each  generates 150000000000 cookies in 10s.",
        value: 150000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Javascript Console",
        category: "javascript-console",
        buildingImage: IMAGES.javascriptConsoleBuilding,
        backgroundImage: IMAGES.javascriptConsoleFieldBg,
        price: generateValues("71000000000000000000", 1.15),
        description: "Each  generates 11000000000000 cookies in 10s.",
        value: 11000000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Idleverse",
        category: "idleverse",
        buildingImage: IMAGES.idleverseBuilding,
        backgroundImage: IMAGES.idleverseFieldBg,
        price: generateValues("12000000000000000000000", 1.15),
        description: "Each  generates 83000000000000 cookies in 10s.",
        value: 83000000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "Cortex Baker",
        category: "cortex-baker",
        buildingImage: IMAGES.cortexBakerBuilding,
        backgroundImage: IMAGES.cortexBakerFieldBg,
        price: generateValues("19000000000000000000000000", 1.15),
        description: "Each  generates 64000000000000 cookies in 10s.",
        value: 64000000000000,
        boughtCount: 0,
        multiplier: 1,
    },
    {
        label: "You",
        category: "you",
        buildingImage: IMAGES.youBuilding,
        backgroundImage: IMAGES.youFieldBg,
        price: generateValues("540000000000000000000000000", 1.15),
        description: "Each  generates 510000000000000 cookies in 10s.",
        value: 510000000000000,
        boughtCount: 0,
        multiplier: 1,
    },
];

export default UPGRADES;

function generateValues(initialValue, percentage) {
    const array = [];
    let value = new BigNumber(initialValue);
    const percentageValue = new BigNumber(percentage);

    for (let i = 0; i < 600; i++) {
        array.push(value.toFixed(0));
        value = value.multipliedBy(percentageValue);
    }

    return array;
}

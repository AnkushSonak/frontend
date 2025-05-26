import data from '../assets/list.with.modifiers.json';

const EMOJIS = data.emojis;

let supported = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? 'apple' : 'windows';

export const generateSmileysAndPeople = (): string[] => {

    const smileysAndPeople = EMOJIS.filter((emoji) => {
        if (emoji.category === "Smileys & Emotion" || emoji.category === "People & Body") {
            return emoji
        }
    }).map((emoji) => emoji.emoji);

    return smileysAndPeople;
}

export const generateAnimalAndNature = (): string[] => {

    const animalAndNature = EMOJIS.filter((emoji) => {
        if (emoji.category === "Animals & Nature") {
            return emoji
        }
    }).map((emoji) => emoji.emoji);

    return animalAndNature;
}

export const generateFoodAndDrink = () => {

    const foodAndDrink = EMOJIS.filter((emoji) => {
        if (emoji.category === "Food & Drink") {
            return emoji
        }
    }).map((emoji) => emoji);

    return foodAndDrink;
}

export const generateActivities = () => {

    const activities = EMOJIS.filter((emoji) => {
        if (emoji.category === "Activities") {
            return emoji
        }
    }).map((emoji) => emoji);

    return activities;
}

export const generateTravelAndPlaces = () => {

    const travelAndPlaces = EMOJIS.filter((emoji) => {
        if (emoji.category === "Travel & Places") {
            return emoji
        }
    }).map((emoji) => emoji);

    return travelAndPlaces;
}

export const generateObjects = () => {

    const objects = EMOJIS.filter((emoji) => {
        if (emoji.category === "Objects") {
            return emoji
        }
    }).map((emoji) => emoji);

    return objects;
}

export const generateSymbols = () => {

    const symbols = EMOJIS.filter((emoji) => {
        if (emoji.category === "Symbols") {
            return emoji
        }
    }).map((emoji) => emoji);

    return symbols;
}

export const generateFlags = () => {

    const flags = EMOJIS.filter((emoji) => {
        if (emoji.category === "Flags") {
            return emoji
        }
    }).map((emoji) => emoji);

    return flags;
}
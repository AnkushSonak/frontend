import data from '../assets/list.with.modifiers.json';
import dataWithImage from '../assets/list.with.images.json';

const EMOJIS = (data as any).emojis;
const EMOJIS_IMG = (data as any).emojis;

let supported = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? 'apple' : 'windows';

interface EmojiData {
    emoji: string,
    name: string
}

console.log(JSON.stringify(EMOJIS + "++++" + EMOJIS_IMG));
export const generateSmileysAndPeople = (): EmojiData[] => {

    const smileysAndPeople = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Smileys & Emotion" || emoji.category === "People & Body") {
            return emoji
        }
    }).map((emoji: any) => {
        return {
            emoji: emoji.emoji,
            name: emoji.name
        }
    }

    );

    return smileysAndPeople;
}

export const generateAnimalAndNature = (): string[] => {

    const animalAndNature = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Animals & Nature") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return animalAndNature;
}

export const generateFoodAndDrink = () => {

    const foodAndDrink = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Food & Drink") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return foodAndDrink;
}

export const generateActivities = () => {

    const activities = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Activities") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return activities;
}

export const generateTravelAndPlaces = () => {

    const travelAndPlaces = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Travel & Places") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return travelAndPlaces;
}

export const generateObjects = () => {

    const objects = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Objects") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return objects;
}

export const generateSymbols = () => {

    const symbols = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Symbols") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return symbols;
}

export const generateFlags = () => {

    const flags = EMOJIS.filter((emoji: any) => {
        if (emoji.category === "Flags") {
            return emoji
        }
    }).map((emoji: any) => emoji.emoji);

    return flags;
}

export const generateTopRow = () => {
    interface TopRowData {
        img: string,
        id: string
    }
    const data: TopRowData[] = [];
    for (let emoji of EMOJIS_IMG) {
        let images: any = emoji.image;
        if (emoji.name === "two o’clock") {
            data[0] = {
                img: images,
                id: "Recent"
            }
        }
        if (emoji.name === "grinning face") {
            data[1] = {
                img: images,
                id: "Smileys & people"
            }
        }
        if (emoji.name === "bear") {
            data[2] = {
                img: images,
                id: "Animals & nature"
            }
        }
        if (emoji.name === "hamburger") {
            data[3] = {
                img: images,
                id: "Food & drink"
            }
        }
        if (emoji.name === "soccer ball") {
            data[4] = {
                img: images,
                id: "Activity"
            }
        }
        if (emoji.name === "oncoming automobile") {
            data[5] = {
                img: images,
                id: "Travel & places"
            }
        }
        if (emoji.name === "light bulb") {
            data[6] = {
                img: images,
                id: "Objects"
            }
        }
        if (emoji.name === "input symbols") {
            data[7] = {
                img: images,
                id: "Symbols"
            }
        }
        if (emoji.name === "triangular flag") {
            data[8] = {
                img: images,
                id: "Flags"
            }
        }
    }
    // console.log("imgs : " + data);
    return data;
}

export const determineSkinToneColor = (currentSkinTone: string):string => {
    switch(currentSkinTone){
        case "light":
            return "rgb(247, 222, 206)";
        case "light-medium":
            return "rgb(243, 210, 162)";
        case "medium":
            return "rgb(213, 171, 136)";
        case "medium-dark":
            return "rgb(175, 126, 87)";
        case "dark":
            return "rgb(124, 83, 62)"
        default:
            return "rgb(255, 220, 93)";
    }
    

}
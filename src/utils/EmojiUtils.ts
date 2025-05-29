import data from '../assets/list.with.modifiers.json';
import dataWithImage from '../assets/list.with.images.json';

const EMOJIS = (data as any).emojis;
const EMOJIS_IMG = (data as any).emojis;

let supported = window.navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? 'apple' : 'windows';
console.log(JSON.stringify(EMOJIS + "++++" + EMOJIS_IMG));
export const generateSmileysAndPeople = (): string[] => {

    const smileysAndPeople = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Smileys & Emotion" || emoji.category === "People & Body") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return smileysAndPeople;
}

export const generateAnimalAndNature = (): string[] => {

    const animalAndNature = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Animals & Nature") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return animalAndNature;
}

export const generateFoodAndDrink = () => {

    const foodAndDrink = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Food & Drink") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return foodAndDrink;
}

export const generateActivities = () => {

    const activities = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Activities") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return activities;
}

export const generateTravelAndPlaces = () => {

    const travelAndPlaces = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Travel & Places") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return travelAndPlaces;
}

export const generateObjects = () => {

    const objects = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Objects") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return objects;
}

export const generateSymbols = () => {

    const symbols = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Symbols") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return symbols;
}

export const generateFlags = () => {

    const flags = EMOJIS.filter((emoji:any) => {
        if (emoji.category === "Flags") {
            return emoji
        }
    }).map((emoji:any) => emoji.emoji);

    return flags;
}

export const generateTopRow = () => {
    const imgs:string[] = [];
    for(let emoji of EMOJIS_IMG){
        let images: any = emoji.image;
        if(emoji.name === "two o’clock"){
            imgs[0] = images;
        }
        if(emoji.name === "grinning face"){
            imgs[1] = images;
        }
        if(emoji.name === "bear"){
            imgs[2] = images;
        }
        if(emoji.name === "hamburger"){
            imgs[3] = images;
        }
        if(emoji.name === "soccer ball"){
            imgs[4] = images;
        }
        if(emoji.name === "oncoming automobile"){
            imgs[5] = images;
        }
        if(emoji.name === "light bulb"){
            imgs[6] = images;
        }
        if(emoji.name === "input symbols"){
            imgs[7] = images;
        }
        if(emoji.name === "triangular flag"){
            imgs[8] = images;
        }
    }
    console.log("imgs : " + imgs);

    return imgs;
}
import React, { useEffect, useState } from "react";
import { generateActivities, generateAnimalAndNature, generateFlags, generateFoodAndDrink, generateObjects, generateSmileysAndPeople, generateSymbols, generateTopRow, generateTravelAndPlaces } from "../../utils/EmojiUtils";
import SearchIcon from '@mui/icons-material/Search';
import './EmojiDropDown.css';

export const EmojiDropDown: React.FC = () => {

    const [activeCategory, setActiveCategory] = useState<number>(1);
    const navigateToSection = (e: React.MouseEvent<HTMLDivElement>) => {
        switch (e.currentTarget.id) {
            case "0":
                setActiveCategory(0);
                const recent = document.getElementById("Recent");
                if (recent) recent.scrollIntoView();
                break;
            case "1":
                setActiveCategory(1)
                const smileys = document.getElementById("Smileys & people");
                if (smileys) smileys.scrollIntoView();
                break;
            case "2":
                setActiveCategory(2);
                const animals = document.getElementById("Animals & nature");
                if (animals) animals.scrollIntoView();
                break;
            case "3":
                setActiveCategory(3);
                const food = document.getElementById("Food & drink");
                if (food) food.scrollIntoView();
                break;
            case "4":
                setActiveCategory(4);
                const activity = document.getElementById("Activity");
                if (activity) activity.scrollIntoView();
                break;
            case "5":
                setActiveCategory(5);
                const travel = document.getElementById("Travel & places");
                if (travel) travel.scrollIntoView();
                break;
            case "6":
                setActiveCategory(6);
                const objects = document.getElementById("Objects");
                if (objects) objects.scrollIntoView();
                break;
            case "7":
                setActiveCategory(7);
                const symbols = document.getElementById("Symbols");
                if (symbols) symbols.scrollIntoView();
                break;
            default:
                setActiveCategory(8);
                const flags = document.getElementById("Flags");
                if (flags) flags.scrollIntoView();
        }
    }

    return (
        <div className="emoji-drop-down">
            <div className="emoji-drop-down-top">
                <div className="emoji-drop-down-top-search-border">
                    <SearchIcon sx={{
                        fontSize: "20px",
                        position: "absolute",
                        top: "14px",
                        left: "16px"
                    }} />
                    <input className="emoji-drop-down-search" id="emoji-search" placeholder="Search emojis" onChange={() => { }} />
                </div>
                <div className="emoji-drop-down-categories">
                    {generateTopRow().map((data, index) => {
                        if (activeCategory === index) {
                            return <div className="emoji-drop-down-category-wrapper">
                                <div className="emoji-drop-down-category emoji-active" id={`${index}`} style={{
                                    backgroundImage: `url("${data.img}")`,
                                }}></div>
                                <div className="emoji-drop-down-category-underline-active"></div>
                            </div>
                        } else {
                            return <div className="emoji-drop-down-category-wrapper">
                                <div className="emoji-drop-down-category emoji-inactive" id={`${index}`} style={{
                                    backgroundImage: `url("${data.img}")`,
                                }} onClick={navigateToSection}></div>
                                <div className="emoji-drop-down-category-underline-inactive"></div>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div className="emoji-drop-down-selector">
                {/** TODO Recent Section */}
                <div className="emoji-drop-down-selection-section" id="Smileys & people">
                    <h2 className="emoji-drop-down-selector-section-title">Smileys & people</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateSmileysAndPeople().map((emoji) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Animals & nature">
                    <h2 className="emoji-drop-down-selector-section-title">Animals & nature</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateAnimalAndNature().map((emoji) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Food & drink">
                    <h2 className="emoji-drop-down-selector-section-title">Food & drink</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateFoodAndDrink().map((emoji: any) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Activity">
                    <h2 className="emoji-drop-down-selector-section-title">Activity</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateActivities().map((emoji: string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Travel & places">
                    <h2 className="emoji-drop-down-selector-section-title">Travel & places</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateTravelAndPlaces().map((emoji: string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Objects">
                    <h2 className="emoji-drop-down-selector-section-title">Objects</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateObjects().map((emoji: string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Symbols">
                    <h2 className="emoji-drop-down-selector-section-title">Symbols</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateSymbols().map((emoji: string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Flags">
                    <h2 className="emoji-drop-down-selector-section-title">Flags</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateFlags().map((emoji: string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
            </div>
            <div className="emoji-drop-down-bottom">

            </div>
        </div>
    )
}
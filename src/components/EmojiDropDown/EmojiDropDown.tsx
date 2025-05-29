import React, { useEffect, useState } from "react";
import { generateActivities, generateAnimalAndNature, generateFlags, generateFoodAndDrink, generateObjects, generateSmileysAndPeople, generateSymbols, generateTopRow, generateTravelAndPlaces } from "../../utils/EmojiUtils";
import SearchIcon from '@mui/icons-material/Search';
import './EmojiDropDown.css';

export const EmojiDropDown: React.FC = () => {

    const [activeCategory, setActiveCategory] = useState<number>(1);

    return (
        <div className="emoji-drop-down">
            <div className="emoji-drop-down-top">
                <div className="emoji-drop-down-top-search-border">
                    <SearchIcon />
                    <input className="emoji-drop-down-search" id="emoji-search" onChange={() => { }} />
                </div>
                <div className="emoji-drop-down-categories">
                    {generateTopRow().map((img, index) => {
                        if (activeCategory === index) {
                            return <div className="emoji-drop-down-category emoji-active" id={`${index}`} style={{
                                backgroundImage: `url("${img}")`,

                            }}></div>
                        } else {
                            return <div className="emoji-drop-down-category emoji-inactive" id={`${index}`} style={{
                                backgroundImage: `url("${img}")`,

                            }}></div>
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
                        {generateFoodAndDrink().map((emoji:any) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Activity">
                    <h2 className="emoji-drop-down-selector-section-title">Activity</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateActivities().map((emoji:string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Travel & places">
                    <h2 className="emoji-drop-down-selector-section-title">Travel & places</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateTravelAndPlaces().map((emoji:string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Objects">
                    <h2 className="emoji-drop-down-selector-section-title">Objects</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateObjects().map((emoji:string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Symbols">
                    <h2 className="emoji-drop-down-selector-section-title">Symbols</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateSymbols().map((emoji:string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
                <div className="emoji-drop-down-selection-section" id="Flags">
                    <h2 className="emoji-drop-down-selector-section-title">Flags</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateFlags().map((emoji:string) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>
                </div>
            </div>
            <div className="emoji-drop-down-bottom">

            </div>
        </div>
    )
}
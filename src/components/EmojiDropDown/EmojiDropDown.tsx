import React, { useEffect, useState } from "react";
import { generateSmileysAndPeople, generateTopRow } from "../../utils/EmojiUtils";
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
                            return <div className="emoji-drop-down-category-active" id={`${index}`} style={{
                                width: '22px',
                                height: '22px',
                                backgroundImage: `url("${img}")`,
                                backgroundSize: 'cover',

                            }}></div>
                        } else {
                            return <div className="emoji-drop-down-category-inactive" id={`${index}`} style={{
                                width: '22px',
                                height: '22px',
                                backgroundImage: `url("${img}")`,
                                backgroundSize: 'cover',

                            }}></div>
                        }
                    })}
                </div>
            </div>
            <div className="emoji-drop-down-selector">
                {/** TODO Recent Section */}
                <div className="emoji-drop-down-selection-section" id="Smileys & people">
                    <h2 className="emoji-drop-down-selector-section-title">Smiley & people</h2>
                    <div className="emoji-drop-down-selector-emoji-wrapper">
                        {generateSmileysAndPeople().map((emoji) => <div className="emoji-drop-down-emoji">{emoji}</div>)}
                    </div>

                </div>
                <div className="emoji-drop-down-selection-section" id="Animals & nature">

                </div>
                <div className="emoji-drop-down-selection-section" id="Food & drink">

                </div>
                <div className="emoji-drop-down-selection-section" id="Activity">

                </div>
                <div className="emoji-drop-down-selection-section" id="Travel & places">

                </div>
                <div className="emoji-drop-down-selection-section" id="Objects">

                </div>
                <div className="emoji-drop-down-selection-section" id="Symbols">

                </div>
                <div className="emoji-drop-down-selection-section" id="Flags">

                </div>
            </div>
            <div className="emoji-drop-down-bottom">

            </div>
        </div>
    )
}
import React, { useEffect } from "react";
import { generateSmileysAndPeople, generateTopRow } from "../../utils/EmojiUtils";
import SearchIcon from '@mui/icons-material/Search';
import './EmojiDropDown.css';

export const EmojiDropDown: React.FC = () => {
    // useEffect(() => {
    //     generateSmileysAndPeople();
    // }, []);

    // useEffect(() => {
    //     console.log(generateTopRow());
    // })

    return (
        <div className="emoji-drop-down">
            <div className="emoji-drop-down-top">
                <div className="emoji-drop-down-top-search-border">
                    <SearchIcon />
                    <input className="emoji-drop-down-search" id="emoji-search" onChange={() => { }} />
                </div>
                <div className="emoji-drop-down-categories">
                    {generateTopRow().map((img) => {
                        return <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundImage: `url("${img}")`,
                            backgroundSize: 'cover',
                            filter: 'grayscale(100%)'
                        }}></div>
                    })}
                </div>
            </div>
        </div>
    )
}
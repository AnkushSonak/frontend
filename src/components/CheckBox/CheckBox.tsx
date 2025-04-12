import React, { useState } from "react";
import { StyledCheckBox, StyledCheckBoxBackground } from "./StyledCheckBox";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import './CheckBox.css';

export const CheckBox: React.FC = () => {
    const [clicked, setClicked] = useState<boolean>(false);

    const toggleCheckBox = () => {
        setClicked(!clicked);
    }

    return (
        <div className="checkbox-container">
            <StyledCheckBoxBackground active ={clicked} onClick={toggleCheckBox}>
            <StyledCheckBox active ={clicked}>
                {clicked ?
                    <CheckRoundedIcon sx ={{
                        fontSize: 18,
                        color: "white"
                    }}/>
                    : <></>
                }
            </StyledCheckBox>
        </StyledCheckBoxBackground>
        </div>
    )
}
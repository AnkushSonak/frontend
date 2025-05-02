import { Check, ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import CirclesSVG from "../../../../components/SVGs/CirclesSVG";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";

export const FeedPostAudienceDropDown:React.FC = () => {
    const state = useSelector((state: RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(true);
    const [selection, setSelection] = useState<string>("Everyone");

    const handleClick = () => {
        setActive(!active);
    }

    const handleChangeSelection = (e:React.MouseEvent<HTMLDivElement>) => {
        setSelection(e.currentTarget.id);
        dispatch(updateCurrentPost({
            name: "audience",
            value: e.currentTarget.id.toUpperCase()
        }));
        dispatch(updateCurrentPost({
            name: "replyRestriction",
            value: e.currentTarget.id.toUpperCase()
        }))
    }

    return (
        <div className={selection === "Everyone" ? "feed-post-creator-audience eveyone" : "feed-post-creator-audience circle"} onClick={() => { }}>
            {selection}
            <ExpandMore sx={{
                fontSize: '22px'
            }}
            />
            <div className="feed-post-creator-audience-dropdown " style= {{
                display: active ? "block" : "none"
            }}>
                <h2 className="feed-post-creator-audience-dropdown-title">Choose audience</h2>
                <div id = "Everyone" className="feed-post-creator-audience-dropdown-choice" onClick={()=>{}}>
                    <div className="feed-post-creator-audience-dropdown-choice-left">
                        <div className="feed-post-creator-audience-dropdown-choice-everyone-bg">
                            <GlobeSVG height={20} width={20} color={"#FFF"} />
                            <p className="feed-post-creator-audience-dropdown-choice-text">
                                Everyone
                            </p>
                        </div>
                    </div>
                    {selection === 'Everyone' ? <Check sx={{
                        color: "#1DA1F2",
                        fontSize: "18px"
                    }} /> : <></>}
                </div>
                <div id = "Circle" className="feed-post-creator-audience-dropdown-choice" onClick={()=>{}}>
                    <div className="feed-post-creator-audience-dropdown-choice-left">
                        <div className="feed-post-creator-audience-dropdown-choice-circle-bg">
                            <CirclesSVG height={20} width={20} color={"#FFF"} />
                            <div className="feed-post-creator-audience-choice-circle-group">
                                <p className="feed-post-creator-audience-dropdown-choice-text">
                                    Circle
                                </p>
                                <div className="feed-post-creator-audience-dropdown-circle group">
                                    <p className="feed-post-creator-audience-dropdown-circle-info-amount">0</p>
                                    <p className="feed-post-creator-audience-dropdown-circle-info-people">People</p>
                                    <p className="feed-post-creator-audience-dropdown-circle-info-people">Edit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {selection === 'Circle' ? <Check sx={{
                        color: "#1DA1F2",
                        fontSize: "18px"
                    }} /> : <></>}
                </div>
            </div>
        </div>
    )
}
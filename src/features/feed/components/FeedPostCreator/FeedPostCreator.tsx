import { ExpandMore } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GifSVG from "../../../../components/SVGs/GifSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import './FeedPostCreator.css';

export const FeedPostCreator:React.FC = () => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [active, setActive] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>('');

    const activate = () =>{
        if(!active) setActive(true);
    }

    const autoGrow = () => {
        if(textAreaRef && textAreaRef.current){
            textAreaRef.current.style.height = "25px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }

return (
    <div className="feed-post-creator" onClick={activate}>
        <Link to="">
            <img className="feed-post-creator-pfp" src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" />
        </Link>
        <div className="feed-post-creator-right">
            <div className={active ? "feed-post-creator-audience" : "feed-post-creator-audience hide"}>
                Everyone
                <ExpandMore sx ={{
                        fontSize: '22px'
                    }}
                />
            </div>
            <textarea
                className={active ? "feed-post-creator-input input-active" : "feed-post-creator-input"} 
                placeholder="What is happening?!"
                ref={textAreaRef}
                onChange={autoGrow}
                cols={50}
                maxLength={256} 
                />
            <div className={active ? "feed-post-creator-reply" : "feed-post-creator-reply hide"}>
                <GlobeSVG height={14} width={14} color={"#1DA1F2"} />
                Everyone Can Reply
            </div>
            <div className={active ? "feed-post-creator-bottom-icons icons-border" : "feed-post-creator-bottom-icons"}>
               <div className="feed-post-creator-icon-bg">
                    <MediaSVG height={20} width={20} color={"#1DA1F2"} />
               </div>
               <div className="feed-post-creator-icon-bg">
                    <GifSVG height={20} width={20} color={"#1DA1F2"} />
               </div>
               <div className="feed-post-creator-icon-bg">
                    <PollSVG height={20} width={20} color={"#1DA1F2"} />
               </div>
               <div className="feed-post-creator-icon-bg">
                    <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
               </div>
               <div className="feed-post-creator-icon-bg">
                    <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
               </div>
               <div className="feed-post-creator-location">
                    <LocationSVG height={20} width={20} color={"rgba(29, 161, 242, .5)"} />
               </div>
               <button 
                    className={postContent === '' ? "feed-post-creator-post-button" : "feed-post-creator-post-button post-active"}
                    disabled={postContent === ''}
                    >
                    Post
                </button>
            </div>
        </div>
    </div>
)
}
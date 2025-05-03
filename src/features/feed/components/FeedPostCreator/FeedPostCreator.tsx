import { ExpandMore, Schedule } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GifSVG from "../../../../components/SVGs/GifSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import './FeedPostCreator.css';
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { Post } from "../../../../utils/GlobalInterfaces";
import { createPost, initializeCurrentPost, updateCurrentPost } from "../../../../redux/Slices/PostSlice";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";

export const FeedPostCreator:React.FC = () => {

    // const state = useSelector((state:RootState) => state);
    const user = useSelector((state: RootState) => state.user);
    const posts = useSelector((state: RootState) => state.post);

    const dispatch:AppDispatch = useDispatch();
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [active, setActive] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>('');

    const activate = () =>{
        if(!active){
            setActive(true);
            if(user.loggedIn){
                let p:Post ={
                    postId: 0,
                    content: "",
                    author: user.loggedIn,
                    likes: 0,
                    images: [],
                    reposts: 0,
                    views: 0,
                    Scheduled: false,
                    audience: "EVERYONE",
                    replyRestriction: "EVERYONE"   
                }
                dispatch(
                    initializeCurrentPost(p)
                );
            }
        }
        if(textAreaRef && textAreaRef.current) textAreaRef.current.focus();
    }

    const autoGrow = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value)
        if(textAreaRef && textAreaRef.current){
            textAreaRef.current.style.height = "25px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }

        dispatch(updateCurrentPost({
            name: "content",
            value: e.target.value
        }))
    }

    const submitPost = () => {
        if(posts.currentPost && user.loggedIn){
            let body = {
                content: posts.currentPost.content,
                author: posts.currentPost.author,
                replies: [],
                scheduled: posts.currentPost.Scheduled,
                scheduledDate: posts.currentPost.scheduledDate,
                audience: posts.currentPost.audience,
                replyRestriction: posts.currentPost.replyRestriction,
                token: user.token
            }
            dispatch(createPost(body))
        }

        setActive(false);
        if(textAreaRef && textAreaRef.current){
            textAreaRef.current.blur();
            textAreaRef.current.value =""   
        }
    }

    useEffect(() => {
        if(!posts.currentPost){
            setPostContent("");
        }
    }, [posts.currentPost, postContent, activate]);

return (
    <div className="feed-post-creator" onClick={activate}>
        <Link to="">
            <img className="feed-post-creator-pfp" src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" />
        </Link>
        <div className="feed-post-creator-right">
            {active ? <FeedPostAudienceDropDown /> : <></>}
            <textarea
                className={active ? "feed-post-creator-input input-active" : "feed-post-creator-input"} 
                placeholder="What is happening?!"
                ref={textAreaRef}
                onChange={autoGrow}
                cols={50}
                maxLength={256} 
                />
            {active ? <FeedPostReplyRestrictionDropDown /> : <></>}
            <div className={active ? "feed-post-creator-bottom-icons icons-border" : "feed-post-creator-bottom-icons"}>
                <div className="feed-post-creator-icons-left">
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
                </div>
                <div className="feed-post-creator-submit-cluster">
                    {
                       postContent !== '' ?  <div className="feed-post-creator-submit-cluster-left">
                    <FeedPostCreatorProgress percent={(postContent.length / 256) * 100} />
                    <span className="feed-post-creator-submit-cluster-divider"></span>
                    <div className="feed-post-creator-submit-cluster-add">
                        +
                    </div>
                    </div>
                        : <></>

                    }
                    <button
                        className={postContent === '' ? "feed-post-creator-post-button" : "feed-post-creator-post-button post-active"}
                        disabled={postContent === ''}
                        onClick={submitPost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}
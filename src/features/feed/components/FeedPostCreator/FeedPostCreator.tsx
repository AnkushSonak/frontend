import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { createPoll, createPost, createPostWithMedia, initializeCurrentPost, updateCurrentPost, updateCurrentPostImages } from "../../../../redux/Slices/PostSlice";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";
import { updateDisplayGif, updateDisplaySchedule } from "../../../../redux/Slices/ModalSlice";
import { FeedPostCreatorPoll } from "../FeedPostCreatorPoll/FeedPostCreatorPoll";
import { EmojiDropDown } from "../../../../components/EmojiDropDown/EmojiDropDown";

export const FeedPostCreator: React.FC = () => {

    // const state = useSelector((state:RootState) => state);
    const user = useSelector((state: RootState) => state.user);
    const posts = useSelector((state: RootState) => state.post);

    const dispatch: AppDispatch = useDispatch();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const imageSelectorRef = useRef<HTMLInputElement>(null);

    const [active, setActive] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>('');
    const [overloadedImages, setOverloadedImages] = useState<boolean>(false);

    const activate = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!active) {
            setActive(true);
            if (user.loggedIn) {
                let p: Post = {
                    postId: 0,
                    content: "",
                    author: user.loggedIn,
                    likes: 0,
                    images: [],
                    reposts: 0,
                    views: 0,
                    scheduled: false,
                    audience: "EVERYONE",
                    replyRestriction: "EVERYONE"
                }
                dispatch(
                    initializeCurrentPost(p)
                );
            }
        }
        let targetElement: any = e.target;
        if (targetElement.id === 'post-text') {
            if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
        }
    }

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value)
        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.style.height = "25px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }

        dispatch(updateCurrentPost({
            name: "content",
            value: e.target.value
        }))
    }

    function pad(n: any) {
        return n < 10 ? '0' + n : n;
    }

    const submitPost = () => {
        if (posts.currentPost && user.loggedIn) {
            if (posts.currentPostImages.length === 0) {
                let poll = undefined;
                if (posts.currentPost.poll !== undefined && posts.currentPost.images.length < 1) {
                    poll = JSON.parse(JSON.stringify(posts.currentPost.poll));
                    let timeString = posts.currentPost.poll.endTime;
                    console.log(timeString);

                    let [days, hours, minutes] = timeString.split(":").map(Number);

                    let endTime = new Date();
                    endTime.setDate(endTime.getDate() + days);
                    endTime.setHours(endTime.getHours() + hours);
                    endTime.setMinutes(endTime.getMinutes() + minutes);
                    poll = {
                        ...poll,
                        endTime: `${endTime.getFullYear()}-${pad(endTime.getMonth() + 1)}-${pad(endTime.getDate())}T${pad(endTime.getHours())}:${pad(endTime.getMinutes())}:00`
                    }
                }

                let body = {
                    content: posts.currentPost.content,
                    author: posts.currentPost.author,
                    images: posts.currentPost.images,
                    poll,
                    replies: [],
                    scheduled: posts.currentPost.scheduled,
                    scheduledDate: posts.currentPost.scheduledDate,
                    audience: posts.currentPost.audience,
                    replyRestriction: posts.currentPost.replyRestriction,
                    token: user.token
                }
                dispatch(createPost(body))
            } else {

                let body = {
                    content: posts.currentPost.content,
                    author: posts.currentPost.author,
                    replies: [],
                    scheduled: posts.currentPost.scheduled,
                    scheduledDate: posts.currentPost.scheduledDate,
                    audience: posts.currentPost.audience,
                    replyRestriction: posts.currentPost.replyRestriction,
                    token: user.token,
                    images: [],
                    poll: undefined,
                    imageFiles: posts.currentPostImages
                }
                dispatch(createPostWithMedia(body));
            }
        }

        setActive(false);
        setPostContent("");

        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.blur();
            textAreaRef.current.value = ""
        }
    }

    const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageList = posts.currentPostImages;
        setOverloadedImages(false);
        const imageURLList: string[] = [];

        if (imageSelectorRef.current && e.target.files) {
            if (e.target.files.length + imageList.length > 4) {
                console.log("Selected too many files");
                imageSelectorRef.current.value = '';
                setOverloadedImages(true);
                return;
            }

            if (imageList[0]?.type === 'image/gif') {
                console.log("only one gif and no other images allowed");
                imageSelectorRef.current.value = '';
                setOverloadedImages(true);
                return;
            }

            let fileArr: File[] = [...imageList];

            for (let i = 0; i < e.target.files.length; i++) {
                let file = e.target.files.item(i);

                if (file?.type === 'image/gif' && imageList.length >= 1 || file?.type === 'image/gif' && e.target.files.length > 1) {
                    console.log("only one gif and no other images allowed.");
                    imageSelectorRef.current.value = '';
                    setOverloadedImages(true);
                    return;
                }

                if (file) fileArr.push(file);
            }
            dispatch(updateCurrentPostImages(fileArr));
        }
    }

    const determineFull = (): boolean => {
        if (posts.currentPostImages.length === 4) return true;

        if (posts.currentPostImages[0]?.type === 'image/gif') return true;

        return false;
    }
    const displayGif = () => {
        dispatch(updateDisplayGif());
    }

    const generatePoll = (e: React.MouseEvent<HTMLDivElement>) => {
        if (posts.currentPost === undefined) {
            activate(e);
        } else {
            dispatch(createPoll());
        }

    }

    const generateButtonClass = (): string => {
        return postContent !== '' || posts.currentPostImages.length > 0 || (posts.currentPost && posts.currentPost.images.length >= 1) || (posts.currentPost && posts.currentPost.poll !== undefined) ? "feed-post-creator-post-button post-active" : "feed-post-creator-post-button";
    }

    const activateButton = (): boolean => {
        return !(postContent !== '' || posts.currentPostImages.length > 0 || (posts.currentPost && posts.currentPost.images.length >= 1) || (posts.currentPost && posts.currentPost.poll !== undefined));
    }

    const openScheduleModal = () => {
        dispatch(updateDisplaySchedule());
    }

    useEffect(() => {
        if (!posts.currentPost) {
            setPostContent("");
        }
        console.log(posts.currentPost?.poll);
    }, [posts.currentPost, postContent, activate, posts.currentPost?.poll]);

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
                    id={"post-text"}
                />
                {(posts.currentPostImages.length > 0 || (posts.currentPost && posts.currentPost.images.length > 0)) && <FeedPostCreatorImages />}
                {posts.currentPost?.poll && <FeedPostCreatorPoll />}
                {active ? <FeedPostReplyRestrictionDropDown /> : <></>}
                <div className={active ? "feed-post-creator-bottom-icons icons-border" : "feed-post-creator-bottom-icons"}>
                    <div className="feed-post-creator-icons-left">
                        <div className="feed-post-creator-icon-bg-media">
                            <input className="feed-post-creator-file-update" onChange={handleGetImages} type="file" id="images" accept="image/**" multiple={true}
                                ref={imageSelectorRef} hidden disabled={determineFull()} />
                            <label htmlFor="images" className={determineFull() ? "feed-post-creator-icon-bg" : "feed-post-creator-icon-bg icon-active"}>
                                <MediaSVG height={20} width={20} color={determineFull() ? "rgba(19, 161, 242, .5)" : "#1DA1F2"} />
                            </label>
                        </div>
                        <div className={posts.currentPostImages.length > 0 ? "feed-post-creator-icon-bg" : "feed-post-creator-icon-bg icon-active"} onClick={displayGif}>
                            <GifSVG height={20} width={20} color={posts.currentPostImages.length > 0 ? "rgba(19, 161, 242, .5)" : "#1DA1F2"} />
                        </div>
                        <div className={posts.currentPostImages.length > 0 ? "feed-post-creator-icon-bg" : "feed-post-creator-icon-bg icon-active"} onClick={generatePoll}>
                            <PollSVG height={20} width={20} color={posts.currentPostImages.length > 0 ? "rgba(19, 161, 242, .5)" : "#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg icon-active">
                            <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg icon-active" onClick={openScheduleModal}>
                            <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-location">
                            <LocationSVG height={20} width={20} color={"rgba(29, 161, 242, .5)"} />
                        </div>
                    </div>
                    <div className="feed-post-creator-submit-cluster">
                        {
                            postContent !== '' ? <div className="feed-post-creator-submit-cluster-left">
                                <FeedPostCreatorProgress percent={(postContent.length / 256) * 100} />
                                <span className="feed-post-creator-submit-cluster-divider"></span>
                                <div className="feed-post-creator-submit-cluster-add">
                                    +
                                </div>
                            </div>
                                : <></>

                        }
                        <button
                            // postContent === '' && posts.currentPostImages.length < 1 && (posts.currentPost && posts.currentPost.images.length < 1) ? "feed-post-creator-post-button" : "feed-post-creator-post-button post-active"
                            //     postContent === '' && posts.currentPostImages.length < 1  && (posts.currentPost && posts.currentPost.images.length < 1)
                            className={generateButtonClass()}
                            disabled={activateButton()}
                            onClick={submitPost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <EmojiDropDown />
        </div>
    )
}
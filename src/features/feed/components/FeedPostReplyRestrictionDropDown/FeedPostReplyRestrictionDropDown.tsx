import { useDispatch, useSelector } from 'react-redux';
import GlobeSVG from '../../../../components/SVGs/GlobeSVG';
import './FeedPostReplyRestrictionDropDown.css';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { useState } from 'react';
import { getReplyDropDownButton } from '../../utils/FeedUtils';
import { Check } from '@mui/icons-material';
import PeopleYouFollowSVG from '../../../../components/SVGs/PeopleYouFollowSVG';
import MentionedSVG from '../../../../components/SVGs/MentionedSVG';
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';

export const FeedPostReplyRestrictionDropDown:React.FC = () => {

    const state = useSelector((state: RootState) => state.post);
    const dispatch:AppDispatch = useDispatch();
    
    const [active, setActive] = useState<boolean>(false);
    const [selection, setSeletion] = useState<string>("Everyone");

    const handleOpenModal = () => {
        setActive(!active);
    }

    const handleChangeSelection = (e:React.MouseEvent<HTMLDivElement>) => {
        setSeletion(e.currentTarget.id);
        dispatch(updateCurrentPost({
            name: "replyRestriction",
            value: e.currentTarget.id.toUpperCase()
        }));
        setActive(false);
    }

    return (
        <div className="feed-post-reply-restriction-drop-down">
                {getReplyDropDownButton(state, handleOpenModal)}
                <div className="feed-post-reply-restriction-drop-down-modal" style={{display: active ? "block" : "none"}}>
                    <h2 className="feed-post-reply-restriction-dropdown-title">Who can reply?</h2>
                    <p className="feed-post-reply-restriction-dropdown-sub-title">Choose who can reply to the post.</p>
                    <p className="feed-post-reply-restriction-dropdown-sub-title">Anyone mentioned can always reply.</p>
                    <div id="Everyone" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                        <div className="feed-post-creator-reply-restriction-dropdown-choice-left">
                            <div className="feed-post-creator-reply-restriction-dropdown-choice-bg">
                                <GlobeSVG height={20} width={20} color={"#FFF"} />
                            </div>
                            <p className="feed-post-creator-reply-restriction-dropdown-choice-text">Everyone</p>
                        </div>
                        {selection === 'Everyone' ? <Check sx={{
                            color: "#1DA1F2",
                            fontSize: "18px"
                        }} /> : <></>}
                    </div>
                    <div id="Follow" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                        <div className="feed-post-creator-reply-restriction-dropdown-choice-left">
                            <div className="feed-post-creator-reply-restriction-dropdown-choice-bg">
                                <PeopleYouFollowSVG height={20} width={20} color={"#FFF"} />
                            </div>
                            <p className="feed-post-creator-reply-restriction-dropdown-choice-text">People You Follow</p>
                        </div>
                        {selection === 'Follow' ? <Check sx={{
                            color: "#1DA1F2",
                            fontSize: "18px"
                        }} /> : <></>}
                    </div>
                    <div id="Mention" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                        <div className="feed-post-creator-reply-restriction-dropdown-choice-left">
                            <div className="feed-post-creator-reply-restriction-dropdown-choice-bg">
                                <MentionedSVG height={20} width={20} color={"#FFF"} />
                            </div>
                            <p className="feed-post-creator-reply-restriction-dropdown-choice-text">Only People You Mention</p>
                        </div>
                        {selection === 'Mention' ? <Check sx={{
                            color: "#1DA1F2",
                            fontSize: "18px"
                        }} /> : <></>}
                    </div>
                </div>
            </div>
    )
}
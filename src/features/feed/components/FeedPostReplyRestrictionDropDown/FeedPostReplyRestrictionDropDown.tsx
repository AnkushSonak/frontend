import GlobeSVG from '../../../../components/SVGs/GlobeSVG';
import './FeedPostReplyRestrictionDropDown.css';

export const FeedPostReplyRestrictionDropDown:React.FC = () => {
    return (
        <div className="feed-post-creator-reply">
                <GlobeSVG height={14} width={14} color={"#1DA1F2"} />
                Everyone Can Reply
            </div>
    )
}
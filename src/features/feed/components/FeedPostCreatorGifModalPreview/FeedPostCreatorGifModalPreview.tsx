import React from "react";
import { TenorCategories } from "../../../../utils/GlobalInterfaces";
import './FeedPostCreatorGifModalPreview.css';
import { FeedPostCreatorFrozenGif } from "../FeedPostCreatorFrozenGifComponent/FeedPostCreatorFrozenGifComponent";

interface FeedPostCreatorGifModalPreviewProps{
    categories: TenorCategories[];
}

export const FeedPostCreatorGifModalPreview: React.FC<FeedPostCreatorGifModalPreviewProps> = ({categories}) => {
    return (
        <div className="feed-post-creator-gif-modal-preview">
            {categories.map((gif) => <FeedPostCreatorFrozenGif key={gif.searchterm} image={gif.image} text={gif.searchterm} />)}
        </div>
    )
}
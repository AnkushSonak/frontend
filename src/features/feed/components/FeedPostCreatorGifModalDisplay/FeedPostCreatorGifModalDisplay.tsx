import React, { useEffect, useRef, useState } from 'react';
import './FeedPostCreatorGifModalDisplay.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { fetchNextGifs } from '../../../../redux/Slices/GifSlice';
import { FeedPostCreatorFrozenGif } from '../FeedPostCreatorFrozenGifComponent/FeedPostCreatorFrozenGifComponent';

interface FeedPostCreatorGifModalDisplayProps{
    gifs: string[];
}

export const FeedPostCreatorGifModalDisplay:React.FC<FeedPostCreatorGifModalDisplayProps> = ({gifs}) => {

    const state = useSelector((state:RootState) => state.gif);
    const dispatch: AppDispatch = useDispatch();

    const [autoPlay, setAutoPlay] = useState<boolean>(true);

    const hiddenDiv = useRef<HTMLDivElement>(null);

    const loadNextGifs = (entries: any) => {
        entries.forEach((entry:any) => {
            if(entry.isIntersecting){
                dispatch(fetchNextGifs({
                    term: state.searchTerm,
                    next: state.next
                }));
            }
        });
    }

    const toggleAutoPlay = () => {
        setAutoPlay(!autoPlay);
    }

    useEffect(() => {
        if(hiddenDiv && hiddenDiv.current){
            const observer = new IntersectionObserver(loadNextGifs, {
                root: null,
                threshold: 1
            });

            const target = hiddenDiv.current;

            observer.observe(target);
        }
    }, [])

    return(
        <div className="feed-post-creator-gif-modal-display">
            <div className="feed-post-creator-gif-modal-display-auto-selection">
                <p className='feed-post-creator-gif-modal-display-auto-text'>Auto play GIFs</p>
                <label className="feed-post-creator-gif-modal-switch">
                    <input type='checkbox' onClick={toggleAutoPlay} checked={autoPlay} />
                    <span className='feed-post-creator-gif-modal-slider'></span>
                </label>
            </div>
            <div className="feed-post-creator-gif-modal-display-gif-container">
                {
                    autoPlay ?
                        gifs.map((gif) => <img className='feed-post-creator-gif-modal-display-gif' key={gif} src={gif} />)
                        :
                        gifs.map((gif) => <FeedPostCreatorFrozenGif image={gif} text={state.searchTerm} />)
                }
            </div>
            <div id='autoload' ref={hiddenDiv} hidden={state.gifs.length === 0}></div>
        </div>
    )
}
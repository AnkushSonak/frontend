import {BorderAll, Close, Search} from '@mui/icons-material';
import { AppDispatch, RootState } from '../../../../redux/Store';
import {updateDisplayGif} from '../../../../redux/Slices/ModalSlice';
import './FeedPostCreatorGifModalTop.css';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGifs, updateSearchTerms } from '../../../../redux/Slices/GifSlice';

export const FeedPostCreatorGifModalTop: React.FC = () => {

    const searchTerm = useSelector((state:RootState) => state.gif.searchTerm);
    const dispatch:AppDispatch = useDispatch();

    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if(!inputFocused) setInputFocused(true);
    }

    const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        const relatedTarget:any = e.nativeEvent.relatedTarget;

        if(relatedTarget && relatedTarget.id === 'clear'){
            clearInput();
        }else{
            setInputFocused(false);
        }
    }

    const handleChangeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        //where the logic for search goes
       dispatch(updateSearchTerms(e.target.value));
    }

    const handleCloseModal = () => {
        dispatch(updateDisplayGif());
    }

    const clearInput = () => {
        dispatch(updateSearchTerms(""));
        dispatch(clearGifs());
        setInputFocused(true);
        if(inputRef && inputRef.current) inputRef.current.focus();
    }

    return (
        <div className="feed-post-creator-gif-modal-top">
            <div className="feed-post-creator-gif-modal-top-close-bg" onClick={handleCloseModal}>
                <Close sx={{fontSize: '20px'}} /> 
            </div>
            <label htmlFor='gif-search' className={inputFocused ? "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-active" :
                 "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-inactive"}>
                    <div className="feed-post-creator-gif-modal-search">
                        <Search sx={{fontSize: '20px', color: 'rgb(83, 100, 113)'}} />
                    </div>
                    <input id="gif-search" style={!inputFocused && searchTerm.length > 0 ? {width: `${searchTerm.length + 1}ch`} : {}} 
                    className='feed-post-creator-gif-modal-top-input' placeholder='Search for GIFs' value={searchTerm} 
                    onChange={handleChangeValue} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} />
                    {searchTerm && inputFocused ? <div className='feed-post-creator-gif-modal-top-clear-border'>
                        <button id="clear" className="feed-post-creator-gif-top-clear-input">x</button>
                    </div> : <></>}
                 </label>
        </div>
    )
}
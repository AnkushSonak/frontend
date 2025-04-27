import React from 'react';
import blueLogo from '../../assets/fwitter-logo-large-blue.png'
import './Navigation.css';
import { Link } from 'react-router-dom';
import HomeSVG from '../SVGs/HomeSVG';
import ExploreSVG from '../SVGs/ExploreSVG';
import NotificationSVG from '../SVGs/NotificationSVG';
import MessagesSVG from '../SVGs/MessagesSVG';
import ListsSVG from '../SVGs/ListsSVG';
import CommunitiesSVG from '../SVGs/CommunitiesSVG';
import PremiumSVG from '../SVGs/PremiumSVG';
import ProfileSVG from '../SVGs/ProfileSVG';
import MoreSVG from '../SVGs/MoreSVG';

export const Navigation:React.FC = () => {
    return(
        <div className="navigation">
            <nav className='navigation-container'>
                <Link to="/home" className="navigation-logo-bg">
                    <img className="navigation-logo" src={blueLogo}  />
                </Link>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <HomeSVG height={26} widht={26} />
                        <p className="navigation-text navigation-active">Home</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ExploreSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Explore</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <NotificationSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Notification</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <MessagesSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Messages</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ListsSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Lists</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <CommunitiesSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Communities</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <PremiumSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Premium</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <ProfileSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">Profile</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <MoreSVG height={26} widht={26} />
                        <p className="navigation-text navigation-inactive">More</p>
                    </Link>
                </div>
                <button className='navigation-post-button'>
                    Post
                </button>
            </nav>
            <div className="navigation-options">
                <img className='navigation-options-pfp' src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" />
                <div className="navigation-options-info">
                    <p className='navigation-options-info-display-name'>
                        AnkushSharma
                    </p>
                    <p className="navigation-options-info-handle">
                        @AnkushSharma
                    </p>
                </div>
                <p className="navigation-options-dotdotdot">...</p>
            </div>
        </div>
    )
}
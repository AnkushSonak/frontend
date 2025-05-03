import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {getUserByToken, setToken} from '../redux/Slices/UserSlice';
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";

export const Home:React.FC = () => {

    const state = useSelector((state: RootState) => state.user);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

    // Update local JWT from state.token if needed
    useEffect(() => {
        if (jwt === '' && state.token !== '') {
            setJwt(state.token);
        }
    }, [state.token]);

    // When jwt is available, dispatch setToken or getUserByToken
    useEffect(() => {
        if (jwt !== '') {
            dispatch(setToken(jwt)); // if needed
            dispatch(getUserByToken(jwt));
        }
    }, [jwt]);

    // Redirect if both are missing
    useEffect(() => {
        if (jwt === '' && state.token === '') {
            navigate("/");
        }
    }, [jwt, state.token]);


    return (
        <div className="home">
            <div className="home-layout">
                <div className="home-navigation-section">
                    <Navigation />
                </div>
                <div className="home-content-section">
                    <Feed />
                </div>
                <div className="home-info-section">

                </div>
            </div>
        </div>
    )
};
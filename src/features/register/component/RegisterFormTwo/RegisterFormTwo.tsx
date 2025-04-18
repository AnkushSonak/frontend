import React from 'react';
import { useDispatch, UseDispatch } from 'react-redux'; 
import { incrementStep } from '../../../../redux/Slices/RegisterSlice';
import { AppDispatch } from '../../../../redux/Store';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import './RegisterFormtwo.css'
import { CheckBox } from '../../../../components/CheckBox/CheckBox';

export const RegisterFormTwo:React.FC = () => {

    return (
        <div className="reg-step-two-container">
            <div className="reg-step-two-content">
                <h1 className='reg-step-two-header'>
                    Customize your experience
                </h1>
                <h3 className='reg-step-two-sub-header'>
                    Track where you see Fwitter content across the web.
                </h3>
                <div className="reg-step-two-toggle-group">
                    <p className='reg-step-two-privacy'>
                        Fwitter uses this data to personalize your experience, This web browsing history will never be stored with your name, email, or phone number.
                    </p>
                    <CheckBox/>
                </div>
                <p className='reg-step-two-policy'>
                    By siigning up, you agree to our <span className='reg-step-two-link'>Terms</span>, <span className='reg-step-two-link'>Privacy Policy </span>
                    and <span className='reg-step-two-link'>Cookie use</span>. Fwitter may use your content information, including your
                    email address and phone number for the purpose outline in our Privacy Policy. <span className='reg-step-two-link'>Learn more</span>
                </p>
            </div>
        </div>
    )
}
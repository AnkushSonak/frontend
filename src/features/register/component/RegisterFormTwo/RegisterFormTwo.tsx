import React from 'react';
import { CheckBox } from '../../../../components/CheckBox/CheckBox';
import '../RegisterForms/RegisterForm.css';
import '../../../../assets/global.css';

export const RegisterFormTwo:React.FC = () => {

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className='register-header'>
                    Customize your experience
                </h1>
                <h3 className='register-subheader'>
                    Track where you see Fwitter content across the web.
                </h3>
                <div className="register-two-checkbox-wrapper">
                    <p className='register-text'>
                        Fwitter uses this data to personalize your experience, This web browsing history will never be stored with your name, email, or phone number.
                    </p>
                    <CheckBox/>
                </div>
                <p className='register-text color-gray'>
                    By siigning up, you agree to our <span className='register-link color-blue'>Terms</span>, <span className='register-link color-blue'>Privacy Policy </span>
                    and <span className='register-link color-blue'>Cookie use</span>. Fwitter may use your content information, including your
                    email address and phone number for the purpose outline in our Privacy Policy. <span className='register-link color-blue'>Learn more</span>
                </p>
            </div>
        </div>
    )
}
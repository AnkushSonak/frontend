import React, { useState } from 'react';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import { useDispatch, UseDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/Store';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { validateEmail } from '../../../../services/Validators';
import './RegisterEmailInput.css';

interface RegisterEmailInputs{
    email:string;
}

export const RegisterEmailInput:React.FC<RegisterEmailInputs> = ({email}) => {
    const [validEmail, setValidEmail] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();
    const updateEmail = (e:React.ChangeEvent<HTMLInputElement>):void => {
        dispatch(updateRegister({
            name: "email",
            value: e.target.value
        }));

        let valid = validateEmail(e.target.value);
        setValidEmail(valid);

        dispatch(updateRegister({
            name: "emailValid",
            value: valid
        }));
    }


    return (
        <div className="register-email-input">
            <ValidatedTextInput data = {email} valid ={validEmail} label={"Email"} name={"email"} changeValue={updateEmail} />
            {validEmail ? <></> : <span className='register-email-error'>Please Enter a valid email.</span>}
        </div>
    )
}
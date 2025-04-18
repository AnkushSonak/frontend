import React, { useState } from 'react';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import { AppDispatch } from '../../../../redux/Store';
import { useDispatch } from 'react-redux';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { validateName } from '../../../../services/Validators';
import './RegisterNameInput.css'

interface RegisterNameInputesProps{
    firstName: string;
    lastName: string;
}

export const RegisterNameInputs:React.FC<RegisterNameInputesProps> = ({firstName, lastName}) => {

    const [firstValid, setFirstValid] = useState<boolean>(true);
    const [lastValid, setLastValid] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();

    const updateName = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if(e.target.name ==='firstName'){
            dispatch(updateRegister({name:e.target.name, value: e.target.value}));

            let valid = validateName(e.target.value);
            setFirstValid(valid);

            dispatch(updateRegister({name:'firstNameValid', value: valid}));

        }

        if(e.target.name ==='lastName'){
            dispatch(updateRegister({name:e.target.name, value: e.target.value}));

            let valid = validateName(e.target.value);
            setLastValid(valid);

            dispatch(updateRegister({name:'lastNameValid', value: valid}));

        }
    }

    return (
        <div className="register-name-input">
            <div className="register-name-content">
                <ValidatedTextInput 
                    valid ={firstValid} 
                    name ={"firstName"} 
                    label={"First"} 
                    changeValue={updateName} 
                    data ={firstName}
                    attributes={{
                        maxLength: 50
                    }}
                    />
                {firstValid ? <></> : <span className='register-name-error'>What's your name?</span>}
            </div>
            <div className="register-name-content">
                <ValidatedTextInput 
                    valid ={lastValid} 
                    name ={"lastName"} 
                    label={"Last"} 
                    changeValue={updateName} 
                    data ={lastName}
                    attributes= {{
                        maxLength:50
                    }}
                    />
                {lastValid ? <></> : <span className='register-name-error'>What's your name?</span>}
            </div>
        </div>
    )
}
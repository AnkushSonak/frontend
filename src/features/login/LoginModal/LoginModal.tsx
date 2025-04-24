import { useSelector } from "react-redux";
import { Modal } from "../../../components/Modal/Modal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { LoginModalTop } from "../LoginModalTop/LoginModalTop";
import { RootState } from "../../../redux/Store";
import React, { useState } from "react";
import { LoginFormTwo } from "../LoginForms/LoginFormTwo";

interface LoginModalProps{
    toggleModal: () => void;
}

export const LoginModal:React.FC<LoginModalProps> =({toggleModal}) =>{

    const state = useSelector((state:RootState) => state.user);

    const [password, setPassword] = useState<string>('');

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <Modal
            topContent={<LoginModalTop closeModal={toggleModal} />}
            content={state.username ? <LoginFormTwo setPassword={handlePassword} /> : <LoginFormOne />}
            bottomContent={state.username ?  <div>Login Form 2 Button</div> : <></>}
        /> 
    )
}
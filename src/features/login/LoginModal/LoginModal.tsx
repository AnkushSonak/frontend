import { useSelector } from "react-redux";
import { Modal } from "../../../components/Modal/Modal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { LoginModalTop } from "../LoginModalTop/LoginModalTop";
import { RootState } from "../../../redux/Store";

interface LoginModalProps{
    toggleModal: () => void;
}

export const LoginModal:React.FC<LoginModalProps> =({toggleModal}) =>{

    const state = useSelector((state:RootState) => state.user);

    return (
        <Modal
            topContent={<LoginModalTop closeModal={toggleModal} />}
            content={state.username ? <>Login Form 2</> : <LoginFormOne />}
            bottomContent={state.username ?  <div>Login Form 2 Button</div> : <></>}
        /> 
    )
}
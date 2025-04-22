import { Modal } from "../../../components/Modal/Modal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { LoginModalTop } from "../LoginModalTop/LoginModalTop";

interface LoginModalProps{
    toggleModal: () => void;
}

export const LoginModal:React.FC<LoginModalProps> =({toggleModal}) =>{
    return (
        <Modal
            topContent={<LoginModalTop closeModal={toggleModal} />}
            content={<LoginFormOne />}
            bottomContent={<div>Login bottom</div>}
        /> 
    )
}
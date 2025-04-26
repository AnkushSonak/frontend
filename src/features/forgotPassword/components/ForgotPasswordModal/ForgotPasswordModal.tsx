import { useState } from "react"
import { Modal } from "../../../../components/Modal/Modal"
import { ForgotFormOne } from "../ForgotForms/ForgotFormOne"
import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop"
import { Password } from "@mui/icons-material"
import { validateEmail, validatePhone } from "../../../../services/Validators"
import axios from 'axios'

export const ForgotPasswordModal:React.FC<{toggleModal: ()=>void}> = ({toggleModal}) => {

    const[credential, setCredential] = useState<string>('');
    const[error, setError] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    const changeCredential = (credential:string) => {
        setCredential(credential);
    }

    const searchUser = async () => {
        let findUserDTO = {
            email: '',
            phone: '',
            username: ''
        };

        if(validateEmail(credential)){
            findUserDTO = {
                ...findUserDTO,
                email: credential
            }
        }
        else if(validatePhone(credential)){
            findUserDTO = {
                ...findUserDTO,
                phone: credential
            }
        }else{
            findUserDTO = {
                ...findUserDTO,
                username:credential
            }
        }

        try{
            setError(false);
            let res = await axios.post('http://localhost:8000/auth/find', findUserDTO);
            let data = await res.data;
            setStep(2);
        }catch(e){
            setError(true);
        }
    }

    return(<Modal
        topContent={<ForgotModalTop closeModal={toggleModal} />}
        content={<ForgotFormOne setCredential={() => {}} error={false}  />}
        bottomContent={step === 1 ? <button onClick={searchUser}>Search for user</button> : <></>}
    />)
}
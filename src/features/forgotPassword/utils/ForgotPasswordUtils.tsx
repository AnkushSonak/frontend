import { ForgotButtonOne } from "../components/ForgotButtonOne/ForgotButtonOne";
import { ForgotButtonTwo } from "../components/ForgotButtonTwo/ForgotButtonTwo";
import { ForgotFormOne } from "../components/ForgotForms/ForgotFormOne"
import { ForgotFormThree } from "../components/ForgotForms/ForgotFormThree";
import { ForgotFormTwo } from "../components/ForgotForms/ForgotFormTwo";

export const determineForgotFormContent = (step: number, setCredential:(value:string)=> void, error:boolean, email: string,
 phone:string, valid:boolean, updateCode:(value:number)=> void):JSX.Element => {
    switch(step){
        case 1: 
            return <ForgotFormOne setCredential={setCredential} error={error} />;
        case 2: 
            return <ForgotFormTwo email={email} phone={phone} />;
        case 3: 
            return <ForgotFormThree updateCode={updateCode} valid={valid} />
    }

    return <></>
 }

 export const determineForgotButton = (step:number, credentials: string, searchUser: ()=> void, cancel:()=> void, sendCode: ()=>void): JSX.
 Element => {
    switch(step){
        case 1:
            return <ForgotButtonOne handleClick={searchUser} value={credentials} />
        case 2:
            return <ForgotButtonTwo onCancel={cancel} sendCode={sendCode} /> 
        case 3:
            return <></>   
    }

    return <></>
 }
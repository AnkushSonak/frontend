import VisibilityOutlinedIcon  from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon  from "@mui/icons-material/VisibilityOffOutlined";
import './RegisterFormSix.css';
import React, { useEffect, useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateRegister, updateUserPassword } from "../../../../redux/Slices/RegisterSlice";
import { useNavigate } from 'react-router-dom';

export const RegisterFormSix:React.FC =() => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        dispatch(updateRegister({
            name: "password",
            value: e.target.value
        }));
    }

    const toggleView = () => {
        setActive(!active);
    }

    useEffect(() => {
        if(state.login){
            //store some user info into local Storage, so that we can load the user into the user slice when we hit the feed page
            navigate("/home");
        }
    }, [state.login])

    return(
        <div className="reg-step-six-container">
            <div className="reg-step-six-content">
                <h1>You'll need a password</h1>
                <p>Make sure it's 8 character or more.</p>
                <div className="reg-step-six-password">
                    <ValidatedTextInput valid={true} label={"Password"}
                    name={"password"} changeValue={handleChange}
                    attributes={{
                        minLength:8,
                        type: active ? "text" : "password"
                    }} />
                    <div onClick={toggleView} className="reg-step-six-icon">
                        {active ? 
                            <VisibilityOffOutlinedIcon sx={{
                                fontSize: "24px"
                            }} /> : 
                            <VisibilityOutlinedIcon sx ={{
                                    fontSize: "24px"
                            }} />
                        }  
                    </div>
                </div>
            </div>
        </div>
    )
}
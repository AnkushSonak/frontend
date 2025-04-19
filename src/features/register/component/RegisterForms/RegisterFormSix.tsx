import VisibilityOutlinedIcon  from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon  from "@mui/icons-material/VisibilityOffOutlined";
import React, { useEffect, useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import '../../../../assets/global.css';

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
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-heaader-2">You'll need a password</h1>
                <p className="register-text color-gray">Make sure it's 8 character or more.</p>
                <div className="register-six-password">
                    <ValidatedTextInput valid={true} label={"Password"}
                    name={"password"} changeValue={handleChange}
                    attributes={{
                        minLength:8,
                        type: active ? "text" : "password"
                    }} />
                    <div onClick={toggleView} className="register-six-icon">
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
import { JSX } from "react";
import { RegisterFormOne } from "../component/RegisterFormOne/RegisterFormOne";
import { RegisterFormTwo } from "../component/RegisterFormTwo/RegisterFormTwo";
import { RegisterFormThree } from "../component/RegisterFormThree/RegisterFormThree";
import { RegisterFormFour } from "../component/RegisterFormFour/RegisterFormFour";
import data from '../../../data/codes.json'
import { RegisterFormFive } from "../component/RegisterFormFive/RegisterFormFive";
import { RegisterFormSix } from "../component/RegisterFormSix/RegisterFormSix";

export const determineModalContent = (step: number): JSX.Element => {
    switch(step){
        case 1:
            return <RegisterFormOne />
        case 2:
            return <RegisterFormTwo />
        case 3:
            return <RegisterFormThree />
        case 4:
            return <RegisterFormFour />
        case 5:
            return <RegisterFormFive />
        case 6:
            return <RegisterFormSix />
        default:
            return <></>
    }
}

export const countryCodeDropDown = (): JSX.Element[] => {
    let options = data.filter((country) => {
        if(country.code !=="IN"){
            return country;
        }
    }).map((country) => {
        return <option value ={`${country.dial_code} ${country.name}`}
        key={country.code}>
            {`${country.dial_code} ${country.name}`}
        </option>
    });

    options.unshift(
        <option value={"+91 India"} key={"IN"}>{"+91 India"}</option>
    );
    return options;
}
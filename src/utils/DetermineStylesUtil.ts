import { Label } from "@mui/icons-material";
import { StyledInputprops, ValidateInputState } from "./GlobalInterfaces";

export const determineStyledInputBorder = (props:StyledInputprops) => {

    let {active, valid, theme} = props;

    if(!active && valid){
        return `1px solid ${theme.colors.lightGray}`;
    }

    if(!active && !valid){
        return `1px solid ${theme.colors.error}`;
    }

    if(active && valid){
        return `2px solid ${theme.colors.blue}`;
    }
    if(active && !valid){
        return `2px solid ${theme.colors.error}`;
    }
    
    return "";
}

export const determineLabelColor = (props: StyledInputprops):string  => {
    let {active, valid, theme, color} = props;

    if(color && color === 'error'){
        return theme.colors.error;
    }
    if(color && color === 'blue'){
        return theme.colors.blue;
    }
    
    return theme.colors.gray;
}

export const determineValidatedStyles = (state: ValidateInputState, validator: (value: string) => boolean): ValidateInputState => {
    
    let {valid, active, typedIn, value, labelColor, labelActive} = state;
    if(typedIn){
        valid = validator(value);
        
        if(active && valid){
            labelActive = true;
            labelColor = 'blue';
        }

        if(active && !valid){
            labelActive = true;
            labelColor = 'error';
        }

        if(!active && valid){
            labelActive = true;
            labelColor = 'green';
        }
        if(!active && !valid){
            labelActive = false;
            labelColor = 'gray';
        }
    }else{
        if(active){
            labelActive = true;
            labelColor = 'blue';
        }else{
            labelActive = false;
            labelColor = 'gray';
        }
    }

    state={
        ...state,
        valid,
        labelActive,
        labelColor 
    };

    return state;
}


export const determineValidatedSelectStyle = (active:boolean, valid: boolean): string => {
    if(!valid){
        return 'error';
    }

    if(active){
        return 'blue';
    }

    return 'gray';
}

export const determineValidatedTextLabel = (active: boolean, valid: boolean):string => {
    if(!valid && active){
        return 'error';
    }

    if(valid && active){
        return 'blue';
    }

    return 'gray';
} 
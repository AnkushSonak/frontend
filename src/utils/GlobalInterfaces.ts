interface ThemeColors{
    blue: string;
    black: string;
    darkGray: string;
    gray: string;
    lightGray: string;
    white: string;
    error: string;
}

export interface Theme{
    colors: ThemeColors;
}

export interface StyledInputprops{
    active: boolean;
    valid: boolean;
    theme: Theme;
    color?: string;
}

export interface ValidateInputState{
    active: boolean;
    valid: boolean;
    typedIn: boolean;
    labelActive: boolean;
    labelColor: string;
    value: string;
}

export interface Dob{
    month: number;
    day: number;
    year: number;
}

export interface StyledNextButtonProps {
    active: boolean;
    theme: Theme;
    color: string;
}

export interface StyledCheckBoxProps{
    active: boolean;
    theme: Theme;
}
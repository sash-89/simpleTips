import React from 'react';
import Switch from "@material-ui/core/Switch";
import {withStyles} from "@material-ui/styles";

export const BlueSwitch = ({ onChange, checked}) => <SwitchStyled onChange={onChange} checked={checked} />;

const SwitchStyled = withStyles({
    switchBase: {
        color: "#B9B7C8",

        '&$checked': {
            color: "#6E6BF0",
            left: -4,
            '&:hover': {
                backgroundColor: 'rgba(48,45,167,0.10)',
            },
        },
        '&$checked + $track': {
            backgroundColor: "#302DA7",
            opacity: 1,
        },
    },
    checked: {},
    track: {
        backgroundColor: "#E2E0EF",
        opacity: 1,
        width: 30
    }
})(Switch);
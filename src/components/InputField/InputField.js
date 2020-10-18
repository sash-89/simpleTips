import React, { useState} from "react";
import style from "./InputField.module.css"
import {useDispatch} from "react-redux";
import {toggleFieldInFocus} from "../../modules/windowSizeToggle/windowSizeAction";


export const InputField = ({maxLength,pattern,value, type , name, label, onClick,  onChange, placeholder, disabled, legendDown, isTextarea, fieldRef, ...props}) => {

    const dispatch = useDispatch()

    const [legendToggle, changeLegendToggle] = useState(true);

    const legendCls = [style.LegendIn, style.LegendUp];
    if (!value) if( legendDown === false ? legendDown : legendToggle ) legendCls.pop();


    const focusHandler =()=>{
        dispatch(toggleFieldInFocus(true))
        placeholder && changeLegendToggle(false)
    };

    const blurHandler =()=>{
        dispatch(toggleFieldInFocus(false))
        !value && changeLegendToggle(true)
    };

    const Teg = isTextarea ? "textarea" :"input";

    return (
            <fieldset className={style.Fieldset} style={isTextarea ? {height: 86} : null}>
                <legend className={legendCls.join(" ")}>{placeholder}</legend>
                <Teg maxLength={maxLength} ref={fieldRef}
                       autoComplete="off" value={value} className={style.Input} type={type} disabled={disabled} name={name}
                       onFocus={focusHandler}
                       onBlur={blurHandler}
                       onChange={(e) => onChange(e)}
                       pattern={pattern}/>
            </fieldset>
  )
};

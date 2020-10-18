import React, {useEffect, useRef, useState} from "react";
import style from "./InputField.module.css"
import PhoneInput from "react-phone-input-2";
import {toggleFieldInFocus} from "../../modules/windowSizeToggle/windowSizeAction";
import {useDispatch} from "react-redux";


export const PhoneInputField = ({maxLength, pattern, value, type , name, label, onClick,  onChange, placeholder, disabled, legendDown, emptyValue,  ...props}) => {
    const dispatch = useDispatch()

    const ref = useRef(null);
    const phoneNumberValue = ref.current && ref.current.numberInputRef.value

    const [legendToggle, changeLegendToggle] = useState(true);
    const [countryCode, setCountryCode] = useState(null);

    const legendCls = [style.LegendIn, style.LegendUp];


    if ( !phoneNumberValue && legendToggle) legendCls.pop();

    useEffect(()=>{
        // if(ref.current) ref.current.numberInputRef.focus()
        if (emptyValue && ref.current) ref.current.numberInputRef.value = ""
    }, []);

    const focusHandler = () => {
        dispatch(toggleFieldInFocus(true))
        placeholder && changeLegendToggle(false);
        if(!phoneNumberValue) setCountryCode("us")
    };

    const blurHandler =(e)=>{
        dispatch(toggleFieldInFocus(false));

        !e.target.value && changeLegendToggle(true)
    };


    return (
            <fieldset className={style.Fieldset} >
                <legend className={legendCls.join(" ")}>{placeholder}</legend>

                <PhoneInput
                    inputProps={{
                        // name: 'phone',
                        // required: true,
                        // autoFocus: true
                    }}
                    value={value}
                    onlyCountries={["us", "ru", "am"]}
                    disabled={disabled}
                    country={countryCode}
                    placeholder={null}
                    // onlyCountries={['us']}
                    disableDropdown={true}
                    masks={{us: '... ...-..-..', ru: '... ...-..-..', am: '.. ..-..-..',}}                       //delete am, ru*
                    defaultMask={'... ...-..-..'}

                    inputClass={style.inputClass}
                    onFocus={focusHandler}
                    onBlur={e => blurHandler(e)}
                    onChange={(phone) => onChange(phone)}

                    ref={ref}
                />
            </fieldset>
  )
};

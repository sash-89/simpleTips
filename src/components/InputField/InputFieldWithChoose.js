import React, {useEffect, useRef, useState} from "react";
import style from "./InputField.module.css";

import arrowDown from "../../assets/images/inputField/arrow-down-silver.png"
import arrowUp from "../../assets/images/inputField/arrow-up-blue.png"
import resetDataIcon from "../../assets/images/balance/reset-date.png";
import {useDispatch} from "react-redux";
import {toggleFieldInFocus} from "../../modules/windowSizeToggle/windowSizeAction";


export const InputFieldWithChoose = ({value, type, name, pattern, onClick, fieldsetCls,  itemOnClick, items, reactToValue, onChange, placeholder, disabled, dropdownMenu, openDropdownMenu, closeDropdownMenu, legendDown, children, childClsName}) => {
    const dispatch = useDispatch()

    const [legendToggle, changeLegendToggle] = useState(true);
    const ref = useRef(null)

    const childTop = ref.current && ref.current.getBoundingClientRect().height


    const legendCls = [ style.LegendIn, style.LegendUpWithChoose ];
    if (legendDown === false ? legendDown : legendToggle ) legendCls.pop();

    const FieldsetCls = [ style.Fieldset, fieldsetCls ];
    if (legendDown === false || !legendToggle) FieldsetCls.push(style.FieldsetBlue);


    const focusHandler =()=>{
        dispatch(toggleFieldInFocus(true));
        placeholder && changeLegendToggle(false)
    };

    const blurHandler =()=>{
        dispatch(toggleFieldInFocus(false));
        if(reactToValue)!value && changeLegendToggle(true) && closeDropdownMenu(false)
        else changeLegendToggle(true) && closeDropdownMenu(false)
    };

    return (
        <div className={style.fieldsetWrapper}>
            <fieldset className={FieldsetCls.join(" ")} ref={ref}>
                {items && items.map(item => {
                    return (
                        <div className={style.itemName} key={item}>
                            <div>
                                <span>{`${item}`}</span>
                            </div>
                            <img src={resetDataIcon} alt="resetData" onClick={() => itemOnClick(item)}/>
                        </div>
                    )
                })
                }
                <legend className={legendCls.join(" ")}>{placeholder}</legend>
                <input value={value} name={name} type={type} className={style.Input} disabled={disabled}
                       onFocus={focusHandler}
                       onBlur={blurHandler}
                       pattern={pattern}
                       autoComplete="off"
                       onChange={(e) => onChange(e)}/>

                <img src={legendDown === false || !legendToggle ? arrowUp : arrowDown} alt="arrow"
                     className={legendDown === false || !legendToggle ? style.arrowUp : style.arrowDown}
                />
            </fieldset>

            <div style={{top: childTop + 10}} className={openDropdownMenu ? [style.helper, childClsName].join(" ") : dropdownMenu || legendToggle ? style.helperOff : [style.helper, childClsName].join(" ")}>
                {children}
            </div>
        </div>
    )
};

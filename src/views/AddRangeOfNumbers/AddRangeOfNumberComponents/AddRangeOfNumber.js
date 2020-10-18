import React, {useState} from 'react';
import style from "./AddRangeOfNumber.module.css";

import cross from "../../../assets/images/rooms/cross.png";
import close from "../../../assets/images/addRangeOfNumbers/close-red.png";

import {Button} from "../../../components/Button/Button";
import {InputFieldWithChoose} from "../../../components/InputField/InputFieldWithChoose";
import {InputField} from "../../../components/InputField/InputField";
import {ReSendBtn} from "../../../components/ReSendBtn/ReSendBtn";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

const numbers = [];

for (let i = 1; i <= 10; i++) {
    numbers.push(i);
}

const AddRangeOfNumber = ({dropdownMenu, closeDropdownMenu, isLegendDown, inputValue, changeValue, chooseNumber}) => {
    const [addRangeOfNumberSecondIsOpen, addRangeOfNumberSecondOpening] = useState(null);
    const addRangeOfNumberSecondWrapperCls = [style.addRangeOfNumberSecondWrapper];

    if (addRangeOfNumberSecondIsOpen === true) addRangeOfNumberSecondWrapperCls.push(style.addRangeOfNumberSecondWrapperOpen);
    else if (addRangeOfNumberSecondIsOpen === false) addRangeOfNumberSecondWrapperCls.push(style.addRangeOfNumberSecondWrapperClose);

    return (
        <div className={style.AddRangeOfNumberContainer}>
            <HeaderSecondMB title={"Add Range of Numbers"}/>

            <div className={style.AddRangeOfNumberWrapper}>
                <InputFieldWithChoose placeholder={"Floor"}
                                      value={inputValue} onChange={changeValue} childClsName={style.child}
                                      closeDropdownMenu={closeDropdownMenu} dropdownMenu={dropdownMenu}
                                      legendDown={isLegendDown}
                >
                    <div className={style.numbersWrapper}>
                        {numbers.map(number => {
                            return (
                                <div key={number} onClick={() => chooseNumber(number)}
                                     className={style.number}>{number}</div>
                            )
                        })}
                    </div>
                </InputFieldWithChoose>

                <div className={style.inputFieldWrapper}>
                    <div className={style.range}>
                        <InputField placeholder={"From"}/>
                    </div>

                    <div className={style.line}/>

                    <div className={style.range}>
                        <InputField placeholder={"To"}/>
                    </div>
                </div>

                <div className={addRangeOfNumberSecondWrapperCls.join(" ")}>
                    <div className={style.hrLine}/>

                    <div className={style.inputFieldWithChooseSecondWrapper}>
                        <InputFieldWithChoose placeholder={"Floor"}
                                              value={inputValue} onChange={changeValue} childClsName={style.child}
                                              closeDropdownMenu={closeDropdownMenu} dropdownMenu={dropdownMenu}
                                              legendDown={isLegendDown}
                        >
                            <div className={style.numbersWrapper}>
                                {numbers.map(number => {
                                    return (
                                        <div key={number} onClick={() => chooseNumber(number)}
                                             className={style.number}>{number}</div>
                                    )
                                })}
                            </div>
                        </InputFieldWithChoose>
                        <img src={close} alt="close" onClick={() => addRangeOfNumberSecondOpening(false)}/>
                    </div>

                    <div className={style.inputFieldSecondWrapper}>
                        <div className={style.rangeSecond}>
                            <InputField placeholder={"From"}/>
                        </div>
                        <div className={style.line}/>
                        <div className={style.rangeSecond}>
                            <InputField placeholder={"To"}/>
                        </div>
                    </div>
                </div>

                <div className={style.hrLine}/>

                <div className={style.addRangeWrapper}>
                    <img src={cross} alt="cross"/>
                    <ReSendBtn value={"Add range"} onClick={() => addRangeOfNumberSecondOpening(true)}/>
                </div>
                <div className={style.BtnWrapper}>
                    <Button className={style.Btn}>Add Numbers</Button>
                </div>
            </div>
        </div>
    )
};

export default AddRangeOfNumber;

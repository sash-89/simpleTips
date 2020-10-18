import React from 'react';
import style from "./AddNumber.module.css";

import cross from "../../../assets/images/rooms/cross.png";

import {Button} from "../../../components/Button/Button";
import {InputFieldWithChoose} from "../../../components/InputField/InputFieldWithChoose";
import {InputField} from "../../../components/InputField/InputField";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";
import {numbersPattern} from "../../../utils/validators";

const numbers = [];

for (let i = 1; i <= 10; i++) {
    numbers.push(i);
}

const AddNumber = ({dropdownMenu, closeDropdownMenu, isLegendDown, roomNumberValue, errorMessage,
                       changeFloorNumber, chooseNumber, floorNumberValue,  changeRoomNumber, addRoom}) => {

    return (
        <div className={style.addNumberContainer}>
            <HeaderSecondMB title={"Add Number"}/>

            <div className={style.attachEmployeeWrapper}>
                <InputFieldWithChoose placeholder={"Floor"}
                                      pattern={numbersPattern}
                                      value={floorNumberValue} onChange={changeFloorNumber} childClsName={style.child}
                                      closeDropdownMenu={closeDropdownMenu} dropdownMenu={dropdownMenu}
                                      legendDown={isLegendDown}
                                      type={"tel"}
                >
                    <>
                        <div className={style.addNew}>
                            <img src={cross} alt="cross"/>
                            <div>Add new</div>
                        </div>
                        <div className={style.hrLine}/>
                        <div className={style.numbersWrapper}>
                            {numbers.map(number => {
                                return (
                                    <div key={number} onMouseDown={() => chooseNumber(number)}
                                         className={style.number}>{number}</div>
                                )
                            })}
                        </div>
                    </>
                </InputFieldWithChoose>

                <div className={style.inputFieldWrapper}>
                    <InputField
                        placeholder={"Number"}
                        onChange={changeRoomNumber}
                        value={roomNumberValue}
                        pattern={numbersPattern}
                        type={"tel"}
                    />
                </div>

                {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

                <div className={style.BtnWrapper}>
                    <Button onClick={addRoom} className={style.Btn}>Add Number</Button>
                </div>
            </div>
        </div>
    )
};

export default AddNumber;

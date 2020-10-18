import React, {useEffect, useState} from 'react';
import style from "./AttachOrReplaceEmployee.module.css";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";
import {InputFieldWithChoose} from "../../../components/InputField/InputFieldWithChoose";
import FloorsList from "../../../components/FloorsList/FloorsList";
import {BlueSwitch} from "../../../components/BlueSwitch/BlueSwitch";
import {Button} from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";

const modalText = "This number is assigned to another employee, when replacing it will be detached from this number."

const AttachOrReplaceEmployee = ({floors, rooms, floorNumber,
                            setFloorNumber, switchChecked, switchChange, inputValue, changeValue, dropdownMenu, isLegendDown, changeRoomSettler,
                            replaceUser, searchUser, emptyRooms, userAdd, chooseUser, modalToggle, changeModalToggle}) => {



    return(
        <div className={style.attachEmployeeContainer}
             style={dropdownMenu ? { overflowY: "auto"} : null}>

            <HeaderSecondMB headerClassName={style.headerClassName} title={"Attach Employee"} isCloseIcon={false}/>

            <div className={style.attachEmployeeWrapper}>
                <div className={style.inputFieldWrapper}>
                    <InputFieldWithChoose placeholder={"Employee Code or Name"}
                                          value={inputValue} onChange={changeValue}
                                          dropdownMenu={dropdownMenu} legendDown={isLegendDown}
                                          reactToValue={true}
                    >
                        {searchUser().map(user => {
                            return (
                                <div key={user} onMouseDown={() => chooseUser(user)} className={style.user}>{user}</div>
                            )
                        })}
                    </InputFieldWithChoose>
                </div>

                <div className={style.roomsWrapper}>

                    <div className={style.AvailableRoomsWrapper}>
                        <div>Available rooms only</div>
                        <div className={style.switch}>
                            <BlueSwitch
                                onChange={(e) => switchChange(e.target.checked)}
                                checked={switchChecked}
                            />
                        </div>
                    </div>

                    <div className={style.floorsWrapper}>
                        <FloorsList floors={floors} rooms={switchChecked ? emptyRooms : rooms} floorNumber={floorNumber}
                                    setFloorNumber={setFloorNumber} onClick={changeRoomSettler} user={inputValue}/>
                    </div>

                    {!dropdownMenu && <div className={style.backdrop}/>}
                </div>
                {dropdownMenu && <div className={style.BtnWrapper}>
                    <Button className={style.Btn} disabled={!userAdd}>Attach Employee</Button>
                </div>}
            </div>

            <Modal modalToggle={modalToggle} modalText={modalText} modalClassName={style.modalClassName}
                   valueLeftBtn={"Cancel"} onClickLeftBtn={()=>changeModalToggle(false)}
                   valueRightBtn={"Replace"} onClickRightBtn={replaceUser}
            />
        </div>
)};

export default AttachOrReplaceEmployee;

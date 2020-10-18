import React from 'react';
import style from "./EmployeesAndRooms.module.css"

import whiteCrossIcon from "../../../../assets/images/rooms/white-cross.png"
import FloorsList from "../../../../components/FloorsList/FloorsList";

const EmployeesAndRooms = ({history, floors, rooms, floorNumber, setFloorNumber, EmployeesAndRoomsModal, choosingModalIsOpen}) => {
    return(
        <>
            <div className={style.employeesAndRoomsContainer}>
                <FloorsList floors={floors} rooms={rooms} floorNumber={floorNumber} setFloorNumber={setFloorNumber}
                            onClick={EmployeesAndRoomsModal} choosingModalIsOpen={choosingModalIsOpen} cursorPointer={true}/>
            </div>

            <div className={style.ellipseWrapper} onClick={() => history.push("/rooms/attach_or_replace_employee")}>
                <div className={style.ellipse}>
                    <img src={whiteCrossIcon} alt="CrossIcon"/>
                </div>
                <span className={style.attachEmployee}>Attach Employee</span>
            </div>
        </>
)};

export default EmployeesAndRooms;

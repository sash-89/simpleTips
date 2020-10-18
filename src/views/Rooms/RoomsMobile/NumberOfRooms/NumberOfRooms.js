import React, {useEffect, useRef, useState} from 'react';
import style from "./NumberOfRooms.module.css";
import menuIcon from "../../../../assets/images/rooms/menuIcon.png";
import redStar from "../../../../assets/images/rooms/redStar.png";
import greenStar from "../../../../assets/images/rooms/greenStar.png";
import FloorsNumber from "../../../../components/FloorsNumber/FloorsNumber";
import {BlueSwitch} from "../../../../components/BlueSwitch/BlueSwitch";
import whiteCrossIcon from "../../../../assets/images/rooms/white-cross.png";


const NumberOfRooms = ({floors, floorNumber, setFloorNumber, rooms, choosingModalIsOpen,
                           numberOfRoomsDeleteModal, numberOfRoomsAddRoomModal, windowSizeMobile, organization}) => {

    const menuRef = useRef(null);
    const addNumbersRef = useRef(null);

    const [isRef, setRef] = useState(null);
    const [currentData, setCurrentData] = useState({});

    const menuClickHandler = (number, user)=>{
        setRef(number);
        setCurrentData({number, ref: menuRef, user});

        setTimeout(()=>numberOfRoomsDeleteModal(number, menuRef, user), 0)
    };

    const addNumbersClickHandler = ()=>{
        setCurrentData({number: null, ref: addNumbersRef, user: null});
        numberOfRoomsAddRoomModal(addNumbersRef)
    };

    useEffect(()=>{
       if(!isRef && currentData.number === null && choosingModalIsOpen[0]) numberOfRoomsAddRoomModal(addNumbersRef);
       else if(isRef && choosingModalIsOpen[0]) numberOfRoomsDeleteModal(currentData.number, currentData.ref, currentData.user)
    }, [windowSizeMobile]);

    return (
        <>

            <div className={style.numberOfRoomsContainer}>
                <div className={style.floorsNumberWrapper}>
                    <FloorsNumber floors={floors} floorNumber={floorNumber} setFloorNumber={setFloorNumber}/>
                </div>

                {rooms.length > 0 &&
                <>
                    <div className={style.titles}>
                        <div>Room</div>
                        <div>Room's code</div>
                        <div>Rating</div>
                        <div>Status</div>
                    </div>

                    <div className={style.roomsWrapper}>
                        {rooms.map(room => {
                            return (
                                <div key={room.number}
                                     style={room.active ? {background: "#FFFFFF"} : {background: "#FAF9FF"}}
                                     className={style.roomWrapper}>
                                    <div className={style.numberWrapper}>
                                       <span style={!room.active ? {color: "#6F6C86"} : null}
                                             className={style.symbolN}>No. </span>
                                        <span style={!room.active ? {color: "#6F6C86"} : null}>{room.number}</span>
                                    </div>

                                    <div style={!room.active ? {color: "#6F6C86"} : null} className={style.code}>
                                        {room.code}
                                    </div>

                                    <div className={style.starWrapper}>
                                        <img src={+room.rating >= 4 ? greenStar : redStar} alt="star"/>
                                        <span
                                            className={+room.rating >= 4 ? style.greenStar : style.redStar}>{`${room.rating}`}</span>
                                    </div>

                                    <div className={style.switchWrapper}>
                                    <span style={!room.active ? {color: "#6F6C86"} : null} className={style.active}>
                                            {room.active ? "Active" : "Unactive"}
                                    </span>

                                        <div className={style.switch}>
                                            <BlueSwitch checked={room.active}/>
                                        </div>
                                    </div>

                                    <img ref={room.number === isRef ? menuRef : null} src={menuIcon} alt="menu"
                                         className={style.menuIcon}
                                         onClick={() => menuClickHandler(room.number, room.user ? room.user.nameForProfile : null)}/>

                                </div>
                            )
                        })}
                    </div>
                </>}
            </div>

        {organization && <div ref={addNumbersRef} className={style.ellipseWrapper} onClick={()=>addNumbersClickHandler()}>
                <div className={style.ellipse}>
                    <img src={whiteCrossIcon} alt="CrossIcon"/>
                </div>
                <span className={style.addNumbers}>Add Numbers</span>
            </div>}
        </>
    )
};

export default NumberOfRooms;
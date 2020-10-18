import React, {useEffect, useRef, useState} from 'react';
import style from "./FloorsList.module.css";

import Checked from "../../assets/images/numberSelection/checked-black.png";
import FloorsNumber from "../FloorsNumber/FloorsNumber";
import {useDispatch, useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import {setCurrentRoom} from "../../modules/organization/organizationActions";

const FloorsList = ({floors, rooms, floorNumber, setFloorNumber, user, onClick, choosingModalIsOpen, cursorPointer}) => {
    const windowSizeMobile = useSelector(state => windowSizeSelector(state));
    const dispatch = useDispatch();

    const ref = useRef(null);
    const [isRef, setRef] = useState(null);
    const [currentData, setCurrentData] = useState({});

    const click = (roomNumber, roomSettler, user)=>{
        setRef(roomNumber);
        setCurrentData({roomNumber, roomSettler, user, ref});
        dispatch(setCurrentRoom(roomNumber));
        setTimeout(()=>onClick(roomNumber, roomSettler, user, ref), 0)
    };

    useEffect(()=>{
        isRef && choosingModalIsOpen && choosingModalIsOpen[0] && onClick(currentData.roomNumber, currentData.roomSettler, currentData.user, currentData.ref)
    }, [windowSizeMobile]);

    return (
        <div className={style.floorsContainer}>

            <FloorsNumber floors={floors} floorNumber={floorNumber} setFloorNumber={setFloorNumber}/>

            <div className={style.rooms}>
                {rooms.map((room, i) => {
                    return (
                        <div ref={room.number === isRef ? ref : null} style={(room.user === null || cursorPointer) ? {cursor: "pointer"} : null}
                             key={room.number + i} onClick={()=>{onClick && click(room.number, room.user, user, room.floor)}}
                             className={room.user && user && room.user.id === user.id ? style.servedByMe : room.user ? style.room : style.emptyRoom}>
                            <span className={style.roomNumber}>{room.number}</span>
                            <span className={style.roomSettler}>{room.user ? `${room.user.firstName} ${room.user.lastName}` : "Free"}</span>
                            {room.user && user && room.user.id === user.id && <div className={style.checked}>
                                <img src={Checked} alt="Checked"/>
                            </div>}
                        </div>
                    )
                })

                }
            </div>


        </div>
    )
};

export default FloorsList;
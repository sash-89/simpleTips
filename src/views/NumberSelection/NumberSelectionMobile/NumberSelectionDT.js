import React, {useRef} from 'react';
import style from "./NumberSelection.module.css";

import MyList from "./MyList/MyList";
import FloorsList from "../../../components/FloorsList/FloorsList";
import sortModal from "../../../assets/images/balance/menu.png";

const NumberSelectionDT = ({floors, rooms, floorNumber, setFloorNumber, userRoomList, userFullName, user, organisationChoosingModal, changeModalToggle, menuRef}) => {

    return (
        <div className={style.numberSelectionDTContainer}>
            <div className={style.numberSelectionWrapper}>
                <div className={style.titleWrapper}>
                    <div className={style.title}>
                        Number selection
                    </div>

                    <div ref={menuRef} className={style.menuWrapper} onClick={() => organisationChoosingModal(menuRef)}>
                        <img src={sortModal} alt="menuModal"/>

                        <div>My organisations</div>
                    </div>
                </div>

                <FloorsList user={user} floors={floors} rooms={rooms} onClick={changeModalToggle} floorNumber={floorNumber} setFloorNumber={setFloorNumber}/>
            </div>

            <div className={style.myListWrapper}>
                <div className={style.title}>
                    My list
                </div>
                <MyList userRoomList={userRoomList} userFullName={userFullName}/>
            </div>
        </div>
    )

};

export default NumberSelectionDT;
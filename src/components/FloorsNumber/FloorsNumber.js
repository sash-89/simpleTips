import React from 'react';
import style from "./FloorsNumber.module.css";



const FloorsNumber = ({floors, floorNumber, setFloorNumber}) => {

    return(
        <>
            <div className={style.floorTitle}>
                Floor
            </div>

            <div className={style.floorsNumberWrapper}>
                <div className={style.floorNumber}>
                    {floors.map(floor => {
                        return <span key={floor}
                                     className={floorNumber === floor ? style.activeFloor : style.floor}
                                     onClick={() => setFloorNumber(floor)}
                        >{floor}</span>
                    })}
                </div>
            </div>
        </>

)};

export default FloorsNumber;
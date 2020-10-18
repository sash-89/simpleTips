import React from 'react';
import style from "./MyList.module.css";
import {InputField} from "../../../../components/InputField/InputField";
import {userRoomListSelector} from "../../../../modules/organization/organizationSelectors";



const myList = [
    {
        floorNumber: 1,
        servedByMe: [103, 104, 105]
    },
    {
        floorNumber: 2,
        servedByMe: [108, 109, 110, 111]
    },

];

const MyList = ({userRoomList, userFullName}) => {
    return(
        <div className={style.MyListContainer}>
            {userRoomList && userRoomList.map(list => {
                return <div key={list.floorNumber}>
                    <div style={{marginTop: 10}} className={style.floor}>
                        {list.floorNumber} floor
                    </div>
                    {list.rooms.map(room => {
                        return <div key={room} className={style.myList}>

                            <div className={style.room}>
                                <span>№{room}</span>
                                <span>{userFullName}</span>
                            </div>
                        </div>
                    })}
                </div>
            })}

                {/*{myList.map( list => {*/}
                {/*    return <div key={list.floorNumber} className={style.myList}>*/}
                {/*        <div className={style.floor}>*/}
                {/*            {list.floorNumber} floor*/}
                {/*        </div>*/}
                {/*            {list.servedByMe.map( room => {*/}
                {/*                return (*/}
                {/*                    <div key={room} className={style.room}>*/}
                {/*                       <span>№{room}</span>*/}
                {/*                       <span>Alex Smith</span>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*    </div>*/}
                {/*})}*/}
        </div>

)};

export default MyList;
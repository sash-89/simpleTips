import React, {useEffect, useState} from 'react';
import AttachOrReplaceEmployee from "./AttachOrReplaceEmployee/AttachOrReplaceEmployee";
import {withRouter} from "react-router-dom";

const floors = [];

for (let i = 1; i <= 10; i++) {
    floors.push(i);
}



const AttachOrReplaceEmployeeContainer = ({history}) => {
    const [rooms, filterRooms] = useState([
        {
            roomNumber: 101,
            roomSettler: null,
        },
        {
            roomNumber: 102,
            roomSettler: null,
        },
        {
            roomNumber: 103,
            roomSettler: "Sara Johnson",
        },
        {
            roomNumber: 104,
            roomSettler: "Sara Johnson",
        },
        {
            roomNumber: 105,
            roomSettler: "Sara Johnson",
        },
        {
            roomNumber: 106,
            roomSettler: null,
        },
        {
            roomNumber: 107,
            roomSettler: "Sara Johnson",
        },
        {
            roomNumber: 108,
            roomSettler: "Sara Johnson",
        },
        {
            roomNumber: 109,
            roomSettler: null,
        },
        {
            roomNumber: 110,
            roomSettler: "Sara Johnson",
        },
    ])



    const [floorNumber, setFloorNumber] = useState(1);
    const [switchChecked, switchChange] = useState(true);
    const [dropdownMenu, closeDropdownMenu] = useState(false);
    const [isLegendDown, toggleLegend] = useState(true);

    const [modalToggle, changeModalToggle] = useState(false);
    const [selectedUser, selectUser] = useState(null);

    const [inputValue,  changeValue] = useState("");
    const users = ["Sara Connor", "John Johns", "Mike Tyson", "Johny Cage",];

    const changeRoomSettler =(roomNumber, currentRoomSettler, user)=>{
        if(!currentRoomSettler) updateRoomSettler(roomNumber, user);
        else if(currentRoomSettler === user) deleteRoomSettler(roomNumber);
        else if(!modalToggle && currentRoomSettler) changeModalToggle(true)
        if(!switchChecked && currentRoomSettler) selectUser({roomNumber, user})
    };

    const replaceUser = ()=>{
        updateRoomSettler(selectedUser.roomNumber, selectedUser.user)
        selectUser(null);
        changeModalToggle(false)
    };

    const updateRoomSettler =(roomNumber, roomSettler)=>{
        filterRooms(rooms.map(room=>room.roomNumber!==roomNumber ? room : {...room, roomSettler}))
    };

    const deleteRoomSettler =(roomNumber)=>{
        filterRooms(rooms.map(room=>room.roomNumber!==roomNumber ? room : {...room, roomSettler: null}))
    };

    const searchUser =()=>{
        if (!inputValue.trim()) return users;
        return users.filter(user=>{
            return user.toLowerCase().includes(inputValue.toLowerCase().trim())
            }
        )
    };

    const emptyRooms = rooms.filter(room => !room.roomSettler || room.roomSettler===inputValue);
    const userAdd = rooms.some(room => room.roomSettler === inputValue);
    const enableUser = users.find( user => user === inputValue);

    useEffect(()=>{
        closeDropdownMenu(!!(enableUser))
    }, [inputValue]);

    useEffect(()=>{
        toggleLegend(inputValue === "")
    }, [inputValue]);

    const chooseUser =(userName)=>{
        changeValue(userName);
        closeDropdownMenu(true);
        toggleLegend(inputValue !== "")
    };


    return(

            <AttachOrReplaceEmployee  floors={floors} rooms={rooms} floorNumber={floorNumber} setFloorNumber={setFloorNumber}
                                      switchChecked={switchChecked} switchChange={switchChange}
                                      updateRoomSettler={updateRoomSettler} dropdownMenu={dropdownMenu} isLegendDown={isLegendDown}
                                      changeRoomSettler={changeRoomSettler} replaceUser={replaceUser} searchUser={searchUser}
                                      emptyRooms={emptyRooms} userAdd={userAdd} chooseUser={chooseUser} inputValue={inputValue} changeValue={changeValue}
                                      modalToggle={modalToggle} changeModalToggle={changeModalToggle}
            />

)};

export default withRouter(AttachOrReplaceEmployeeContainer);

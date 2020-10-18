import React, {useEffect, useState} from 'react';
import style from "./RoomsMobile/Rooms.module.css"

import {withRouter} from "react-router-dom";

import Rooms from "./RoomsMobile/Rooms";
import NumberOfRooms from "./RoomsMobile/NumberOfRooms/NumberOfRooms";
import EmployeesAndRooms from "./RoomsMobile/EmployeesAndRooms/EmployeesAndRooms";
import Modal from "../../components/Modal/Modal";
import ChoosingModal from "../../components/ChoosingModal/ChoosingModal";

import replace from "../../assets/images/choosingModal/replace.png";
import unpin from "../../assets/images/choosingModal/unpin.png";
import cross from "../../assets/images/rooms/cross.png";
import deleteIcon from "../../assets/images/rooms/delete.png";
import addOneIcon from "../../assets/images/rooms/add-one.png";
import addManyIcon from "../../assets/images/rooms/add-many.png";
import {compose} from "redux";
import {connect} from "react-redux";
import {requestToGetOrganizationRooms, setCurrentRoom, setRooms} from "../../modules/organization/organizationActions";
import {roomsSelector} from "../../modules/organization/organizationSelectors";
import SuccessMessageModal from "../../components/SuccessMessageModal/SuccessMessageModal";
import {adminOrganizationSelector, successMessageSelector} from "../../modules/userProfile/userProfileSelectors";
import {deleteSuccessMessage} from "../../modules/userProfile/userProfileActions";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";

const floors = [];

for (let i = 1; i <= 10; i++) {
    floors.push(i);
}

const numberOfRooms = [
    {
        roomNumber: 101,
        code: "014850",
        star: "5.0",
        active: true
    },
]

const RoomsContainer = ({history, requestToGetOrganizationRooms, rooms, setRooms, successMessage,
                            deleteSuccessMessage, setCurrentRoom, organization, windowSizeMobile, location: {pathname}}) => {
    const [floorNumber, setFloorNumber] = useState(1);

    const [choosingModalIsOpen, choosingModalToggle]= useState([false, null]);

    const [numberOfRoomsModalIsOpen, numberOfRoomsModalToggle] = useState(false);
    const [deleteRoom, setDeleteRoom] = useState(null);
    const [currentTarget, setCurrentTarget] = useState(null);

    const modalText = `Are you sure you want to delete No. ${deleteRoom} (${floorNumber} floor)`


    const EmployeesAndRoomsModal = (roomNumber, roomSettler, user , ref) => {
        setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), false]);
        setDeleteRoom(roomNumber);

        if (!roomSettler) history.push('/rooms/attach_employee');
        else choosingModalToggle([true, [
            {
                title: `No. ${roomNumber}`,
                style: style.roomNumber,
            },
            {
                title: "Replace employee",
                icon: replace,
                onClick: ()=> {
                    choosingModalToggle([false, []]);
                    history.push("/rooms/replace_employee")
                }
            },
            {
                title: "Unpin employee",
                icon: unpin,
                style: style.unpin,
                onClick: ()=>{
                    setRooms(rooms.map(room => room.number!== roomNumber ? room : {...room, user: null}))
                    choosingModalToggle([false, choosingModalIsOpen[1]])
                }
            },
        ]]);
    };

    const numberOfRoomsDeleteModal = (roomNumber, ref, user) => {
        setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), true]);

        choosingModalToggle([true, [
            {
                title: `No. ${roomNumber}`,
                style: style.roomNumber,
            },
            {
                title: "Attach Employee",
                icon: cross,
                onClick: ()=> {
                    if(user){
                        history.push("/rooms/replace_employee")
                    } else {
                        setCurrentRoom(roomNumber);
                        history.push("/rooms/attach_employee")
                    }
                    choosingModalToggle([false, []]);
                }
            },
            {
                title: "Delete number",
                icon: deleteIcon,
                style: style.delete,
                onClick: ()=>{
                    numberOfRoomsModalToggle(true)
                    setDeleteRoom(roomNumber)
                }
            }]
        ])
    };


    const numberOfRoomsAddRoomModal = (ref) => {
        setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), true]);

        choosingModalToggle([true, [
            {
                title: `Add Room`,
                style: style.roomNumber,
            },
            {
                title: "One number",
                icon: addOneIcon,
                onClick: ()=> {
                    choosingModalToggle([false, []]);
                    history.push("/rooms/add_number")
                }
            },
            {
                title: "Range of numbers",
                icon: addManyIcon,
                onClick: ()=>{
                    choosingModalToggle([false, []])
                    history.push("/rooms/add_range_of_numbers")
                }
            }]
        ])
    };



    const tabs = [
        {
            tittle: "Employees and rooms",
            component: <EmployeesAndRooms choosingModalIsOpen={choosingModalIsOpen}
                                          EmployeesAndRoomsModal={EmployeesAndRoomsModal} history={history}
                                          floors={floors} rooms={rooms} floorNumber={floorNumber} setFloorNumber={setFloorNumber}/>,
        },
        {
            tittle: "Number of rooms",
            component: <NumberOfRooms choosingModalIsOpen={choosingModalIsOpen} windowSizeMobile={windowSizeMobile} organization={organization}
                                      numberOfRoomsDeleteModal={numberOfRoomsDeleteModal} numberOfRoomsAddRoomModal={numberOfRoomsAddRoomModal}
                                      floors={floors} floorNumber={floorNumber} setFloorNumber={setFloorNumber} rooms={rooms}/>,

        },
    ];

    useEffect(()=>{
        requestToGetOrganizationRooms()
    }, []);

    useEffect(()=>{
        let messageTimer;
        if (successMessage) {
            messageTimer = setTimeout(deleteSuccessMessage, 800)
        }

        return ()=>{
            clearTimeout(messageTimer)
        }
    } ,[successMessage]);

    return(
        <>

            <ChoosingModal isGrey={true} currentTarget={currentTarget && currentTarget[0]} rightSide={currentTarget && currentTarget[1]}
                           choosingModalData={choosingModalIsOpen} choosingModalToggle={choosingModalToggle}/>

            <Rooms tabs={tabs} pathname={pathname} windowSizeMobile={windowSizeMobile}/>

            <Modal modalToggle={numberOfRoomsModalIsOpen} modalText={modalText} modalClassName={style.modalClassName}
                   valueLeftBtn={"Cancel"} onClickLeftBtn={() => numberOfRoomsModalToggle(false)}
                   valueRightBtn={"Delete"} onClickRightBtn={() => { alert("Delete")}}
            />

            {successMessage && <SuccessMessageModal modalText={successMessage}/>}

        </>
)};

const mapStateToProps = state => ({
    rooms: roomsSelector(state),
    successMessage: successMessageSelector(state),
    windowSizeMobile: windowSizeSelector(state),
    organization: adminOrganizationSelector(state),
});

export default compose(
    connect(mapStateToProps, {requestToGetOrganizationRooms, setRooms, deleteSuccessMessage, setCurrentRoom}),
    withRouter
)(RoomsContainer);

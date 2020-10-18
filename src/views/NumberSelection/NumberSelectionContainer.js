import React, {useEffect, useRef, useState} from 'react';
import style from "./NumberSelectionMobile/NumberSelection.module.css";

import NumberSelectionMB from "./NumberSelectionMobile/NumberSelectionMB";
import FloorsList from "../../components/FloorsList/FloorsList";
import MyList from "./NumberSelectionMobile/MyList/MyList";
import NumberSelectionDT from "./NumberSelectionMobile/NumberSelectionDT";
import {useDispatch, useSelector} from "react-redux";
import {
    changeModalToggleForAttachingRoomByUser, requestToAttachRoomFromUser,
    requestToGetUserRoomList,
    requestToUserOrganizationRoomsByFloor
} from "../../modules/organization/organizationActions";
import {
    modalToggleForAttachingRoomByUserSelector,
    roomsSelector,
    userRoomListSelector
} from "../../modules/organization/organizationSelectors";
import {
    currentUserOrganizationSelector,
    userFullNameSelector, userOrganizationsSelector,
    userSelector
} from "../../modules/userProfile/userProfileSelectors";
import ChoosingModal from "../../components/ChoosingModal/ChoosingModal";
import organisationIcon from "../../assets/images/headerMenu/organisation.png";
import {setUserCurrentOrganization} from "../../modules/userProfile/userProfileActions";
import Modal from "../../components/Modal/Modal";


const floors = [];

for (let i = 1; i <= 10; i++) {
    floors.push(i);
}


const rooms = [
    {
        roomNumber: 101,
        roomSettler: null,
        isServedByMe: false,
    },
    {
        roomNumber: 103,
        roomSettler: "Sara Johnson",
        isServedByMe: true,
    },
    {
        roomNumber: 104,
        roomSettler: "Sara Johnson",
        isServedByMe: true,
    },
    {
        roomNumber: 105,
        roomSettler: "Sara Johnson",
        isServedByMe: true,
    },
    {
        roomNumber: 106,
        roomSettler: null,
        // isServedByMe: true,
    },
    {
        roomNumber: 107,
        roomSettler: "Sara Johnson",
        // isServedByMe: false,
    },
    {
        roomNumber: 108,
        roomSettler: "Sara Johnson",
        // isServedByMe: false,
    },
    {
        roomNumber: 109,
        roomSettler: null,
        // isServedByMe: true,
    },
    {
        roomNumber: 110,
        roomSettler: "Sara Johnson",
        // isServedByMe: true,
    },
];

const NumberSelectionContainer = ({}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => userSelector(state));
    const userOrganizations = useSelector(state => userOrganizationsSelector(state));
    const currentUserOrganization = useSelector(state => currentUserOrganizationSelector(state));
    const userOrganizationRooms = useSelector(state => roomsSelector(state));
    const userRoomList = useSelector(state => userRoomListSelector(state));
    const userFullName = useSelector(state => userFullNameSelector(state));
    const modalToggle = useSelector(state => modalToggleForAttachingRoomByUserSelector(state));

    const menuRef = useRef(null);

    const [floorNumber, setFloorNumber] = useState(1);
    const [organisationChoosingModalData, organisationChoosingModalToggle] = useState([false, null]);
    const [selectedCurrentOrganisation, changeCurrentOrganisation] = useState(userOrganizations[0].organizationName);
    const [currentTarget, setCurrentTarget] = useState(null);
    const [selectedRoom, selectRoom] = useState(null);

    const organisationChoosingModal = (ref) => {
        ref && setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), true]);

        const myOrganisations = [true, [
            {
                title: "My organisations",
                style: style.organisationTitle,
            },
            ...userOrganizations.map(o => {
                return {
                    title: o.organizationName,
                    icon: organisationIcon,
                    // style: style.alphabetically,
                    onClick: (item) => {
                        changeCurrentOrganisation(item);
                        organisationChoosingModalToggle([false, myOrganisations[1]])
                        if (o.organizationName !== selectedCurrentOrganisation) {
                            dispatch(setUserCurrentOrganization(o));
                            setFloorNumber(1)
                            dispatch(requestToUserOrganizationRoomsByFloor(o.id, 1))
                            dispatch(requestToGetUserRoomList(o.id))
                        }
                    }
                }
            }),
            {
                title: "Organisation 2",
                icon: organisationIcon,
                onClick: (item) => {
                    changeCurrentOrganisation(item);
                    organisationChoosingModalToggle([false, myOrganisations[1]])
                }
            },
            {
                title: "Organisation 3",
                icon: organisationIcon,
                onClick: (item) => {
                    changeCurrentOrganisation(item);
                    organisationChoosingModalToggle([false, myOrganisations[1]])
                }
            }, {
                title: "Organisation 4",
                icon: organisationIcon,
                onClick: (item) => {

                    changeCurrentOrganisation(item);
                    organisationChoosingModalToggle([false, myOrganisations[1]])
                }
            },
            {
                title: "Organisation 5",
                icon: organisationIcon,
                onClick: (item) => {
                    changeCurrentOrganisation(item);
                    organisationChoosingModalToggle([false, myOrganisations[1]])
                }
            }]
        ];

        organisationChoosingModalToggle(myOrganisations)

    };

    const changeFloor = (floorNumber) => {
        dispatch(requestToUserOrganizationRoomsByFloor(currentUserOrganization.id, floorNumber))
        setFloorNumber(floorNumber)
    };

    const changeModalToggle = (number, currentUser, user, floor) => {
        if(currentUser === null) {
            selectRoom(number)
            dispatch(changeModalToggleForAttachingRoomByUser(true))
        }
    };

    const attachRoom = () => {
            dispatch(requestToAttachRoomFromUser(selectedRoom))
    };

    useEffect(() => {
        dispatch(requestToUserOrganizationRoomsByFloor(currentUserOrganization.id, floorNumber));
        dispatch(requestToGetUserRoomList(currentUserOrganization.id))
    }, []);

    const tabs = [
        {
            tittle: "Number selection",
            component: <FloorsList floors={floors} rooms={userOrganizationRooms} onClick={changeModalToggle}
                                   floorNumber={floorNumber} setFloorNumber={changeFloor} user={user}/>,
        },
        {
            tittle: "My list",
            component: <MyList userRoomList={userRoomList} userFullName={userFullName}/>,

        },
    ];

    
    return (
        <>
            <div className={"Mobile"}>
                <NumberSelectionMB tabs={tabs} menuRef={menuRef} organisationChoosingModal={organisationChoosingModal}/>
            </div>

            <div className={"Desktop"}>
                <NumberSelectionDT floors={floors} rooms={userOrganizationRooms} floorNumber={floorNumber}
                                   setFloorNumber={changeFloor} changeModalToggle={changeModalToggle}
                                   userRoomList={userRoomList} userFullName={userFullName} user={user}
                                   organisationChoosingModal={organisationChoosingModal} menuRef={menuRef}
                />
            </div>

            <ChoosingModal isGrey={true}
                           currentTarget={currentTarget ? currentTarget[0] : null}
                           rightSide={currentTarget ? currentTarget[0] : null}
                           className={style.choosingModal} choosingModalData={organisationChoosingModalData}
                           choosingModalToggle={organisationChoosingModalToggle}
                           selectedItem={selectedCurrentOrganisation}/>

            <Modal modalClassName={style.modal}
                   valueLeftBtn={'Cancel'}
                   onClickLeftBtn={() => dispatch(changeModalToggleForAttachingRoomByUser(false))}
                   valueRightBtn={'Attach'}
                   onClickRightBtn={attachRoom}
                   modalToggle={modalToggle}
                   modalText={`Are you sure you want to attach No. ${selectedRoom} room (${floorNumber} floor)?`}/>

        </>
    )
};

export default NumberSelectionContainer

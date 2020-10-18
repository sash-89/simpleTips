import React, {useEffect, useState} from 'react';
import style from "./RecipientsComponents/Recipients.module.css"

import alphabeticallyIcon from "../../assets/images/recipients/alphabetically-mobile.png";
import byEarningsIcon from "../../assets/images/recipients/by-earnings-mobile.png";
import byRateIcon from "../../assets/images/recipients/by-rate-mobile.png";
import printFormsIcon from "../../assets/images/recipients/print-forms.png";
import employeeReviewsIcon from "../../assets/images/recipients/employee-reviews.png";
import newIcon from "../../assets/images/recipients/new.png";
import registeredIcon from "../../assets/images/recipients/registered.png";
import dateIcon from "../../assets/images/balance/dateMenu.png";

import Recipients from "./RecipientsComponents/Recipients";
import {withFormatInCurrency} from "../../HOC/withFormatInCurrency";
import WeeklyRecipients from "./WeeklyRecipientsMobile/WeeklyRecipients";
import deleteIcon from "../../assets/images/rooms/delete.png";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

import alphabeticallyActive from "../../assets/images/recipients/alphabetically-active.png";
import byEarnings from "../../assets/images/recipients/by-earnings.png";
import byRate from "../../assets/images/recipients/by-rate.png";
import byDate from "../../assets/images/recipients/by-date.png";

import incomeMobile from "../../assets/images/balance/incomeMobile.png";
import outcomeMobile from "../../assets/images/balance/outcomeMobile.png";
import {connect, useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import Backdrop from "../../components/Backdrop/Backdrop";
import ChoosingDate from "../DateBalance/DateBalanceMobile/ChoosingDate/ChoosingDate";
import ChoosingModal from "../../components/ChoosingModal/ChoosingModal";
import {deleteSuccessMessage} from "../../modules/userProfile/userProfileActions";
import {roomsSelector} from "../../modules/organization/organizationSelectors";
import {successMessageSelector} from "../../modules/userProfile/userProfileSelectors";
import {requestToGetOrganizationRooms, setRooms} from "../../modules/organization/organizationActions";
import SuccessMessageModal from "../../components/SuccessMessageModal/SuccessMessageModal";
import Rooms from "../Rooms/RoomsMobile/Rooms";


const recipients = [
    {
        recipientName: "Sophia Miller",
        code: "014850",
        star: "5.0",
        waitingForConfirmation: false,
        tips: 234,
    },
    {
        recipientName: "Isabella Johnson",
        code: "014850",
        star: "4.8",
        waitingForConfirmation: true,
        tips: 234,
    },
    {
        recipientName: "Emma Williams",
        code: "014850",
        star: "3.2",
        waitingForConfirmation: false,
        tips: 234,
    },
    {
        recipientName: "Olivia Miller",
        code: "014850",
        star: "5.0",
        waitingForConfirmation: false,
        tips: 234,
    },
    {
        recipientName: "Sophia Mill",
        code: " 014850",
        star: "5.0",
        waitingForConfirmation: false,
        tips: 234,
    },
]

const sortItems = [
    {
        title: "Alphabetically",
        icon: alphabeticallyIcon,
        iconActive: alphabeticallyActive,
    },
    {
        title: "By earnings",
        icon: byEarnings,
        iconActive: incomeMobile,
    },
    {
        title: "By rate",
        icon: byRate,
        iconActive: outcomeMobile,
    },
    {
        title: "By date added",
        icon: byDate,
        iconActive: outcomeMobile,
    },
];

const RecipientsContainer = ({formatInCurrency, successMessage, deleteSuccessMessage, windowSizeMobile, history, location: {pathname}}) => {
    const [firstDate, setFirstDate] = useState({day: null, month: null, year: null});
    const [secondDate, setSecondDate] = useState({day: null, month: null, year: null});
    const [showRecipientsByDate, showRecipientsByDateToggle] = useState(false);
    const [choosingDateIsOpen, choosingDateToggle] = useState(null);
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const [selectedSortItem, changeSelectedItem] = useState("Alphabetically")
    const [recipientsChoosingModalData, recipientsChoosingModalToggle] = useState([false, null]);
    const [currentTarget, setCurrentTarget] = useState(null);


    const recipientsSortModal = () => {
        recipientsChoosingModalToggle([true, [
            {
                title: "Sort"
            },
            {
                title: "Alphabetically",
                icon: alphabeticallyIcon,
                style: style.alphabetically,
                onClick: (item) => {
                    changeSelectedItem(item);
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            },
            {
                title: "By earnings",
                icon: byEarningsIcon,
                onClick: (item) => {
                    changeSelectedItem(item);
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            },
            {
                title: "By rate",
                icon: byRateIcon,
                onClick: (item) => {
                    changeSelectedItem(item);
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            },
            {
                title: "By date added",
                icon: dateIcon,
                onClick: (item) => {
                    changeSelectedItem(item);
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            }]
        ])

    };

    const recipientsActionModal = (recipientName, ref) => {
        setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), true]);

        recipientsChoosingModalToggle([true, [
            {
                title: `${recipientName}`,
                style: style.mobile,
            },
            {
                title: "Print forms",
                icon: printFormsIcon,
                onClick: () => {
                    alert("Print forms")
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            },
            {
                title: "Employee Reviews",
                icon: employeeReviewsIcon,
                onClick: () => {
                    alert("Employee Reviews")
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            },
            {
                title: "Delete Recipient",
                icon: deleteIcon,
                style: style.delete,
                onClick: () => {
                    alert("Delete Recipient")
                    recipientsChoosingModalToggle([false, recipientsChoosingModalData[1]])
                }
            }
        ]
        ])
    };

    const addRecipientsModal = (ref) => {
        setCurrentTarget(ref.current && [ref.current.getBoundingClientRect(), true]);

        recipientsChoosingModalToggle([true, [
            {
                title: "Add Recipients",
                style: style.mobile,
            },
            {
                title: "New",
                icon: newIcon,
                onClick: () => {
                    history.push("/recipients/add_new_recipient");
                    recipientsChoosingModalToggle([false, null])
                }
            },
            {
                title: "Registered",
                icon: registeredIcon,
                onClick: () => {
                    history.push("/recipients/registered_recipient");
                    recipientsChoosingModalToggle([false, null])
                }
            }
        ]
        ])
    };

    const tabs = [
        {
            tittle: "Week",
            component: <WeeklyRecipients formatInCurrency={formatInCurrency} sortItems={sortItems} recipientsChoosingModalData={recipientsChoosingModalData}
                                         recipientsActionModal={recipientsActionModal} recipientsChoosingModalToggle={recipientsChoosingModalToggle}
                                         selectedSortItem={selectedSortItem} changeSelectedItem={changeSelectedItem}

                                         recipients={recipients}
            />,
        },
        {
            tittle: "Month",
            component: <WeeklyRecipients formatInCurrency={formatInCurrency} sortItems={sortItems} recipientsChoosingModalData={recipientsChoosingModalData}
                                         recipientsActionModal={recipientsActionModal} recipientsChoosingModalToggle={recipientsChoosingModalToggle}
                                         selectedSortItem={selectedSortItem} changeSelectedItem={changeSelectedItem}

                                         recipients={recipients}
            />,
        },
        {
            tittle: "Year",
            component: <WeeklyRecipients formatInCurrency={formatInCurrency} sortItems={sortItems} recipientsChoosingModalData={recipientsChoosingModalData}
                                         recipientsActionModal={recipientsActionModal} recipientsChoosingModalToggle={recipientsChoosingModalToggle}
                                         selectedSortItem={selectedSortItem} changeSelectedItem={changeSelectedItem}

                                         recipients={recipients}
            />,
        }
    ];


    useEffect(()=>{
        let messageTimer;
        if (successMessage) {
            messageTimer = setTimeout(deleteSuccessMessage, 800)
        }

        return ()=>{
            clearTimeout(messageTimer)
        }
    } ,[successMessage]);

    return (

        <>
            <div className={"Desktop"}>
                <Backdrop choosingTransactionsIsOpen={choosingDateIsOpen} onClick={() => choosingDateToggle(false)}/>
            </div>

            {!windowSizeMobile && recipientsChoosingModalData[1] && recipientsChoosingModalData[1][0].title === "Sort"
                ? null
                : <ChoosingModal isGrey={true} currentTarget={currentTarget && currentTarget[0]} rightSide={currentTarget && currentTarget[1]}
                                 className={recipientsChoosingModalData[1] &&
                                 (recipientsChoosingModalData[1][1].title === "Print forms" ? style.choosingModal
                                     : recipientsChoosingModalData[1][0].title === "Sort" ? style.sortChoosingModal : null)}

                                 modalHeight={recipientsChoosingModalData[1] && recipientsChoosingModalData[1][1].title === "Print forms" ? 160 : null}
                                 choosingModalData={recipientsChoosingModalData}
                                 choosingModalToggle={recipientsChoosingModalToggle} selectedItem={selectedSortItem}/>
            }

            {!recipientsChoosingModalData[0] && !windowSizeMobile &&
            <ChoosingDate monthName={monthName} choosingDateIsOpen={choosingDateIsOpen}
                          choosingDateToggle={choosingDateToggle}
                          firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate}
                          setSecondDate={setSecondDate} isChoosingModalClosed={!recipientsChoosingModalData[0]}
                          showDateToggle={showRecipientsByDateToggle}/>
            }

            {windowSizeMobile && !recipientsChoosingModalData[0] &&
            <ChoosingDate monthName={monthName} choosingDateIsOpen={choosingDateIsOpen}
                          choosingDateToggle={choosingDateToggle}
                          firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate}
                          setSecondDate={setSecondDate} isChoosingModalClosed={!recipientsChoosingModalData[0]}
                          showDateToggle={showRecipientsByDateToggle}/>
            }

            <Recipients formatInCurrency={formatInCurrency} tabs={tabs} selectedSortItem={selectedSortItem}
                        windowSizeMobile={windowSizeMobile}
                        recipientsChoosingModalToggle={recipientsChoosingModalToggle}
                        addRecipientsModal={addRecipientsModal} sortItems={sortItems}
                        changeSelectedItem={changeSelectedItem}
                        recipientsChoosingModalData={recipientsChoosingModalData}
                        recipientsSortModal={recipientsSortModal} currentTarget={currentTarget}
                        monthName={monthName} firstDate={firstDate} setFirstDate={setFirstDate}
                        secondDate={secondDate} setSecondDate={setSecondDate}
                        showRecipientsByDate={showRecipientsByDate}
                        showRecipientsByDateToggle={showRecipientsByDateToggle}
                        choosingDateIsOpen={choosingDateIsOpen}
                        choosingDateToggle={choosingDateToggle} recipientsActionModal={recipientsActionModal}
                        pathname={pathname}

                        recipients={recipients}
            />

            {successMessage && <SuccessMessageModal modalText={successMessage}/>}
        </>

    )
};

const mapStateToProps = state => ({
    // rooms: roomsSelector(state),
    successMessage: successMessageSelector(state),
    windowSizeMobile: windowSizeSelector(state),
});

export default compose(
    connect(mapStateToProps, {deleteSuccessMessage}),
    withRouter,
    withFormatInCurrency
)(RecipientsContainer);
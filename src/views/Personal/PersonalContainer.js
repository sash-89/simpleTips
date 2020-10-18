import React, {useEffect, useState} from "react";
import style from "./PersonalMobile/Personal.module.css";

import Personal from "./PersonalMobile/Personal";
import {
    emailSelector,
    phoneNumberSelector,
    successMessageSelector,
    userSelector
} from "../../modules/userProfile/userProfileSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {deleteSuccessMessage, requestToUpdateUserData} from "../../modules/userProfile/userProfileActions";
import SuccessMessageModal from "../../components/SuccessMessageModal/SuccessMessageModal";
import {isFiendInFocusSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";


const PersonalContainer =({user, requestToUpdateUserData, successMessage, deleteSuccessMessage, userPhoneNumber, userEmail, isFiendInFocus})=>{

    const [inputFieldData, changeInputFieldData] = useState([
        {
            placeholder: "Name for profile",
            value:  user.nameForProfile ? user.nameForProfile : "",
            name: "nameForProfile",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeInputFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "First Name",
            value: user.firstName ? user.firstName : "",
            name: "firstName",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeInputFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "Last Name",
            value: user.lastName ? user.lastName : "",
            name: "lastName",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeInputFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        }
    ]);

    const saveProfileChanges = () =>{
        if(!!(inputFieldData.find(inputField=>!inputField.value))){
            changeInputFieldData(inputFieldData.map(inputField=>!inputField.value ? {...inputField, isError: true} : {...inputField}))
        }
        else requestToUpdateUserData(inputFieldData[0].value.trim(), inputFieldData[1].value.trim(), inputFieldData[2].value.trim(), )
    };

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
        <div className={style.personalContent}>
            {successMessage && <SuccessMessageModal modalText={successMessage}/>}

            <Personal inputFieldData={inputFieldData} saveProfileChanges={saveProfileChanges} userPhoneNumber={userPhoneNumber}
                      userEmail={userEmail} isFiendInFocus={isFiendInFocus}/>
        </div>
    )

};

const mapStateToProps = state =>({
    user: userSelector(state),
    successMessage: successMessageSelector(state),
    userPhoneNumber: phoneNumberSelector(state),
    userEmail: emailSelector(state),
    isFiendInFocus: isFiendInFocusSelector(state)
});

export default compose(connect(mapStateToProps, {requestToUpdateUserData, deleteSuccessMessage}), withRouter,)(PersonalContainer);
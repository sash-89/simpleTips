import React, {useEffect, useState} from 'react';
import RegisteredRecipient from "./RegisteredRecipientComponents/RegisteredRecipient";
import Backdrop from "../../components/Backdrop/Backdrop";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {adminOrganizationIDSelector} from "../../modules/userProfile/userProfileSelectors";
import {requestToAttachOrganizationForUser} from "../../modules/organization/organizationActions";

const RegisteredRecipientContainer = ({history}) => {
    
    const [userDataValue,  changeUserDataValue] = useState("");

    const [errorMessage,  setErrorMessage] = useState("");

    const organizationId = useSelector(state => adminOrganizationIDSelector(state));
    const dispatch = useDispatch();

    const changeUserData = (e) => {
        if (errorMessage) setErrorMessage("")

        changeUserDataValue(e.target.value);
    };

    const attachOrganizationForUser = ()=> {
        if (!userDataValue.trim()) setErrorMessage("Field is empty");

        else {
            dispatch(requestToAttachOrganizationForUser(userDataValue.trim(), organizationId));
            history.push("/recipients");
            changeUserDataValue("")
        }
    };


    return(
        <>
            <RegisteredRecipient userDataValue={userDataValue} changeUserData={changeUserData}
                                 errorMessage={errorMessage} attachOrganizationForUser={attachOrganizationForUser}/>

            <div className={'Desktop'}>
                <Backdrop choosingTransactionsIsOpen={true} onClick={() => history.push("/recipients")}/>
            </div>

        </>
    )};

export default withRouter(RegisteredRecipientContainer);

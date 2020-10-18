import React, {useEffect, useState} from "react";
import style from "./OrganisationAndAdministratorComponents/OrganisationAndAdministrator.module.css";

import OrganisationAndAdministrator from "./OrganisationAndAdministratorComponents/OrganisationAndAdministrator";
import SuccessMessageModal from "../../components/SuccessMessageModal/SuccessMessageModal";
import {
    emailSelector, adminOrganizationSelector,
    phoneNumberSelector,
    successMessageSelector,
    userSelector
} from "../../modules/userProfile/userProfileSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteSuccessMessage, requestToUpdateAdminData} from "../../modules/userProfile/userProfileActions";
import {withRouter} from "react-router-dom";
import {isFiendInFocusSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";


const OrganisationAndAdministratorContainer =({user, organization, requestToUpdateAdminData, successMessage, deleteSuccessMessage,
                                                  userPhoneNumber, userEmail, isFiendInFocus})=>{

    const [commonErrorMessage, setCommonErrorMessage] = useState("")

    const [administratorFieldData, changeAdministratorFieldData] = useState([
        {
            placeholder: "Administrators’s ID",
            value:  user.nameForProfile ? user.nameForProfile : "",
            name: "administratorsID",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeAdministratorFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "First Name",
            value: user.firstName ? user.firstName : "",
            name: "firstName",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeAdministratorFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "Last Name",
            value: user.lastName ? user.lastName : "",
            name: "lastName",
            isError: false,
            onChange: e => {
                const {name, value} = e.target;
                changeAdministratorFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        }
    ]);

    const [organisationFieldData, changeOrganisationFieldData] = useState([
        {
            placeholder: "Name of the organization",
            value: organization ? organization.organizationName : "",
            name: "nameOfTheOrganization",
            isError: false,
            onChange: e => {
                // if(commonErrorMessage)
                    setCommonErrorMessage("");

                const {name, value} = e.target;
                changeOrganisationFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "City",
            value: organization ? organization.city : "",
            name: "city",
            isError: false,
            onChange: e => {
                // if(commonErrorMessage)
                    setCommonErrorMessage("");

                const {name, value} = e.target;
                changeOrganisationFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        },
        {
            placeholder: "Address",
            value: organization ? organization.address : "",
            name: "address",
            isTextarea: true,
            isError: false,
            onChange: e => {
                // if(commonErrorMessage)
                    setCommonErrorMessage("");

                const {name, value} = e.target;
                changeOrganisationFieldData(prevState => prevState.map(data => data.name === name ? {...data, value} : {...data}));
            },
        }
    ]);

    // useEffect(()=>{
    //     if(organization && organization.address)changeAdministratorFieldData(prev=> prev)
    // }, [organization])

    const saveProfileChanges = () =>{
      const isDataMatch =  organisationFieldData[2].value === organization.address &&  organisationFieldData[1].value === organization.city && organisationFieldData[0].value === organization.organizationName
        // if(!!(administratorFieldData.find(inputField=>!inputField.value))){
        //     changeAdministratorFieldData(administratorFieldData.map(inputField=>!inputField.value ? {...inputField, isError: true} : {...inputField}))
        // }

        // else
        if(!!(organisationFieldData.find(inputField=>!inputField.value))){
            changeOrganisationFieldData(organisationFieldData.map(inputField=>!inputField.value ? {...inputField, isError: true} : {...inputField}))

        } else if(isDataMatch){
            setCommonErrorMessage("New data matches with old data")
        } else requestToUpdateAdminData(organisationFieldData[2].value, organisationFieldData[1].value, organisationFieldData[0].value)
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

    return(
      <div className={style.organisationAndAdministratorContent}>
        {successMessage && <SuccessMessageModal modalText={successMessage}/>}

        <OrganisationAndAdministrator organisationFieldData={organisationFieldData} saveProfileChanges={saveProfileChanges}
                                      userPhoneNumber={userPhoneNumber} userEmail={userEmail} isFiendInFocus={isFiendInFocus} commonErrorMessage={commonErrorMessage}/>
      </div>
  )

};


const mapStateToProps = state =>({
    user: userSelector(state),
    organization: adminOrganizationSelector(state),
    successMessage: successMessageSelector(state),
    userPhoneNumber: phoneNumberSelector(state),
    userEmail: emailSelector(state),
    isFiendInFocus: isFiendInFocusSelector(state)
});

export default compose(connect(mapStateToProps, {requestToUpdateAdminData, deleteSuccessMessage}), withRouter,)(OrganisationAndAdministratorContainer);

import React, {useEffect, useState} from 'react';
import AddEmployee from "./AddEmployeeComponents/AddEmployee";

import Backdrop from "../../components/Backdrop/Backdrop";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentRoomSelector} from "../../modules/organization/organizationSelectors";
import {requestToAttachRoomFromAdmin} from "../../modules/organization/organizationActions";
import {adminOrganizationIDSelector} from "../../modules/userProfile/userProfileSelectors";
import Redirect from "../../components/Redirect/Redirect";

const AddEmployeeContainer = ({history, location: {pathname}}) => {
    const currentRoom = useSelector(state => currentRoomSelector(state));
    // const organizationId = useSelector(state => adminOrganizationIDSelector(state));
    const dispatch = useDispatch();

    const [inputValue,  changeInputValue] = useState("");
    const [errorMessage,  setErrorMessage] = useState("");

    const [isLegendDown, toggleLegend] = useState(true);

    useEffect(() => {
        toggleLegend(inputValue === "")
    }, [inputValue]);


    const attachEmployee = () => {
        dispatch(requestToAttachRoomFromAdmin(inputValue, currentRoom))
        history.push("/rooms");
        changeInputValue("")
    };


    if((pathname === "/rooms/attach_employee" && !currentRoom) || (pathname === "/rooms/replace_employee" && !currentRoom)){
       return <Redirect to={"/rooms"}/>
    }


    return (
        <>
            <AddEmployee inputValue={inputValue} changeInputValue={changeInputValue} currentRoom={currentRoom}
                         isLegendDown={isLegendDown} attachEmployee={attachEmployee} pathname={pathname}/>

            <div className={'Desktop'}>
                <Backdrop choosingTransactionsIsOpen={true} onClick={()=>history.push("/rooms")}/>
            </div>
        </>
    )};

export default withRouter(AddEmployeeContainer);

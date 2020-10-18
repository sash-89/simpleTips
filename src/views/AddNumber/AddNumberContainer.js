import React, {useEffect, useState} from 'react';
import AddNumber from "./AddNumberComponents/AddNumber";
import Backdrop from "../../components/Backdrop/Backdrop";
import {withRouter, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {adminOrganizationIDSelector} from "../../modules/userProfile/userProfileSelectors";
import {requestToAddRoom} from "../../modules/organization/organizationActions";

const AddNumberContainer = ({history}) => {
    const [dropdownMenu, closeDropdownMenu] = useState(false);
    const [isLegendDown, toggleLegend] = useState(true);

    const [roomNumberValue,  changeRoomNumberValue] = useState("");
    const [floorNumberValue,  changeFloorNumberValue] = useState("");

    const [errorMessage,  setErrorMessage] = useState("");

    const organizationId = useSelector(state => adminOrganizationIDSelector(state));
    const dispatch = useDispatch();

    useEffect(() => {
        toggleLegend(floorNumberValue === "")
    }, [floorNumberValue]);

    const chooseNumber =(number)=>{
        if(errorMessage) setErrorMessage("")

        changeFloorNumberValue(`${number}`);
        toggleLegend(false)
    };

    const changeRoomNumber =(e)=> {
        if (e.target.validity.valid) {
            if(errorMessage) setErrorMessage("")
            changeRoomNumberValue(e.target.value);
        }
    };

    const changeFloorNumber =(e)=> {
        if (e.target.validity.valid) {
            if(errorMessage) setErrorMessage("")
            changeFloorNumberValue(e.target.value);
        }
    };

    const addRoom =()=> {
        if (!floorNumberValue.trim() || !roomNumberValue.trim()) setErrorMessage("Number or Organization is empty");
        else {
            dispatch(requestToAddRoom(floorNumberValue.trim(), roomNumberValue.trim(), organizationId))
            history.push("/rooms")
            changeRoomNumberValue("");
            changeFloorNumberValue("")
        }
    };

// if(!organizationId) return <Redirect to={"/rooms"}/>

    return(
        <>
            <AddNumber closeDropdownMenu={closeDropdownMenu} dropdownMenu={dropdownMenu} isLegendDown={isLegendDown}
                       chooseNumber={chooseNumber} floorNumberValue={floorNumberValue} changeFloorNumber={changeFloorNumber}
                       changeRoomNumber={changeRoomNumber} roomNumberValue={roomNumberValue} addRoom={addRoom} errorMessage={errorMessage}
            />

            <div className={'Desktop'}>
                <Backdrop choosingTransactionsIsOpen={true} onClick={() => history.push("/rooms")}/>
            </div>
        </>
    )
};

export default withRouter(AddNumberContainer);

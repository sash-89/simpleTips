import React, {useEffect, useState} from 'react';
import AddRangeOfNumber from "./AddRangeOfNumberComponents/AddRangeOfNumber";
import Backdrop from "../../components/Backdrop/Backdrop";
import {withRouter} from "react-router-dom";

const AddRangeOfNumbersContainer = ({history}) => {
    const [dropdownMenu, closeDropdownMenu] = useState(false);
    const [isLegendDown, toggleLegend] = useState(true);

    const [inputValue,  changeValue] = useState("");

    useEffect(()=>{
        toggleLegend(inputValue === "")
    }, [inputValue]);

    const chooseNumber =(number)=>{
        changeValue(number);
        toggleLegend(inputValue !== "")
    };

    return(
        <>
            <AddRangeOfNumber closeDropdownMenu={closeDropdownMenu} dropdownMenu={dropdownMenu} isLegendDown={isLegendDown}
                              chooseNumber={chooseNumber} changeValue={changeValue} inputValue={inputValue}
            />

            <div className={'Desktop'}>
                <Backdrop choosingTransactionsIsOpen={true} onClick={() => history.push("/rooms")}/>
            </div>
        </>
    )};

export default withRouter(AddRangeOfNumbersContainer);

import React, {useState} from 'react';
import style from "./ChoosingDate.module.css";

import closeMenu from "../../../../assets/images/balance/closeMenu.png";

import {Button} from "../../../../components/Button/Button";
import Calendar from "../../../../components/Calendar/Calendar";
import {useDispatch} from "react-redux";
import {rightPopupToggle} from "../../../../modules/windowSizeToggle/windowSizeAction";

const ChoosingDate = ({choosingDateIsOpen, choosingDateToggle, monthName, className,
                          firstDate, setFirstDate,  setSecondDate, secondDate, showDateToggle, isChoosingModalClosed}) => {

    const dispatch = useDispatch();
    const choosingDateCls = [ style.choosingDateContainer, className];


    if(choosingDateIsOpen) {
        dispatch(rightPopupToggle(true))
        choosingDateCls.push(style.choosingDateContainerOpen);
    }

    if(!choosingDateIsOpen) {
        dispatch(rightPopupToggle(false))
    }

    // if(choosingDateIsOpen) choosingDateCls.push(style.choosingDateContainerOpen);

    const closeChoosingDate=()=>{
        choosingDateToggle(false);
        showDateToggle(false);
        setFirstDate({day: null, month: null, year: null});
        setSecondDate({day: null, month: null, year: null})
    };

    const changeDateBalanceToggle =()=>{
        choosingDateToggle(false);
        showDateToggle(true)
    };

    return(

       <div className={choosingDateCls.join(" ")}>

           <div className={style.choosingDateHeader}>
               <img src={closeMenu} alt="closeMenu" onClick={closeChoosingDate}/>
               <span>Choosing a Date Period</span>
           </div>

           {firstDate.day ? <div className={style.chosenDate}>
               <span className={style.firstDate}>{`${monthName[firstDate.month]}, ${firstDate.day} ${firstDate.year}`}</span>
               {secondDate.day && <span>&nbsp;-{` ${monthName[secondDate.month]}, ${secondDate.day} ${secondDate.year}`}</span>}
           </div>
           : <div className={style.chosenDate}>&nbsp;</div>}

           <div className={style.chosenDate}>
               <Calendar firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate} setSecondDate={setSecondDate}
                         monthName={monthName} isChoosingModalClosed={isChoosingModalClosed}/>
           </div>

           {firstDate.day && <Button className={style.showResults} onClick={changeDateBalanceToggle}>Show Result</Button>}
       </div>

)};

export default ChoosingDate;
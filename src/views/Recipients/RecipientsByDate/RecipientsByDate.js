import React, {useState} from 'react';
import style from "./RecipientsByDate.module.css";

import ResetDate from "../../../assets/images/balance/reset-date.png";
import Recipients from "../WeeklyRecipientsMobile/Recipients/Recipients";
import SortSubMenu from "../../../components/SortSubMenuDT/SortSubMenu";

const RecipientsByDate = ({recipients, formatInCurrency, firstDate, setFirstDate, monthName, setSecondDate, secondDate,
                                showRecipientsByDateToggle, recipientsActionModal, recipientsChoosingModalToggle, changeSelectedItem,
                                selectedSortItem, sortItems}) => {

    const resetDate =()=>{
        setFirstDate({day: null, month: null, year: null});
        setSecondDate({day: null, month: null, year: null});
        showRecipientsByDateToggle(false)
    };

    return(
        <div className={style.recipientsByDateMBContainer}>

            <div className={style.dateWrapper}>
                <div>
                    <span>{`${monthName[firstDate.month]}, ${firstDate.day} ${firstDate.year}`} </span>
                    {secondDate.month &&
                    <span>{` - ${monthName[secondDate.month]}, ${secondDate.day} ${secondDate.year}`} </span>}
                </div>
                <img src={ResetDate} alt="ResetDate" onClick={resetDate}/>
            </div>

            <div className={style.recipientsWrapper}>

                <SortSubMenu recipientsChoosingModalToggle={recipientsChoosingModalToggle} changeSelectedItem={changeSelectedItem}
                             selectedSortItem={selectedSortItem} sortItems={sortItems}/>

                <Recipients recipients={recipients} formatInCurrency={formatInCurrency}
                            recipientsActionModal={recipientsActionModal}/>
            </div>


        </div>

    )};

export default RecipientsByDate;
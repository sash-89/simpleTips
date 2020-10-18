import React from 'react';
import style from "./WeeklyRecipients.module.css";

import resetDataIcon from "../../../assets/images/balance/reset-date.png";
import Recipients from "./Recipients/Recipients";
import SortSubMenu from "../../../components/SortSubMenuDT/SortSubMenu";

const WeeklyRecipients = ({recipients, formatInCurrency, recipientsActionModal, sortItems, selectedSortItem, changeSelectedItem, recipientsChoosingModalToggle, recipientsChoosingModalData}) => {

    return(
        <div className={style.weeklyRecipientsMBContainer}>
            {selectedSortItem && selectedSortItem !== "Alphabetically"
            && <div className={style.sortByTypeWrapper}>
                <div>
                    <span>{`${selectedSortItem}`}</span>
                </div>
                <img src={resetDataIcon} alt="resetData" onClick={()=>{changeSelectedItem("Alphabetically")}}/>
            </div>}

            <SortSubMenu recipientsChoosingModalToggle={recipientsChoosingModalToggle} changeSelectedItem={changeSelectedItem}
                         selectedSortItem={selectedSortItem} sortItems={sortItems}/>

            <Recipients recipients={recipients} formatInCurrency={formatInCurrency} recipientsActionModal={recipientsActionModal} recipientsChoosingModalData={recipientsChoosingModalData}/>

        </div>
    )};

export default WeeklyRecipients;
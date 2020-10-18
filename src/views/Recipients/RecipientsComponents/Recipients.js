import React, {useRef} from 'react';
import style from "./Recipients.module.css";

import sortModal from "../../../assets/images/balance/menu.png";
import dateMenuIcon from "../../../assets/images/balance/dateMenu.png";
import Tabs from "../../../components/Tabs/Tabs";
import RecipientsByDate from "../RecipientsByDate/RecipientsByDate";
import whiteCrossIcon from "../../../assets/images/rooms/white-cross.png";
import {isIOS} from "../../../utils/validators";

const Recipients = ({recipients, formatInCurrency, tabs, recipientsChoosingModalToggle, recipientsSortModal,
                          selectedSortItem, addRecipientsModal, firstDate, setFirstDate, secondDate, setSecondDate, monthName,
                          showRecipientsByDateToggle, choosingDateToggle, showRecipientsByDate, recipientsActionModal,
                          changeSelectedItem, sortItems, choosingDateIsOpen, pathname , windowSizeMobile}) => {

    const addRecipientsRef = useRef(null)

    const disableScrollIfIPad = (isIOS && !windowSizeMobile && (pathname !== "/recipients" || choosingDateIsOpen));

    return(
        <>
            <div className={style.recipientsContainer} style={disableScrollIfIPad ? {overflow: "hidden"} : null}>
                <div className={style.hrLine}/>

                <div className={style.recipientsHeader}>
                    <span className={style.Recipients}>
                        Recipients
                    </span>

                    <span className={style.menuWrapper}>
                        <img src={sortModal} alt="sortModal" onClick={() => recipientsSortModal()}/>
                        <img src={dateMenuIcon} alt="dateMenu" onClick={() => choosingDateToggle(true)}/>
                    </span>
                </div>

                {showRecipientsByDate
                    ? <RecipientsByDate recipients={recipients} formatInCurrency={formatInCurrency}
                                        firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate}
                                        setSecondDate={setSecondDate} recipientsActionModal={recipientsActionModal}
                                        showRecipientsByDateToggle={showRecipientsByDateToggle}
                                        monthName={monthName} recipientsChoosingModalToggle={recipientsChoosingModalToggle}
                                        changeSelectedItem={changeSelectedItem} selectedSortItem={selectedSortItem} sortItems={sortItems}/>

                    : <Tabs tabs={tabs} tabsContainerCls={style.tabsContainerCls} tabsHeaderCls={style.tabsHeaderCls}
                            underlineCls={style.underlineCls} tabsContentCls={style.tabsContentCls}
                            tabTittleActiveCls={style.tabTittleActive} tabTittleCls={style.tabTittle}/>
                }

                <div className={style.subMenuWrapper}>
                    <div className={style.filterByDate} onClick={() => choosingDateToggle(true)}>
                        <img src={dateMenuIcon} alt="dateMenu"/>

                        <span>
                            Filter by date
                        </span>
                    </div>

                    <div ref={addRecipientsRef} className={style.ellipseWrapper} onClick={()=>addRecipientsModal(addRecipientsRef)}>
                        <div className={style.ellipse}>
                            <img src={whiteCrossIcon} alt="CrossIcon"/>
                        </div>
                        <span className={style.addRecipients}>Add Recipients</span>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Recipients;
import React, {useState} from 'react';
import style from "./DataBalanceMB.module.css";

import closeMenu from "../../../assets/images/balance/closeMenu.png";
import Menu from "../../../assets/images/balance/menu.png";
import dateMenuIcon from "../../../assets/images/balance/dateMenu.png";

import ChoosingDate from "./ChoosingDate/ChoosingDate";
import ChoosingTransactions from "./ChoosingTransactions/ChoosingTransactions";
import Tabs from "../../../components/Tabs/Tabs";
import BalanceByDate from "../BalanceByDate/BalanceByDate";

const DateBalanceMB = ({formatInCurrency, isUp, isUpToggle, tabs, choosingDateIsOpen, choosingDateToggle, monthName, transactions,
                           firstDate, setFirstDate,  setSecondDate, secondDate, showDateBalance, showDateBalanceToggle,
                           activeTransaction, changeActiveTransactions, choosingTransactionsIsOpen, choosingTransactionsToggle}) => {



    const choosingTransactions=(activeTransaction)=>{
        choosingTransactionsToggle(false);
        changeActiveTransactions(activeTransaction)
    };

    const dateMenuCls = [ style.dateMenuWrapper ];

    if(isUp === true) dateMenuCls.push( style.dateMenuWrapperOpen);
    else if(isUp===false) dateMenuCls.push(style.dateMenuWrapperClose);

    return(
    <div className={dateMenuCls.join(" ")}>

        <div className={style.dateMenuHeader}>
            <span>
                <img src={closeMenu} alt="closeMenu" onClick={isUpToggle}/> Balance
            </span>

            <span>
                <img src={Menu} alt="Menu" onClick={() => choosingTransactionsToggle(true)}/>
                <img src={dateMenuIcon} alt="dateMenu" onClick={() => choosingDateToggle(true)}/>
            </span>
        </div>

        <div className={style.choosingBalanceInfo}>
            {showDateBalance
            ? <BalanceByDate formatInCurrency={formatInCurrency}
                           firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate} setSecondDate={setSecondDate}
                           showDateBalance={showDateBalance} showDateBalanceToggle={showDateBalanceToggle} monthName={monthName}/>
            : <Tabs tabs={tabs} tabsContainerCls={style.tabsContainerCls}
                    tabsHeaderCls={style.tabsHeaderCls} underlineCls={style.underlineCls}/> }
        </div>

       <ChoosingDate formatInCurrency={formatInCurrency} choosingDateIsOpen={choosingDateIsOpen} choosingDateToggle={choosingDateToggle}
                     firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate} setSecondDate={setSecondDate}
                     showDateToggle={showDateBalanceToggle} monthName={monthName} isChoosingModalClosed={!choosingTransactionsIsOpen}/>

       <ChoosingTransactions transactions={transactions} choosingTransactionsIsOpen={choosingTransactionsIsOpen} choosingTransactionsToggle={choosingTransactionsToggle}
                             activeTransaction={activeTransaction} choosingTransactions={choosingTransactions}/>

    </div>
)};

export default DateBalanceMB;
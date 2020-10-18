import React, {useState} from 'react';
import style from "./Balance.module.css";

import ArrowRed from "../../../assets/images/balance/arrow-right-red.png"
import whiteArrowDown from "../../../assets/images/balance/white-arrow-down.png"

import VirtualCard from "../../../components/VirtualCard/VirtualCard";
import AllBalanceData from "../../../components/AllBalanceData/AllBalanceData";
import Gpay from "../../../assets/images/GPay-Normal.png";
import App from "../../../assets/images/AppleWallet-Normal.png";
import {Button} from "../../../components/Button/Button";
import Tabs from "../../../components/Tabs/Tabs";
import dateMenuIcon from "../../../assets/images/balance/dateMenu.png";
import ChoosingDate from "../../DateBalance/DateBalanceMobile/ChoosingDate/ChoosingDate";
import Backdrop from "../../../components/Backdrop/Backdrop";
import BalanceByDate from "../../DateBalance/BalanceByDate/BalanceByDate";
import {isIOS} from "../../../utils/validators";


const BalanceDT = ({formatInCurrency, isUpToggle, tabs, choosingDateIsOpen, choosingDateToggle, monthName,choosingTransactionsIsOpen, windowSizeMobile,
                       firstDate, setFirstDate,  setSecondDate, secondDate, showDateBalance, showDateBalanceToggle, transactions, activeTransaction, changeActiveTransactions}) => {

    const disableScrollIfIPad = (isIOS && !windowSizeMobile &&  choosingDateIsOpen);

    return (
        <div className={style.balanceContainer} style={disableScrollIfIPad ? {overflow: "hidden"} : null}>

            <div className={style.filterByDate} onClick={()=>choosingDateToggle(true)}>
                <img src={dateMenuIcon} alt="dateMenu"/>
               <span>
                   Filter by date
               </span>
            </div>

            <div className={style.virtualCardWrapper}>
                <VirtualCard/>

                <div className={style.notIdentified}>
                    <span>Not identified</span>
                    <img src={ArrowRed} alt="ArrowRed" className={style.ArrowRed}/>
                </div>

                <div className={style.weeklyBalanceContainer}>
                        <>
                        <h6 className={style.title}>Weekly balance</h6>
                        <AllBalanceData tippedData={formatInCurrency("2450")} commissionsData={formatInCurrency(320)}
                                        cardPaymentsData={formatInCurrency("6450")} availableForPaymentData={formatInCurrency(870)} />
                        </>
                </div>

                <div className={style.paymentButton}>
                    <img src={Gpay} alt={Gpay}/>
                    <img src={App} alt={App}/>
                </div>

                <div className={style.btnWrapper}>
                    <Button className={style.btn}>
                        <img src={whiteArrowDown} alt="whiteArrowDown"/>
                        <span>
                            Withdrawal
                        </span>
                    </Button>
                </div>

            </div>


            <div className={style.eventsContainer}>
                <h5 className={style.titleEvents}>
                    Events
                </h5>

                {showDateBalance
                    ? <BalanceByDate formatInCurrency={formatInCurrency}
                                     firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate}
                                     setSecondDate={setSecondDate}
                                     showDateBalance={showDateBalance} showDateBalanceToggle={showDateBalanceToggle}
                                     monthName={monthName} transactions={transactions} activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}/>

                    : <Tabs tabs={tabs} tabsHeaderCls={style.tabsHeaderCls} underlineCls={style.underlineCls}
                            tabTittleActiveCls={style.tabTittleActive} tabTittleCls={style.tabTittle}/>
                }
            </div>

        </div>

    )
};

export default BalanceDT;
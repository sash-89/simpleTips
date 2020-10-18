import React, {useEffect, useState} from 'react';
import BalanceMB from "./BalanceComponents/BalanceMB";
import {withFormatInCurrency} from "../../HOC/withFormatInCurrency";
import BalanceDT from "./BalanceComponents/BalanceDT";
import WeekBalance from "../DateBalance/WeekBalance/WeekBalance";
import allTransactionsMobile from "../../assets/images/balance/allTransactionsMobile.png";
import allTransactions from "../../assets/images/balance/allTransactions.png";
import allTransactionsActive from "../../assets/images/balance/allTransactionsActive.png";
import checkMobile from "../../assets/images/balance/check.png";
import income from "../../assets/images/balance/income.png";
import incomeMobile from "../../assets/images/balance/incomeMobile.png";
import outcome from "../../assets/images/balance/outcome.png";
import outcomeMobile from "../../assets/images/balance/outcomeMobile.png";
import DateBalanceMB from "../DateBalance/DateBalanceMobile/DataBalanceMB";
import {connect} from "react-redux";
import {compose} from "redux";
import {requestUserCardData} from "../../modules/userBalance/userBalanceActions";
import ChoosingDate from "../DateBalance/DateBalanceMobile/ChoosingDate/ChoosingDate";
import style from "./BalanceComponents/Balance.module.css";
import Backdrop from "../../components/Backdrop/Backdrop";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";

const transactions = [
    {
        title: "All Transactions",
        icon: allTransactions,
        iconActive: allTransactionsActive,
        iconMobile: allTransactionsMobile,
        checked: checkMobile
    },
    {
        title: "Income",
        icon: income,
        iconActive: incomeMobile,
        iconMobile: incomeMobile,
        checked: checkMobile
    },
    {
        title: "Outcome",
        icon: outcome,
        iconActive: outcomeMobile,
        iconMobile: outcomeMobile,
        checked: checkMobile
    },
];

const BalanceContainer = ({formatInCurrency,isUp, isUpToggle, requestUserCardData, windowSizeMobile}) => {
    const [firstDate, setFirstDate] = useState({day: null, month: null, year: null});
    const [secondDate, setSecondDate] = useState({day: null, month: null, year: null});
    const [showDateBalance, showDateBalanceToggle] = useState(false);

    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [choosingDateIsOpen, choosingDateToggle]= useState(false);

    const [activeTransaction, changeActiveTransactions] = useState("All Transactions");

    const [choosingTransactionsIsOpen, choosingTransactionsToggle]= useState(false);

    useEffect(()=>{
       requestUserCardData()
    }, []);

    const tabs = [
        {
            tittle: "Week",
            component: <WeekBalance formatInCurrency={formatInCurrency} isUpToggle={isUpToggle} transactions={transactions} activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}/>,
        },
        {
            tittle: "Month",
            component: <WeekBalance formatInCurrency={formatInCurrency} isUpToggle={isUpToggle} transactions={transactions} activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}/>,
        },
        {
            tittle: "Year",
            component: <WeekBalance formatInCurrency={formatInCurrency} isUpToggle={isUpToggle} transactions={transactions} activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}/>,
        }
    ];


    return(
    <>
        <div className={'Mobile'}>
            <DateBalanceMB formatInCurrency={formatInCurrency} isUpToggle={isUpToggle} isUp={isUp} tabs={tabs} firstDate={firstDate} setFirstDate={setFirstDate}
                           secondDate={secondDate} setSecondDate={setSecondDate} showDateBalance={showDateBalance}
                           showDateBalanceToggle={showDateBalanceToggle} monthName={monthName} transactions={transactions}
                           choosingDateIsOpen={choosingDateIsOpen} choosingDateToggle={choosingDateToggle}
                           activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}
                           choosingTransactionsIsOpen={choosingTransactionsIsOpen} choosingTransactionsToggle={choosingTransactionsToggle}/>

            <BalanceMB formatInCurrency={formatInCurrency} isUpToggle={isUpToggle}/>
        </div>

        <div className={'Desktop'}>
            <BalanceDT formatInCurrency={formatInCurrency} isUpToggle={isUpToggle} tabs={tabs} firstDate={firstDate} setFirstDate={setFirstDate}
                       secondDate={secondDate} setSecondDate={setSecondDate} showDateBalance={showDateBalance}
                       showDateBalanceToggle={showDateBalanceToggle} monthName={monthName} windowSizeMobile={windowSizeMobile}
                       choosingDateIsOpen={choosingDateIsOpen} choosingDateToggle={choosingDateToggle}
                       transactions={transactions} activeTransaction={activeTransaction} changeActiveTransactions={changeActiveTransactions}
                       choosingTransactionsIsOpen={choosingTransactionsIsOpen}/>

           <ChoosingDate formatInCurrency={formatInCurrency} choosingDateIsOpen={choosingDateIsOpen} choosingDateToggle={choosingDateToggle}
                      firstDate={firstDate} setFirstDate={setFirstDate} secondDate={secondDate} setSecondDate={setSecondDate}
                      showDateToggle={showDateBalanceToggle} monthName={monthName} className={style.choosingDateCls} isChoosingModalClosed={!choosingTransactionsIsOpen}/>

           <Backdrop choosingTransactionsIsOpen={choosingDateIsOpen} onClick={()=>choosingDateToggle(false)}/>

        </div>
    </>
)};


const mapStateToProps = state =>({
    // cardData: cardDataSelector(state)
    windowSizeMobile: windowSizeSelector(state),
});


export default compose(connect(mapStateToProps, {
    requestUserCardData
}), withFormatInCurrency)(BalanceContainer)


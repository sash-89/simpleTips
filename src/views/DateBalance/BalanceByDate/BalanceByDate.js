import React from 'react';
import style from "./BalanceByDate.module.css";
import AllBalanceData from "../../../components/AllBalanceData/AllBalanceData";
import Clock from "../../../assets/images/balance/clock.png";
import ResetDate from "../../../assets/images/balance/reset-date.png";

const BalanceByDate = ({formatInCurrency, firstDate, setFirstDate, monthName, setSecondDate, secondDate, showDateBalance, showDateBalanceToggle,
                           transactions, activeTransaction, changeActiveTransactions}) => {


    const resetDate =()=>{
        setFirstDate({day: null, month: null, year: null});
        setSecondDate({day: null, month: null, year: null});
        showDateBalanceToggle(false)
    }

    return(
        <div className={style.balanceByDateContainer}>

            <div className={style.dateWrapper}>
                <div>
                    <span>{`${monthName[firstDate.month]}, ${firstDate.day} ${firstDate.year}`} </span>
                    {secondDate.month && <span>{` - ${monthName[secondDate.month] }, ${secondDate.day} ${secondDate.year}`} </span>}
                </div>
                <img src={ResetDate} alt="ResetDate" onClick={resetDate}/>
            </div>

            <div className={style.balanceWrapper}>

                <div className={style.balanceByDateWrapper}>
                    <AllBalanceData tippedData={formatInCurrency("2450")} commissionsData={formatInCurrency(320)}
                                    cardPaymentsData={formatInCurrency("6450")}
                                    availableForPaymentData={formatInCurrency(870)}/>
                </div>

                <div className={style.transactionsWrapper}>
                    {transactions && transactions.map(transaction => {
                        return (
                            <div className={activeTransaction === transaction.title ? style.activeTransactions : style.transactions}
                                onClick={() => changeActiveTransactions(transaction.title)} key={transaction.title}>
                               <span className={style.transactionTitle}>
                                   <img src={activeTransaction === transaction.title ? transaction.iconActive : transaction.icon}
                                       alt={transaction.title}/>
                                   {transaction.title}
                               </span>
                            </div>
                        )
                    })
                    }
                </div>

                <div>
                    <div className={style.date}>
                        Today
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>
                          <img src={Clock} alt="Clock" className={style.clock}/>
                          + {formatInCurrency(125)}</span>
                    </div>

                    <div className={style.serviceCommission}>
                        <span>Service commission</span>
                        <span>- {formatInCurrency(2.05)}</span>
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>+ {formatInCurrency(240)}</span>
                    </div>
                </div>

                <div>
                    <div className={style.date}>
                        Yesterday
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>
                          <img src={Clock} alt="Clock" className={style.clock}/>
                          + {formatInCurrency(125)}</span>
                    </div>

                    <div className={style.serviceCommission}>
                        <span>Service commission</span>
                        <span>- {formatInCurrency(2.05)}</span>
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>+ {formatInCurrency(240)}</span>
                    </div>
                </div>

                <div>
                    <div className={style.date}>
                        10, April
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>
                          <img src={Clock} alt="Clock" className={style.clock}/>
                          + {formatInCurrency(125)}</span>
                    </div>

                    <div className={style.serviceCommission}>
                        <span>Service commission</span>
                        <span>- {formatInCurrency(2.05)}</span>
                    </div>

                    <div className={style.tips}>
                        <span>Tips</span>
                        <span className={style.tipsBalance}>+ {formatInCurrency(240)}</span>
                    </div>
                </div>

            </div>

        </div>

)};

export default BalanceByDate;
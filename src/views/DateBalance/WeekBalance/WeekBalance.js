import React, {useState} from 'react';
import style from "./WeekBalance.module.css";
import BalancePeriod from "../../../components/BalancePeriod/BalancePeriod";
import ArrowVioletUp from "../../../assets/images/balance/arrow-up-violet.png";
import AllBalanceData from "../../../components/AllBalanceData/AllBalanceData";
import Clock from "../../../assets/images/balance/clock.png";


const WeekBalance = ({formatInCurrency, isUpToggle, transactions, activeTransaction, changeActiveTransactions}) => {
let toggle = false
    return(
        <div className={style.weekBalanceContainer}>

            <div className={style.transactionsWrapper}>
                {transactions.map(transaction => {
                    return (
                        <div className={activeTransaction === transaction.title ? style.activeTransactions : style.transactions} onClick={() => changeActiveTransactions(transaction.title)} key={transaction.title}>
                           <span className={style.transactionTitle}>
                               <img src={activeTransaction === transaction.title ? transaction.iconActive : transaction.icon} alt={transaction.title}/>
                               {transaction.title}
                           </span>
                        </div>
                    )
                })
                }
            </div>

            {toggle
                ? <div className={style.noTransactions}>
                    You have no transactions yet...
                </div>
                : <>
                    <div className={style.weekBalanceDataWrapper}>
                        <BalancePeriod onClick={isUpToggle} balance={formatInCurrency(2450)}
                                       balancePeriod={"Weekly balance"} arrowIcon={ArrowVioletUp}/>

                        <AllBalanceData tippedData={formatInCurrency("2450")} commissionsData={formatInCurrency(320)}
                                        cardPaymentsData={formatInCurrency("6450")}
                                        availableForPaymentData={formatInCurrency(870)}/>
                    </div>
                    <div className={style.weekBalanceWrapper}>
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
                </>
            }

        </div>

)};

export default WeekBalance;
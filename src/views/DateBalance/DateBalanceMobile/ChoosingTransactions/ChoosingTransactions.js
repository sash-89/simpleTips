import React, {useState} from 'react';
import style from "./ChoosingTransactions.module.css";

import Backdrop from "../../../../components/Backdrop/Backdrop";


const ChoosingTransactions = ({ choosingTransactionsIsOpen, choosingTransactionsToggle, transactions, activeTransaction, choosingTransactions}) => {
    const choosingTransactionsCls = [ style.choosingTransactionsContainer ];

    if(choosingTransactionsIsOpen) choosingTransactionsCls.push( style.choosingTransactionsContainerOpen);
    if(choosingTransactionsIsOpen === false) choosingTransactionsCls.push(style.choosingTransactionsContainerClose);

    return(
        <div className={style.choosingTransactionsWrap}>
            <Backdrop onClick={()=>choosingTransactionsToggle(false)} choosingTransactionsIsOpen={choosingTransactionsIsOpen}/>

            <div className={choosingTransactionsCls.join(" ")}>
                {transactions.map(transaction => {
                    return (
                        <div className={style.transactions} onClick={() => choosingTransactions(transaction.title)} key={transaction.title}>
                           <span className={style.transactionTitle}>
                               <img src={transaction.icon} alt={transaction.title}/>
                               {transaction.title}
                           </span>
                            {activeTransaction === transaction.title &&
                            <img src={transaction.checked} alt={transaction.title}/>}
                        </div>
                    )
                })
                }
            </div>
        </div>


)};

export default ChoosingTransactions;
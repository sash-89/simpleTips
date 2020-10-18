import React, {useState} from 'react';
import style from "./AllBalanceData.module.css";

const AllBalanceData = ({tippedData, commissionsData, cardPaymentsData, availableForPaymentData}) => {

    const AllBalanceData = [
        {
            balance : tippedData,
            title: "Tipped"
        },
        {
            balance : commissionsData,
            title: "Commissions"
        },
        {
            balance : cardPaymentsData,
            title: "Card Payments"
        },
        {
            balance : availableForPaymentData,
            title: "Available for payment"
        },
    ];

    return(
        <div className={style.allBalanceDataWrapper}>
            {AllBalanceData.map(balanceData => {
                return (
                    <div className={style.balanceData} key={balanceData.title}>
                        <h6 className={style.balance}>{balanceData.balance}</h6>
                        <div className={style.title}>{balanceData.title}</div>
                    </div>
                )
            })}
        </div>
)};

export default AllBalanceData;
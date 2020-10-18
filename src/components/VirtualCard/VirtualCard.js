import React from 'react';
import style from './VirtualCard.module.css';
import {useSelector} from "react-redux";
import {cardDataSelector} from "../../modules/userBalance/userBalanceSelectors";

const VirtualCard = () => {
    const cardData = useSelector(state => cardDataSelector(state));

    return(
        <div className={style.VCContainer}>
            <div className={style.VCWrapper}>
                {cardData && <>
                    <div className={style.yourBalance}>&nbsp;</div> {/*Your balance*/}
                    {/*<div className={style.balance}>cardBalance $870</div> */}
                    <div className={style.cardNumb}>•••• •••• •••• {cardData.last4}</div>
                    <div className={style.cardDate}>{cardData.exp_month} / {cardData.exp_year}</div>
                </>}
            </div>
        </div>
)};

export default VirtualCard;
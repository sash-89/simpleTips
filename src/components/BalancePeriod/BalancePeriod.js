import React from 'react';
import style from "./BalancePeriod.module.css"

const BalancePeriod = ({balance, onClick, arrowIcon, balancePeriod}) => {

    return (

        <div className={style.weeklyBalanceWrapper} onClick={onClick}>

            <span className={style.weeklyBalance}>{balancePeriod}</span>

            <span className={style.totalBalance}

            >{balance}
                <img src={arrowIcon} alt="Arrow" className={style.ArrowViolet}/>
            </span>

        </div>

    )
};

export default BalancePeriod;
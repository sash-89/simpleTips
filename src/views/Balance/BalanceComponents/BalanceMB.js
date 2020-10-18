import React, {useState} from 'react';
import style from "./Balance.module.css";

import ArrowRed from "../../../assets/images/balance/arrow-right-red.png"
import ArrowViolet from "../../../assets/images/balance/arrow-down-violet.png"
import Clock from "../../../assets/images/balance/clock.png"

import VirtualCard from "../../../components/VirtualCard/VirtualCard";
import BalancePeriod from "../../../components/BalancePeriod/BalancePeriod";

const BalanceMB = ({formatInCurrency, isUpToggle}) => {
    const toggle = true;


    return (

        <div className={style.balanceContainer}>
            <div className={style.virtualCardWrapper}>
                <VirtualCard/>

                <div className={style.notIdentified}>
                    <span>Not identified</span>
                    <img src={ArrowRed} alt="ArrowRed" className={style.ArrowRed}/>
                </div>
            </div>

            <div className={style.weeklyBalanceContainer}>

                {toggle ?
                    <>
                        <BalancePeriod onClick={isUpToggle} balance={formatInCurrency(2450)}
                                       balancePeriod={"Weekly balance"} arrowIcon={ArrowViolet}
                        />

                        <div className={style.today}>
                            Today
                        </div>

                        <div className={style.tips}>
                            <span>Tips</span>
                            <span className={style.tipsBalance}>
                          <img src={Clock} alt="Clock" className={style.clock}/>
                          + {formatInCurrency(25)}</span>
                        </div>

                        <div className={style.serviceCommission}>
                            <span>Service commission</span>
                            <span>- {formatInCurrency(2.05)}</span>
                        </div>

                        <div className={style.tips}>
                            <span>Tips</span>
                            <span className={style.tipsBalance}>+ {formatInCurrency(560)}</span>
                        </div>
                    </>
                    : <div className={style.noTransactions}>
                        You have no transactions yet...
                    </div>
                }
            </div>

        </div>

    )
};

export default BalanceMB;
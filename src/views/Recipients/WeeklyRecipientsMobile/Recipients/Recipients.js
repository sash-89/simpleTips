import React, {useEffect, useRef, useState} from 'react';
import style from "./Recipients.module.css";

import menuIcon from "../../../../assets/images/rooms/menuIcon.png";
import greenStar from "../../../../assets/images/rooms/greenStar.png";
import redStar from "../../../../assets/images/rooms/redStar.png";
import {useSelector} from "react-redux";
import {windowSizeSelector} from "../../../../modules/windowSizeToggle/windowSizeSelectors";

const Recipients = ({recipients, formatInCurrency, recipientsActionModal, recipientsChoosingModalData}) => {

    const windowSizeMobile = useSelector(state => windowSizeSelector(state));

    const menuRef = useRef(null);

    const [isRef, setRef] = useState(null);
    const [currentData, setCurrentData] = useState({});

    const menuClickHandler = (recipientName)=>{
        setRef(recipientName);
        setCurrentData({recipientName, ref: menuRef});

        setTimeout(()=>recipientsActionModal(recipientName, menuRef), 0)
    };

    useEffect(()=>{
        isRef && recipientsChoosingModalData[0] && recipientsActionModal(currentData.recipientName, currentData.ref)
    }, [windowSizeMobile]);

    return(
            <div className={style.recipientsWrapper}>
                <div className={style.titles}>
                    <div>Name</div>
                    <div>Recipients’s code</div>
                    <div>Rating</div>
                    <div>Tips</div>
                </div>

                {recipients.map(recipient => {
                    return (
                        <div key={recipient.recipientName}
                             style={!recipient.waitingForConfirmation ? {background: "#FFFFFF"} : {background: "#FAF9FF"}}
                             className={style.recipientWrapper}>

                            <div className={style.recipientNameWrapper}>
                                <span style={recipient.waitingForConfirmation ? {color: "#6F6C86"} : null}>{recipient.recipientName}</span>
                            </div>

                            <div style={recipient.waitingForConfirmation ? {color: "#6F6C86"} : null}
                                 className={style.code}>
                                {recipient.code}
                            </div>
                            {recipient.waitingForConfirmation
                            ? <>
                                    <div className={style.empty}/>

                                    <div className={style.waitingForConfirmation}>
                                        Waiting for confirmation
                                    </div>
                                </>
                            : <>
                                    <div className={style.starWrapper}>
                                        <img src={+recipient.star >= 4 ? greenStar : redStar} alt="star"/>
                                        <span className={+recipient.star >= 4 ? style.greenStar : style.redStar}>
                                        {recipient.star}
                                    </span>
                                    </div>

                                    <div className={style.tips}>
                                        <span>
                                            Tips:
                                        </span>
                                        <span className={style.currency}> {formatInCurrency(recipient.tips)}</span>
                                    </div>
                                </>
                            }

                            <img ref={recipient.recipientName === isRef ? menuRef : null}
                                 src={menuIcon} className={style.menuImg} alt="menu"
                                 onClick={() => menuClickHandler(recipient.recipientName)}
                            />
                        </div>
                    )
                })}
            </div>

    )};

export default Recipients;
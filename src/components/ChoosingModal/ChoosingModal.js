import React from 'react';
import style from "./ChoosingModal.module.css";
import check from "../../assets/images/balance/check.png";

import Backdrop from "../../components/Backdrop/Backdrop";
import {useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";

const ChoosingModal = ({isGrey, className, choosingModalData, choosingModalToggle, selectedItem, currentTarget, rightSide, modalHeight}) => {
    const windowSizeMobile = useSelector(state => windowSizeSelector(state));
    const choosingModalCls = [ style.choosingModalContainer, className ];

    if(choosingModalData[0]) choosingModalCls.push( style.choosingModalContainerOpen);
    if(choosingModalData[0] === false) choosingModalCls.push(style.choosingModalContainerClose);

    const maxHeight = currentTarget && window.innerHeight - (modalHeight ? modalHeight - 5 : 115) < currentTarget.bottom;

    return(
        <>
            <Backdrop isGrey={isGrey} onClick={()=> choosingModalToggle([false, choosingModalData[1]])} choosingTransactionsIsOpen={choosingModalData[0]}/>

            <div className={choosingModalCls.join(" ")}
                 style={(!windowSizeMobile && currentTarget && rightSide && maxHeight) ? {top: currentTarget.top - (modalHeight ? modalHeight + 8 : 120), left: currentTarget.right - 280}
                    :(!windowSizeMobile && currentTarget && rightSide && !maxHeight) ? {top: currentTarget.bottom + 8, left: currentTarget.right - 280}
                    :(!windowSizeMobile && currentTarget && maxHeight) ? {top: currentTarget.top - 120, left: currentTarget.left}
                    : (!windowSizeMobile && currentTarget && !maxHeight) ? {top: currentTarget.bottom + 8, left: currentTarget.left}
                    : null}>

                {choosingModalData[1] && choosingModalData[1].map(item => {
                    return (
                        <div className={[style.items, item.style].join(" ")} onClick={() => item.icon && item.onClick(item.title)} key={item.title}>
                           <span className={style.itemTitle}>
                              {item.icon &&  <img src={item.icon} alt={item.title}/>}
                               {item.title}
                           </span>
                            {selectedItem && selectedItem === item.title &&
                            <img src={check} alt={item.title}/>}
                        </div>
                    )
                })
                }
            </div>
        </>


)};

export default ChoosingModal;
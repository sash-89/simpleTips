import React from 'react';
import style from "./CurrentReviews.module.css";
import HeaderSecondMB from "../../../Header/HeaderMobile/HeaderSecondMB";
import Backdrop from "../../../../components/Backdrop/Backdrop";

import greenStar from "../../../../assets/images/rooms/greenStar.png";
import redStar from "../../../../assets/images/rooms/redStar.png";
import closeIcon from "../../../../assets/images/reviews/clear-value.png";



const CurrentReviews = ({currentReviews, isUpToggle, isUp})=>{
    const currentReviewsCls = [ style.currentReviewsWrapper ];

    if(isUp) currentReviewsCls.push( style.currentReviewsWrapperOpen);
    else if(!isUp) currentReviewsCls.push(style.currentReviewsWrapperClose);


    return(
        <div className={currentReviewsCls.join(" ")}>
            <div className={'Mobile'}>
                <HeaderSecondMB isCloseIcon={true} title={"Reviews"} onClick={isUpToggle}/>
            </div>

            <div className={'Desktop'}>
                <Backdrop styles={{zIndex: 20, background: "transparent"}} choosingTransactionsIsOpen={isUp} onClick={isUpToggle}/>
            </div>

            {currentReviews && <div className={style.review} key={currentReviews.recipientName}>
                <img src={closeIcon} alt="closeIcon" className={style.closeIcon} onClick={isUpToggle}/>

                <div className={style.reviewNameWrapper}>
                    <h6>
                        {currentReviews.recipientName}
                    </h6>

                    <div>
                        {currentReviews.date}
                    </div>
                </div>

                <div className={style.code}>
                    {currentReviews.code}
                </div>

                <div className={style.starWrapper}>
                    <img src={+currentReviews.star >= 4 ? greenStar : redStar} alt="star"/>

                    <span className={+currentReviews.star >= 4 ? style.greenStar : style.redStar}>
                                        {currentReviews.star}
                                </span>
                </div>

                <div className={style.hrLine}/>

                <div className={style.reviewText}>
                    {currentReviews.reviews}
                </div>
            </div>}
        </div>
    )};

export default CurrentReviews;

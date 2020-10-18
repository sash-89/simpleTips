import React, {useEffect, useRef, useState} from 'react';
import style from "./Reviews.module.css";

import searchIcon from "../../../assets/images/reviews/search.png";
import {Button} from "../../../components/Button/Button";
import greenStar from "../../../assets/images/rooms/greenStar.png";
import redStar from "../../../assets/images/rooms/redStar.png";
import resetDataIcon from "../../../assets/images/balance/reset-date.png";
import ReviewsSearch from "./ReviewsSearch/ReviewsSearch";

const Reviews = ({reviews, getCurrentReviews, reviewsSearchToggle, currentRecipients, setCurrentRecipients, windowSizeMobile,
                     reviewsSearchIsOpen, searchValue, changeSearchValue, searchRecipients, selectRecipients}) => {

   const ref = useRef(null)

    // useEffect(()=>{
    //     ref.current.addEventListener('DOMMouseScroll', e=> e.preventDefault(), false)
    //     ref.current.addEventListener('mousewheel', e=> e.preventDefault(), false)
    //     ref.current.addEventListener('wheel', e=> e.preventDefault(), false)
    //     ref.current.addEventListener('touchmove', e=> e.preventDefault(), false)
    // },[]);

    const reviewsContainerCls = [style.reviewsContainer];

    if(searchValue) {
        if(ref.current.scrollTop > 100) ref.current.scrollTo(0, 70);

        if(searchValue.trim()) reviewsContainerCls.push(style.reviewsContainerScrollingDisabled)
    }

    return(
        <div ref={ref} className={reviewsContainerCls.join(" ")} >

            <div className={style.reviewsHeader}>
                <span className={style.reviewsTitle}>
                     Reviews
                </span>

                <div className={"Desktop"}>
                    <div>
                        <ReviewsSearch reviewsSearchIsOpen={reviewsSearchIsOpen} reviewsSearchToggle={reviewsSearchToggle}
                                       searchValue={searchValue} changeSearchValue={changeSearchValue}
                                       windowSizeMobile={windowSizeMobile}
                                       searchRecipients={searchRecipients} selectRecipients={selectRecipients}
                        />
                    </div>

                </div>

                <span className={style.searchIconWrapper}>
                     <img src={searchIcon} alt="search" onClick={() =>{reviewsSearchToggle(true)}}/>
                </span>

                {currentRecipients &&
                    <div className={style.reviewsName}>
                        <div>
                            <span>{`${currentRecipients}`}</span>
                        </div>

                        <img src={resetDataIcon} alt="resetData" onClick={() => setCurrentRecipients(null)}/>
                    </div>}
            </div>

            <div style={!windowSizeMobile && currentRecipients ? {paddingTop: "139px"} : null}
                 className={style.reviews}>
                {reviews.map((review, i)=>{
                    return(
                        <div className={style.review} key={review.recipientName+i}>
                            <div className={style.reviewNameWrapper}>
                                <div>
                                    {review.recipientName}
                                </div>

                                <div>
                                    {review.date}
                                </div>
                            </div>

                            <div className={style.code}>
                                {review.code}
                            </div>

                            <div className={style.starWrapper}>
                                <img src={+review.star >= 4 ? greenStar : redStar} alt="star"/>

                                <span className={+review.star >= 4 ? style.greenStar : style.redStar}>
                                        {review.star}
                                </span>
                            </div>

                            <div className={style.hrLine}/>

                            <div className={style.reviewText}>
                                {`${windowSizeMobile ? review.reviews.slice(0, 90) : review.reviews.slice(0, 172)}...`}
                            </div>

                            <div className={style.btnWrapper}>
                                <Button className={style.Btn} onClick={()=>getCurrentReviews(review)}>Read More</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )};

export default Reviews;

import React from 'react';
import style from "./ReviewsSearch.module.css"
import backIcon from "../../../../assets/images/BackButton.png";
import searchIcon from "../../../../assets/images/reviews/search.png";
import searchIconDT from "../../../../assets/images/reviews/search-desktop.png";
import clearValueIcon from "../../../../assets/images/reviews/clear-value.png";
import searchResultIcon from "../../../../assets/images/reviews/search-result.png";
import {toggleFieldInFocus} from "../../../../modules/windowSizeToggle/windowSizeAction";
import {useDispatch} from "react-redux";


const ReviewsSearch = ({reviewsSearchIsOpen, reviewsSearchToggle, searchValue, changeSearchValue, searchRecipients, selectRecipients, windowSizeMobile}) => {
    const dispatch = useDispatch()

    const reviewsSearchCls = [ style.reviewsSearchContainer, style.reviewsSearchContainerClose ];

    if(reviewsSearchIsOpen) reviewsSearchCls.pop();

    const focusHandler =()=>{
        dispatch(toggleFieldInFocus(true));
    };

    const blurHandler =()=>{
        dispatch(toggleFieldInFocus(false));
    };


    return(
        <div className={reviewsSearchCls.join(" ")}>

            <div className={style.headerContainer}>
                <div className={style.backIconWrapper}>
                    <img className={style.backIcon} src={backIcon} alt="BackIcon"
                         onClick={() => {
                             reviewsSearchToggle(false)
                         }}/>
                </div>

                <div className={style.searchWrapper}>
                    <input className={style.search} placeholder={"Search"} value={searchValue}
                           onChange={e => changeSearchValue(e.target.value)}
                           onFocus={focusHandler}
                           onBlur={blurHandler}
                    />

                    {searchValue.length > 0 &&
                    <img src={clearValueIcon} alt="clearValue" onClick={() => changeSearchValue("")}/>}
                </div>

                <div className={style.searchIcon}>
                    <img src={windowSizeMobile ? searchIcon : searchIconDT} alt="search"/>
                </div>
            </div>

            <div
                className={searchRecipients.length > 0 && searchValue.length > 0 ? style.searchResultWrapper : style.searchResultWrapperOff}>
                {searchRecipients.map(recipient => {
                    return <div key={recipient} className={style.searchResult}
                                onClick={() => selectRecipients(recipient)}>
                        <img src={searchResultIcon} alt="searchResultIcon"/>
                        {<>
                            <span className={style.mismatchedLetters}>
                                {recipient.substr(0, recipient.toLowerCase().indexOf(searchValue.toLowerCase().trim()))}
                             </span>
                            <span className={style.matchedLetters}>
                                {recipient.substr(recipient.toLowerCase().indexOf(searchValue.toLowerCase().trim()), searchValue.trim().length)}
                             </span>
                            <span className={style.mismatchedLetters}>
                                {recipient.substr(recipient.toLowerCase().indexOf(searchValue.toLowerCase().trim()) + searchValue.trim().length, recipient.length)}
                             </span>
                        </>}
                    </div>
                })}
            </div>


        </div>
    )
};

export default ReviewsSearch;

import React, {useState} from 'react';
import Reviews from "./ReviewsMobile/Reviews";
import CurrentReviews from "./ReviewsMobile/CurrentReviews/CurrentReviews";
import ReviewsSearch from "./ReviewsMobile/ReviewsSearch/ReviewsSearch";
import {useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import Backdrop from "../../components/Backdrop/Backdrop";

const reviews = [
    {
        recipientName: "John Miller",
        date: "03.15.2020",
        code: "079750",
        star: "5.0",
        reviews: "Great service, friendly and generally a nice person. Very satisfied! Next time is required"
    },
    {
        recipientName: "Isabella Johnson",
        date: "03.15.2020",
        code: "079750",
        star: "3.9",
        reviews: "Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and geneGreat service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and geneGreat service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and geneGreat service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and geneGreat service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and geneGreat service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required..."
    },
    {
        recipientName: "Mike Tyson",
        date: "03.15.2020",
        code: "079750",
        star: "3.9",
        reviews: "Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required..."
    },
    {
        recipientName: "Isabella Johnson",
        date: "03.15.2020",
        code: "079750",
        star: "3.9",
        reviews: "Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required..."
    },
    {
        recipientName: "John Miller",
        date: "03.15.2020",
        code: "079750",
        star: "3.9",
        reviews: "Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required...Great service, friendly and generally a nice person. Very satisfied! Next time is requiredGreat service, friendly and generally a nice person. Very satisfied! Next time is required..."
    },

]

const ReviewsContainer = ({isUpToggle, isUp}) => {
    const [currentReviews, setCurrentReviews] = useState(null)
    const [currentRecipients, setCurrentRecipients] = useState(null)
    const [reviewsSearchIsOpen, reviewsSearchToggle] = useState(false)

    const [searchValue, changeSearchValue] = useState("")

    const windowSizeMobile = useSelector(state => windowSizeSelector(state));


    const getCurrentReviews = (reviews)=>{
        isUpToggle();
        setCurrentReviews(reviews)
    };

    const recipients = ["John Miller",
        "Isabella Johnson", "Mike Tyson", "Johny Cage",
    ];

    const searchRecipients =()=>{
        if (!searchValue.trim()) return [];
        else return recipients.filter(recipient => {
                return recipient.toLowerCase().includes(searchValue.toLowerCase().trim())
            }
        )
    };

    const filterRecipients =()=>{
        if (!currentRecipients) return reviews;
        else return reviews.filter(review => review.recipientName === currentRecipients)
    };

    const selectRecipients=(recipients)=>{
        setCurrentRecipients(recipients);
        reviewsSearchToggle(false)
        changeSearchValue("")
    };

    return(
        <>
            <div className={"Mobile"}>
                <ReviewsSearch reviewsSearchIsOpen={reviewsSearchIsOpen} reviewsSearchToggle={reviewsSearchToggle}
                               searchValue={searchValue} changeSearchValue={changeSearchValue}
                               windowSizeMobile={windowSizeMobile}
                               searchRecipients={searchRecipients()} selectRecipients={selectRecipients}
                />
            </div>


            <Reviews getCurrentReviews={getCurrentReviews} reviewsSearchToggle={reviewsSearchToggle}
                     currentRecipients={currentRecipients} setCurrentRecipients={setCurrentRecipients}
                     reviews={filterRecipients()}
                     reviewsSearchIsOpen={reviewsSearchIsOpen}
                     searchValue={searchValue} changeSearchValue={changeSearchValue} windowSizeMobile={windowSizeMobile}
                     searchRecipients={searchRecipients()} selectRecipients={selectRecipients}/>

            <CurrentReviews currentReviews={currentReviews} isUpToggle={isUpToggle} isUp={isUp}/>

            <div className={'Desktop'}>
                <Backdrop isGrey={true} choosingTransactionsIsOpen={searchValue.trim() && searchValue.length > 0}/>

                <Backdrop styles={{zIndex: 20}} choosingTransactionsIsOpen={isUp} onClick={isUpToggle}/>
            </div>

        </>
    )};

export default ReviewsContainer;

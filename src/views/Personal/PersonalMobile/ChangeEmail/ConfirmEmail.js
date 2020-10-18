import React, {useEffect} from 'react';
import style from './EmailMobile.module.css'

import {Button} from "../../../../components/Button/Button";
import {compose} from "redux";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {confirmEmail, requestToConfirmEmail} from "../../../../modules/userProfile/userProfileActions";
import {
    confirmEmailErrorMessageSelector,
    isEmailConfirmedSelector
} from "../../../../modules/userProfile/userProfileSelectors";


const ConfirmEmail = ({requestToConfirmEmail, confirmEmail, isEmailConfirmed, confirmEmailErrorMessage, match: {params}}) => {

    useEffect(() => {
        requestToConfirmEmail(params.id)
    }, []);

    return (
        <div className={style.confirmEmailContainer}>
            <div className={style.confirmEmailWrapper}>
                {confirmEmailErrorMessage ?
                <h2 className={style.errorMessage}>{confirmEmailErrorMessage}</h2>

               : !isEmailConfirmed
                    ? <h2>Confirmation in progress...</h2>

                    : <>
                        <h2>You have successfully confirmed your mail!</h2>

                        <NavLink to={"/"} className={style.homeBtn}>
                            <Button style={{width: 138}}
                            onClick={()=>confirmEmail(false)}>
                                {"Home"}
                            </Button>
                        </NavLink>
                    </>
                }
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isEmailConfirmed: isEmailConfirmedSelector(state),
    confirmEmailErrorMessage: confirmEmailErrorMessageSelector(state)
});

export default compose(
  connect(mapStateToProps, {requestToConfirmEmail, confirmEmail}),
  withRouter
)(ConfirmEmail);

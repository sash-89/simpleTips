import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {
    phoneNumberIsChanging,
    login,
    requestSmsCode,
    setPhoneNumberErrorMessage,
    setSmsCodeErrorMessage
} from "../../../../modules/login/loginActions";
import {withRouter} from "react-router-dom";
import {authTokenSelector} from "../../../../modules/auth/authSelectors";
import {
    isReceivedSmsCodeSelector,
    phoneNumberErrorMessageSelector,
    confirmPhoneNumberSelector,
    smsCodeErrorMessageSelector
} from "../../../../modules/login/loginSelectors";
import {windowSizeSelector} from "../../../../modules/windowSizeToggle/windowSizeSelectors";
import {phoneNumberSelector, roleSelector} from "../../../../modules/userProfile/userProfileSelectors";
import ChangePhone from "./ChangePhone";
import {requestToChangePhoneNumber} from "../../../../modules/userProfile/userProfileActions";


class ChangePhoneContainer extends Component {

    state = {
        userPhoneNumberValue: this.props.userPhoneNumber ? this.props.userPhoneNumber.slice(1) : "",
        userSmsCodeValue: "",

        isButtonDisabled: false,
        isReSendButtonDisabled: true,

        smsCodeTimer: 50,
    };

    timerInterval;
    loginTimeout;

    emptyData =()=>{
        if (this.props.phoneNumberErrorMessage) this.props.setPhoneNumberErrorMessage(null);
        if (this.props.setSmsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null);
        if (this.state.isButtonDisabled) this.setState({isButtonDisabled: false});

        if (this.props.isReceivedSmsCode) this.props.phoneNumberIsChanging();
    };


    getUserSmsCode = () => {
        if (this.state.userPhoneNumberValue.length >= 11
            // && this.state.userPhoneNumberValue !== this.props.userPhoneNumber.slice(1)
        ) {
            this.props.requestSmsCode(`+${this.state.userPhoneNumberValue}`);
            this.setState({isButtonDisabled: true, isReSendButtonDisabled: true});
            this.runTimer()

            // } else if (this.state.userPhoneNumberValue === this.props.userPhoneNumber.slice(1)){
            //     this.props.setPhoneNumberErrorMessage("New phone number matches with old phone number")

        } else if (!this.state.userPhoneNumberValue.trim()){
            this.props.setPhoneNumberErrorMessage("The field is not filled")

        } else {
            this.props.setPhoneNumberErrorMessage("Incorrect phone number")

        }

        if (this.props.setSmsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null)
    };

    setUserPhoneNumber = (phoneNumber) => {
        this.setState({userPhoneNumberValue: phoneNumber});

        this.emptyData();

        return window.clearInterval(this.timerInterval)
    };


    setUserSmsCode = (e) => {
        if (e.target.validity.valid) {
            this.setState({userSmsCodeValue: e.target.value});
        }

        if (this.props.smsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null)
    };

    runTimer = () => {
        this.setState({smsCodeTimer: 50})
        const startTime = new Date();

        this.timerInterval = window.setInterval(() => {

            const curTime = new Date();
            const difference = Math.round((curTime.getTime() - startTime.getTime()) / 1000);

            const startingPoint = 51 - difference;

            this.setState((prevState) => {
                if (prevState.smsCodeTimer > startingPoint + 4) prevState.smsCodeTimer = startingPoint
                return {smsCodeTimer: prevState.smsCodeTimer > 0 ? prevState.smsCodeTimer - 1 : 0}
            });

            if (this.state.smsCodeTimer === 0) {
                this.setState({isReSendButtonDisabled: false})

                return window.clearInterval(this.timerInterval)
            }

        }, 1000);

    };


    confirmChangedPhoneNumber = () =>{
        if (this.state.userSmsCodeValue.length === 6) {
            this.props.requestToChangePhoneNumber(this.state.userSmsCodeValue, `+${this.state.userPhoneNumberValue}`);

            this.props.history.push('/user/personal')

        } else if (!this.state.userPhoneNumberValue.trim()){
            this.props.setSmsCodeErrorMessage("The field is not filled")

        } else {
            this.props.setSmsCodeErrorMessage("Incorrect code")

        }
    };



    componentWillUnmount() {
        window.clearTimeout(this.loginTimeout);
        window.clearInterval(this.timerInterval);

        this.emptyData()
    }


    render() {

        return (
            <div>
                <ChangePhone userPhoneNumberValue={this.state.userPhoneNumberValue} setUserPhoneNumber={this.setUserPhoneNumber}
                             confirmPhoneNumber={this.props.confirmPhoneNumber} role={this.props.userRole} getUserSmsCode={this.getUserSmsCode}
                             isReceivedSmsCode={this.props.isReceivedSmsCode} isReSendButtonDisabled={this.state.isReSendButtonDisabled}
                             phoneNumberErrorMessage={this.props.phoneNumberErrorMessage} setUserSmsCode={this.setUserSmsCode}
                             smsCodeErrorMessage={this.props.smsCodeErrorMessage} smsCodeTimer={this.state.smsCodeTimer}
                             userSmsCodeValue={this.state.userSmsCodeValue} isButtonDisabled={this.state.isButtonDisabled}
                             confirmChangedPhoneNumber={this.confirmChangedPhoneNumber}
                />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userRole: roleSelector(state),
    isReceivedSmsCode: isReceivedSmsCodeSelector(state),
    confirmPhoneNumber: confirmPhoneNumberSelector(state),
    phoneNumberErrorMessage: phoneNumberErrorMessageSelector(state),
    smsCodeErrorMessage: smsCodeErrorMessageSelector(state),
    userPhoneNumber: phoneNumberSelector(state),
    windowSizeMobile: windowSizeSelector(state)
});

export default compose(connect(mapStateToProps, {
    requestToChangePhoneNumber,
    requestSmsCode,
    phoneNumberIsChanging,
    setPhoneNumberErrorMessage,
    setSmsCodeErrorMessage,
}), withRouter)(ChangePhoneContainer)
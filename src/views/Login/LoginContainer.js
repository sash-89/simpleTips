import React, {Component} from 'react';
import Tabs from "../../components/Tabs/Tabs";
import style from "./LoginComponents/Login.module.css"
import Login from "./LoginComponents/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    phoneNumberIsChanging,
    login,
    requestSmsCode,
    setPhoneNumberErrorMessage,
    setSmsCodeErrorMessage
} from "../../modules/login/loginActions";
import {withRouter} from "react-router-dom";
import {authTokenSelector} from "../../modules/auth/authSelectors";
import {
    isReceivedSmsCodeSelector,
    phoneNumberErrorMessageSelector,
    confirmPhoneNumberSelector,
    smsCodeErrorMessageSelector
} from "../../modules/login/loginSelectors";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import {roleSelector} from "../../modules/userProfile/userProfileSelectors";


class LoginContainer extends Component {

    state = {
        userPhoneNumberValue: "",
        userSmsCodeValue: "",

        isButtonDisabled: false,
        isReSendButtonDisabled: true,

        smsCodeTimer: 50,
        role: null
    };

    timerInterval;
    loginTimeout;

    emptyState = () => {
        this.setState({
            userPhoneNumberValue: "",
            userSmsCodeValue: "",

            isButtonDisabled: false,
            isReSendButtonDisabled: true,

            smsCodeTimer: 50,
            role: null
        });

        if (this.props.phoneNumberErrorMessage) this.props.setPhoneNumberErrorMessage(null);
        if (this.props.setSmsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null);
        if (this.props.isReceivedSmsCode) this.props.phoneNumberIsChanging();

        window.clearTimeout(this.loginTimeout);
        window.clearInterval(this.timerInterval);

    };

    getUserSmsCode = (role) => {
        if (this.state.userPhoneNumberValue.length >= 11) {
            this.props.requestSmsCode(`+${this.state.userPhoneNumberValue}`);
            this.setState({isButtonDisabled: true, isReSendButtonDisabled: true});
            this.setState({role});
            this.runTimer()

        } else {
            this.props.setPhoneNumberErrorMessage("Incorrect phone number")
        }

        if (this.props.smsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null)
    };

    setUserPhoneNumber = (phoneNumber) => {
        this.setState({userPhoneNumberValue: phoneNumber});
        if (this.props.phoneNumberErrorMessage) this.props.setPhoneNumberErrorMessage(null);
        if (this.props.setSmsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null);
        if (this.state.userSmsCodeValue) this.setState({userSmsCodeValue: ""});
        if (this.state.isButtonDisabled) this.setState({isButtonDisabled: false});

        if (this.props.isReceivedSmsCode) this.props.phoneNumberIsChanging();

        return window.clearInterval(this.timerInterval)
    };


    setUserSmsCode = (e) => {
        if (e.target.validity.valid) {
            this.setState({userSmsCodeValue: e.target.value});
        }

        if (this.props.setSmsCodeErrorMessage) this.props.setSmsCodeErrorMessage(null)
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


    componentDidMount() {
        if (this.props.authToken) {
            if (this.props.userRole === "MAID") {
                this.props.history.push('/')
            } else if (this.props.userRole === "ADMIN") this.props.history.push('/rooms')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.userSmsCodeValue !== prevState.userSmsCodeValue) {
            if (this.state.userSmsCodeValue.length === 6) {
                this.loginTimeout = setTimeout(() => {
                    this.props.login(this.state.userSmsCodeValue, `+${this.state.userPhoneNumberValue}`, this.state.role);

                    return window.clearTimeout(this.loginTimeout)
                }, 1000)
            }
        }

        if (this.props.userRole !== prevProps.userRole && this.props.authToken) {
            if (this.props.userRole === "MAID") {
                this.props.history.push('/')
            } else if (this.props.userRole === "ADMIN") this.props.history.push('/rooms')
        }
    }

    componentWillUnmount() {
        window.clearTimeout(this.loginTimeout);
        window.clearInterval(this.timerInterval);
    }


    render() {
        const tabs = [
            {
                tittle: "Tip recipient",
                component: <Login confirmPhoneNumber={this.props.confirmPhoneNumber}
                                  phoneNumberErrorMessage={this.props.phoneNumberErrorMessage}
                                  smsCodeErrorMessage={this.props.smsCodeErrorMessage}
                                  isReceivedSmsCode={this.props.isReceivedSmsCode}
                                  userPhoneNumberValue={this.state.userPhoneNumberValue}
                                  getUserSmsCode={()=>this.getUserSmsCode("MAID")}
                                  setUserPhoneNumber={this.setUserPhoneNumber} setUserSmsCode={this.setUserSmsCode}
                                  isButtonDisabled={this.state.isButtonDisabled}
                                  userSmsCodeValue={this.state.userSmsCodeValue} smsCodeTimer={this.state.smsCodeTimer}
                                  isReSendButtonDisabled={this.state.isReSendButtonDisabled}
                                  windowSizeMobile={this.props.windowSizeMobile} emptyState={this.emptyState}/>,
            },
            {
                tittle: "Administrator",
                component: <div>
                                <Login confirmPhoneNumber={this.props.confirmPhoneNumber} tabNumber={2}
                                       phoneNumberErrorMessage={this.props.phoneNumberErrorMessage}
                                       smsCodeErrorMessage={this.props.smsCodeErrorMessage}
                                       isReceivedSmsCode={this.props.isReceivedSmsCode}
                                       userPhoneNumberValue={this.state.userPhoneNumberValue}
                                       getUserSmsCode={() => this.getUserSmsCode("ADMIN")}
                                       setUserPhoneNumber={this.setUserPhoneNumber} setUserSmsCode={this.setUserSmsCode}
                                       isButtonDisabled={this.state.isButtonDisabled}
                                       userSmsCodeValue={this.state.userSmsCodeValue} smsCodeTimer={this.state.smsCodeTimer}
                                       isReSendButtonDisabled={this.state.isReSendButtonDisabled}
                                       windowSizeMobile={this.props.windowSizeMobile} emptyState={this.emptyState}/>
                          </div>
            }
        ];

        return (
<div>
            <div className={style.signUpContainer}>
                <div className={style.title}>
                    SimpleTips
                </div>

                <Tabs tabsContainerCls={style.tabsContainerCls} tabsHeaderCls={style.tabsHeaderCls}
                      underlineCls={style.underlineCls} tabs={tabs}/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userRole: roleSelector(state),
    authToken: authTokenSelector(state),
    isReceivedSmsCode: isReceivedSmsCodeSelector(state),
    confirmPhoneNumber: confirmPhoneNumberSelector(state),
    phoneNumberErrorMessage: phoneNumberErrorMessageSelector(state),
    smsCodeErrorMessage: smsCodeErrorMessageSelector(state),
    windowSizeMobile: windowSizeSelector(state)
});

export default compose(connect(mapStateToProps, {
    login,
    requestSmsCode,
    phoneNumberIsChanging,
    setPhoneNumberErrorMessage,
    setSmsCodeErrorMessage,
}), withRouter)(LoginContainer)
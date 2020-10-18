import React, {Component} from 'react';
import {InputField} from "../../../../components/InputField/InputField";
import style from './EmailMobile.module.css'
import {Button} from "../../../../components/Button/Button";
import {connect} from "react-redux";
import HeaderSecondMB from "../../../Header/HeaderMobile/HeaderSecondMB";
import {requestToAddEmail} from "../../../../modules/userProfile/userProfileActions";
import {emailValidator} from "../../../../utils/validators";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {emailSelector} from "../../../../modules/userProfile/userProfileSelectors";

class ChangeEmail extends Component {
  state = {
    email: this.props.userEmail ? this.props.userEmail : "",
    errorMessage: null,
  };

  setEmail = (e) => {
    this.setState({email: e.target.value});
    if (this.state.errorMessage) this.setState({errorMessage: null});
  };

  changeEmail = () => {
    if (this.state.email.trim()) {
      if (emailValidator(this.state.email)) {
        if (this.state.email === this.props.userEmail) {
          this.setState({errorMessage: "New e-mail matches with old e-mail"})
        } else {
          this.props.requestToAddEmail(this.state.email);

          this.props.history.push("/user/personal");
        }

      } else if (!emailValidator(this.state.email)) {
        this.setState({errorMessage: "Incorrect email"})

      }
    } else if (!this.state.email) {
      this.setState({errorMessage: "The field is not filled"})

    }
  };

  render() {
    const {email} = this.state;
    const {role} = this.props;

    return (
        <div className={style.changeEmailContainer}>
          <HeaderSecondMB headerClassName={style.headerCls} role={role} title={"Change e-mail"}/>

          <div className={style.changeEmailWrapper}>
            <div style={{marginTop: '20px'}}>
              <InputField
                  onChange={this.setEmail}
                  value={email}
                  placeholder={'New e-mail'}
              />
              {this.state.errorMessage && <p className={style.errorMessage}>{this.state.errorMessage}</p>}

            </div>
            <div>
              <p className={style.body}>
                A confirmation link will be sent to a new e-mail,
                if the letter does not arrive for a long time,
                check the Spam folder
              </p>
              <Button onClick={this.changeEmail} className={style.button}>Change e-mail</Button>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: emailSelector(state),
});

export default compose(connect(mapStateToProps, {requestToAddEmail}), withRouter) (ChangeEmail)


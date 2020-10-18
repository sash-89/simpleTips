import React, {Component} from 'react';
import style from './Notifications.module.css';
import Gpay from '../../../assets/images/GPay-Normal.png'
import App from '../../../assets/images/AppleWallet-Normal.png'
import {BlueSwitch} from "../../../components/BlueSwitch/BlueSwitch";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

class Notifications extends Component {
    state={
      checked: false,
    };


  handleChange(checked) {
    this.setState({checked})
  }

  render() {

    return (
        <div className={style.notificationsContainer}>
            <div className={"Mobile"}>
                <HeaderSecondMB title={"Notifications"}/>
            </div>

            <div className={"Desktop"}>
                <h5 className={style.title}>Notifications</h5>
            </div>

            <div className={style.contentWrapper}>
                <div className={style.switchWrapper}>
                    <span className={style.switchTitle}>Send SMS-notifications</span>
                    <BlueSwitch checked={this.state.checked} onChange={e => this.handleChange(e.target.checked)}/>
                </div>

                <div className={style.textWrapper}>
                    <div>The service of sending alerts by SMS is paid. $0,3 / message.</div>

                    <div>To receive Push notifications about the balance status, add your Google Pay or Apple Wallet
                        account.
                    </div>
                </div>

                <div className={style.paymentButton}>
                    <img src={Gpay} alt={Gpay}/>

                    <img src={App} alt={App}/>
                </div>
            </div>
        </div>
    );
  }
}

export default Notifications;

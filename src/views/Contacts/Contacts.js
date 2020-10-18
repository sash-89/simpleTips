import React, {useEffect} from 'react';
import {Button} from "../../components/Button/Button";
import Telegram from '../../assets/images/Telegram.png'
import WhatsApp from '../../assets/images/WhatsApp.png'
import style from './Contacts.module.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {supportEmailSelector, supportPhoneNumberSelector} from "../../modules/support/supportSelectors";
import {compose} from "redux";
import {getSupportContacts} from "../../modules/support/supportActions";



const Contacts = ({supportEmail, supportPhoneNumber, getSupportContacts, history}) => {

    useEffect(()=>{
        getSupportContacts()
    }, []);

    return (
        <div className={style.contactContainer}>
            <span className={style.title}>Contacts</span>

            <div className={style.Body}>
                <span className={style.ContentTitle}>Phones</span>
                <span className={style.ContentBody}>{supportPhoneNumber}&nbsp;</span>
                <span className={style.ContentTitle}>E-mail</span>
                <span className={style.ContentBody}>{supportEmail}&nbsp;</span>
            </div>

            <div className={style.btnWrapper}>
                <Button
                    onClick={() => history.push('/support')}
                    style={{width: '151px', marginTop: '31px'}}>
                    Write a Message
                </Button>


                <div className={style.BodyButton}>
                    <div className={style.BodyButtonsStyle}>
                        <img src={Telegram} alt={Telegram}/>
                        <span className={style.BodyButtonsStyleText}> Write to Telegram</span>
                    </div>

                    <div className={style.BodyButtonsStyle}>
                        <img src={WhatsApp} alt={WhatsApp}/>
                        <span className={style.BodyButtonsStyleText}> Write to Whatsapp</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = state => ({
    supportEmail: supportEmailSelector(state),
    supportPhoneNumber: supportPhoneNumberSelector(state)
});

export default compose(connect(mapStateToProps, {getSupportContacts}), withRouter)(Contacts);



import React from 'react';
import style from "./UserContacts.module.css";
import {NavLink} from "react-router-dom";
import {ReSendBtn} from "../ReSendBtn/ReSendBtn";
import change from '../../assets/images/Change.png'



const UserContacts = ({userEmail, userPhoneNumber}) => {

    return (

        <div className={style.userContactsContainer}>
            <span className={style.userContactsTitle}>Contacts</span>

            <div className={style.contactWrapper}>
                <span className={style.contactTitle}>E-mail</span>

                <div className={style.contactChangedWrapper}>
                    <span className={style.contact}>{userEmail ? userEmail : "Empty"}</span>
                    <NavLink to={'/user/change_email'}>
                        <img className={style.changeMobile} src={change} alt={"change"}/>
                        <ReSendBtn className={style.changeDesktop} value={"Change e-mail"}/>
                    </NavLink>
                </div>
            </div>

            <div className={style.contactWrapper}>
                <span className={style.contactTitle}>Phone</span>

                <div className={style.contactChangedWrapper}>
                    <span className={style.contact}>{userPhoneNumber}</span>
                    <NavLink to={'/user/change_phone_number'}>
                        <img className={style.changeMobile} src={change} alt={"change"}/>
                        <ReSendBtn className={style.changeDesktop} value={"Change phone"}/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default UserContacts;

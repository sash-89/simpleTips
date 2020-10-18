import React from 'react';
import style from './Invite.module.css'
import {InputField} from "../../../components/InputField/InputField";
import {Button} from "../../../components/Button/Button";

const Invite = () => (
    <div className={style.inviteContainer}>
        <div className={style.inviteWrapper}>
            <div className={style.title}>Invite Friends</div>

            <div className={style.bodyText}>
                You can invite friends to the service and give them the opportunity to simply and easily receive tips
                from the card.
            </div>

            <div className={style.inviteText}>Invite by e-mail</div>

            <div className={style.inputWrapper}>
                <InputField
                    placeholder={"E-mail"}
                    onChange={() => console.log('a')}/>

                <Button className={style.btn}>
                    Send Invite
                </Button>

                <hr className={style.hr}/>

                <div style={{marginTop: '23px'}}>
                    <span className={style.inviteText}>Invite Link</span>
                </div>
            </div>
        </div>

    </div>
);

export default Invite;

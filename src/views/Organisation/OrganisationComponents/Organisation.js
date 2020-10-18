import React from 'react';
import style from './Organisation.module.css'
import {Button} from "../../../components/Button/Button";
import {ReSendBtn} from "../../../components/ReSendBtn/ReSendBtn";
import Delete from '../../../assets/images/Delete.png'
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

const Organisation = ({modalToggle}) => (
    <div className={style.organisationContainer}>
      <div className={"Mobile"}>
        <HeaderSecondMB title={"Organisation"}/>
      </div>

      <div className={style.organisationWrapper}>
        <div className={style.title}>
            <h6>New invitation</h6>
            <p>Burgers and Steaks LLC wants to add you as a tip recipient.</p>

            <div className={style.btnsWrapper}>
              <Button className={style.btn}>Accept</Button>
              <ReSendBtn className={style.Reject} value={'Reject'}/>
            </div>
        </div>

        <div className={style.myOrganisation}>
          <h6>My organisation</h6>
          <p className={style.nameOrganisation}>Name of the organization</p>

          <div className={style.organisationAccept}>
            <p>Khachapuri and Wine</p>

            <img className={style.deleteMobile} src={Delete} alt={"Delete"} onClick={() => modalToggle(true)}/>

            <div className={style.deleteDesktop} onClick={() => modalToggle(true)}>Delete</div>

          </div>
        </div>

      </div>
    </div>
);

export default Organisation;

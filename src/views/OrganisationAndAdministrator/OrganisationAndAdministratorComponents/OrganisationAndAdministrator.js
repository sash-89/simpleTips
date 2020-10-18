import React from 'react';
import style from "./OrganisationAndAdministrator.module.css";

import {InputField} from "../../../components/InputField/InputField";
import {Button} from "../../../components/Button/Button";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";
import UserContacts from "../../../components/UserContacts/UserContacts";

function OrganisationAndAdministrator({organisationFieldData, saveProfileChanges, userEmail, userPhoneNumber, commonErrorMessage}) {


    const FirstName = 'Alexander'
    const LastName = 'Smith'

  return (
      <div className={style.organisationAndAdministratorContainer}>
          <div className={"Mobile"}>
              <HeaderSecondMB headerClassName={style.headerCls} title={"Organisation & Administrator"}/>
          </div>

          <div className={"Desktop"}>
              <h5 className={style.title}>Organisation & Administrator</h5>
          </div>

          <div className={style.contentWrapper}>

              <div className={style.administratorWrapper}>
                  <div className={style.sectionTitle}>Administrator</div>

                  <div className={style.inputsWrapper}>
                      <div className={style.inputs}>
                          <InputField value={"ADM-045-430"}
                                      placeholder={'Administrators’s ID'}
                                      disabled={true}
                                      legendDown={false}
                          />
                      </div>

                      <div className={style.inputs}>
                          <InputField
                              value={FirstName}
                              placeholder={'First Name'}
                              disabled={true}
                              legendDown={false}
                          />
                      </div>

                      <div className={style.inputs}>
                          <InputField
                              value={LastName}
                              placeholder={'Last Name'}
                              disabled={true}
                              legendDown={false}
                          />
                      </div>
                  </div>


                  <UserContacts userEmail={userEmail} userPhoneNumber={userPhoneNumber} />

              </div>

              <div className={style.organisationWrapper}>
                  <div className={style.sectionTitle}>Organisation</div>

                  {organisationFieldData.map(input => {
                      return (
                          <div className={style.inputs} key={input.name}>
                              <InputField placeholder={input.placeholder} onChange={input.onChange}
                                          value={input.value} name={input.name} isTextarea={input.isTextarea}
                              />

                              {input.isError && <div className={style.error}>Required field</div>}
                          </div>
                      )
                  })}

              </div>

              {commonErrorMessage && <div className={style.commonError}>{commonErrorMessage}</div>}

              <div className={"Mobile"}>
                  <Button onClick={saveProfileChanges} className={style.btn}>Save changes</Button>
              </div>
          </div>

          <div className={"Desktop"}>
              <Button onClick={saveProfileChanges} className={style.btn}>Save changes</Button>
          </div>
      </div>
  );
}

export default OrganisationAndAdministrator;

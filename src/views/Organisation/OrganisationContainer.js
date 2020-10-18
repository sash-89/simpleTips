import React, {useState} from "react";
import OrganisationMB from "./OrganisationComponents/Organisation";
import Modal from "../../components/Modal/Modal";
import style from "./OrganisationComponents/Organisation.module.css";



const OrganisationContainer =({})=>{
    const [openModal, modalToggle] =  useState( false )

    return(
    <>
        <OrganisationMB modalToggle={modalToggle}/>

        <Modal modalClassName={style.modal}
               valueLeftBtn={'Cancel'}
               onClickLeftBtn={() => modalToggle(false)}
               valueRightBtn={'Disconnect'}
               onClickRightBtn={()=>alert("Disconnect")}
               modalToggle={openModal}
               modalText={'Are you sure you want to disconnect yourself from the organization “Khachapuri and Wine”?'}/>

    </>
  )

}
export default OrganisationContainer

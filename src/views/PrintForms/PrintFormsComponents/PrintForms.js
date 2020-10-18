import React, {useEffect, useState} from 'react';
import style from "./PrintForms.module.css";

import copyIcon from "../../../assets/images/printForms/copy.png"
import checkedIcon from "../../../assets/images/printForms/checked.png"
import uncheckedIcon from "../../../assets/images/printForms/unchecked.png"

import {Button} from "../../../components/Button/Button";
import {InputField} from "../../../components/InputField/InputField";
import {InputFieldWithChoose} from "../../../components/InputField/InputFieldWithChoose";
import {isIOS} from "../../../utils/validators";

const PrintForms = ({searchUser, changeValue, inputValue, modalToggle, isFiendInFocus}) => {
    const [inputFieldValue, changeInputFieldValue] = useState({
        adminID: "",
        companyName: "",
        adminName: "",
        adminPhone: "",
        shippingAddress: "",
        registrationEmployees: "",
    });

    const inputFieldData = [
        {
            placeholder: "Administrators’s ID",
            value: inputFieldValue.adminID,
            name: "adminID",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
        },
        {
            placeholder: "Company Name",
            value: inputFieldValue.companyName,
            name: "companyName",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
        },
        {
            placeholder: "Administrator’s Name",
            value: inputFieldValue.adminName,
            name: "adminName",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
        },
        {
            placeholder: "Administrator’s Phone",
            value: inputFieldValue.adminPhone,
            name: "adminPhone",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
        },
        {
            placeholder: "Shipping address",
            value: inputFieldValue.shippingAddress,
            name: "shippingAddress",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
        },
        {
            placeholder: "Link for registration of employees",
            value: inputFieldValue.registrationEmployees,
            name: "registrationEmployees",
            onChange: e => {
                let {name, value} = e.target
                changeInputFieldValue(prevState => ({...prevState, [name]: value}))
            },
            icon: copyIcon
        },
    ];

    const [recipients, setRecipient] = useState([]);
    const [checkRecipients, setCurrentRecipient] = useState([]);
    const [isOpenDropdownMenu, dropdownMenuToggle] = useState(false);


    const selectAllRecipients = () => {
        const isInState = checkRecipients === searchUser;

        if (!isInState) setCurrentRecipient(searchUser);
        else setCurrentRecipient([])
    };

    const selectRecipient = (user) => {
        const isInState = checkRecipients.find(recipient => recipient === user)

        if (!isInState) setCurrentRecipient(prevState => ([...prevState, user]))
        else setCurrentRecipient(checkRecipients.filter(recipient => recipient !== user))
    };

    const Done = ()=>{
        setCurrentRecipient([]);
        setRecipient(checkRecipients);
        changeValue("")
    };

    const deleteRecipients = (recipientName) => {
        setRecipient(recipients.filter(recipient => recipient !== recipientName));
    };

    const isSelectedAll = (checkRecipients === searchUser) || (checkRecipients.length === searchUser.length);

    const printFormsContainerCls = [style.printFormsContainer];
    // if(isIOS && isFiendInFocus) printFormsContainerCls.push(style.printFormsContainerIphoneInFocus)

    return (

        <div className={printFormsContainerCls.join(" ")}>

            <h5 className={style.headerTitle}>
                Print Forms
            </h5>

            <div className={style.textAboutPrinting}>
                Here you can order the printing of triangles for maids, with the design of your company.
            </div>

            <div className={style.gridBlock}>

                <div className={style.leftBlockWrapper}>


                    <div className={style.printFormsWrapper}>
                        <div className={style.aboutPrintingWrapper}>

                            <div className={style.sampleImg}/>

                            <div className={style.sampleOfTriangle}>
                                Sample of Triangle
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.rightBlockWrapper}>

                    <div className={style.inputFieldWithChooseWrapper}>
                        <InputFieldWithChoose placeholder={"Recipient Code or Name"} items={recipients}
                                              childClsName={style.childWrapper}
                                              itemOnClick={deleteRecipients} onChange={changeValue} value={inputValue}
                                              disabled={recipients.length !== 0} legendDown={recipients.length === 0}
                                              openDropdownMenu={checkRecipients.length !== 0 || isOpenDropdownMenu}
                                              dropdownMenu={!inputValue && recipients.length !== 0}
                                              reactToValue={inputValue || recipients} fieldsetCls={style.fieldsetCls}
                        >
                            {!inputValue.trim() && <div className={style.selectAll} onMouseDown={selectAllRecipients}>
                                <img src={isSelectedAll ? checkedIcon : uncheckedIcon} alt="checkRecipient"
                                     className={style.checkRecipient}/>
                                Select all
                            </div>
                            }
                            {!inputValue.trim() && <div className={style.hrLineSecond}/>}

                            <div className={style.recipientWrapper}>
                                {searchUser.map(user => {
                                    return (
                                        <div key={user} onMouseDown={() => selectRecipient(user)}
                                             className={style.user}>
                                            <img
                                                src={checkRecipients.find(recipient => recipient === user) ? checkedIcon : uncheckedIcon}
                                                alt="checkRecipient"
                                                className={style.checkRecipient}/>
                                            {user}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className={style.BtnWrapper}>
                                <Button onClick={Done}>Done</Button>
                            </div>
                        </InputFieldWithChoose>
                    </div>

                    {inputFieldData.map(input => {
                        return (
                            <div className={style.inputFieldWrapper} key={input.name}>
                                <InputField placeholder={input.placeholder} onChange={input.onChange}
                                            value={input.value} name={input.name}
                                />
                                {input.icon && <div className={style.copyIconWrapper}>
                                    <img className={style.copyIcon} src={input.icon} alt="copy"/>
                                </div>}
                            </div>
                        )
                    })}

                    <div className={style.btnWrapper}>
                        <Button className={style.Btn} onClick={() => modalToggle(true)}>Place the Order</Button>
                    </div>

                </div>
            </div>
        </div>

    )
};

export default PrintForms;

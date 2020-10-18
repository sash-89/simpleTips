import React from 'react';
import style from "./AddEmployee.module.css";
import {Button} from "../../../components/Button/Button";
import {InputFieldWithChoose} from "../../../components/InputField/InputFieldWithChoose";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";


const AddEmployee = ({inputValue,  changeInputValue, currentRoom, isLegendDown, attachEmployee, pathname}) => {

    return(
            <div className={style.attachEmployeeContainer}>
                <HeaderSecondMB title={pathname === "/rooms/attach_employee" ? "Attach Employee" : "Replace Employee"} />
                <div className={style.floorNumberWrapper}>
                    <div className={style.floorNumber}>
                        {"1 floor"}
                    </div>

                    <div className={style.roomNumberWrapper}>
                        <span className={style.roomNumber}>No. {currentRoom}</span>
                        { pathname === "/rooms/replace_employee"
                            ? <span className={style.employee}>{"Sara"}</span>
                            : <span className={style.free}>Free</span>
                        }
                    </div>
                </div>

                <div className={style.hrLine}/>
                <div className={style.inputFieldWrapper}>
                    <InputFieldWithChoose placeholder={"Employee Code or Name"}
                                          value={inputValue} onChange={(e)=>changeInputValue(e.target.value)}
                                          legendDown={isLegendDown}
                        >
                        {/*{searchUser().map(user => {*/}
                        {/*    return (*/}
                        {/*        <div key={user} onClick={() => chooseUser(user)} className={style.user}>{user}</div>*/}
                        {/*    )*/}
                        {/*})}*/}
                    </InputFieldWithChoose>
                    {pathname === "/rooms/replace_employee" && <div className={style.text}>
                        This number is assigned to another employee, when replacing it will be detached from this number.
                    </div>}
                </div>

                <div className={style.BtnWrapper}>
                    <Button onClick={attachEmployee} className={style.Btn}>Attach Employee</Button>

                    {!inputValue && <div className={style.backdrop}/>}
                    {/*{!dropdownMenu && <div className={style.backdrop}/>}*/}
                </div>

                {pathname === "/rooms/attach_employee" &&
                     <div style={{left: 50, top: 150}}><b>1599196364009</b> - UserID для теста</div>}                  {/*delete*/}
            </div>
    )};

export default AddEmployee;

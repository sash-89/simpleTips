import React from 'react';
import menuIcon from "../../../assets/images/headerIcon/menu.png"
import avatarIcon from "../../../assets/images/headerIcon/avatar.png"
import style from "./HeaderMB.module.css"
import Menu from "../../Menu/Menu";
import {NavLink} from "react-router-dom";

const HeaderMB = ({menuToggle, location: {pathname}}) => {
    return(
        <div className={style.headerContainer}>

            <div>
                <header className={style.headerWrapper}>
                    {pathname !=="/login" && <img className={style.menuIcon} src={menuIcon} alt="menuIcon" onClick={menuToggle}/>}
                    <h2>SimpleTips</h2>
                    {pathname !=="/login" &&<NavLink to={'/user'}>
                        <img className={style.avatarIcon} src={avatarIcon} alt="avatarIcon"/>
                    </NavLink>}
                </header>
            </div>

        </div>
    )};

export default HeaderMB;

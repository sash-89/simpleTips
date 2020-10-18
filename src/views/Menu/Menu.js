import React from 'react';
import CloseIcon from "../../assets/images/menuIcon/CloseIcon.png"
import SupportIcon from "../../assets/images/menuIcon/Support.png"
import SupportWhiteIcon from "../../assets/images/navigator/SupportWhite.png"
import SupportActive from "../../assets/images/navigator/SupportActive.png"
import style from "./Menu.module.css"
import {MenuNavigationDesktop, MobileNavigation} from "../../components/Navigation/Navigation";
import {NavLink, withRouter} from "react-router-dom";
import {BlueSwitch} from "../../components/BlueSwitch/BlueSwitch";
import HeaderDT from "../Header/HeaderDesktop/HeaderDT";

const Menu = ({isOpen, menuToggle, role, location}) => {
    let wrapCls=[style.menuWrapper, style.menuClose, style.menuOpen];

    if(!isOpen) wrapCls.pop()

    return(
        <>
            <div className={"Mobile"}>
                <div className={wrapCls.join(' ')}>
                    <div className={style.menuHeader}>
                        <img src={CloseIcon} alt="CloseIcon" onClick={menuToggle} className={style.closeIcon}/>
                        <div className={style.supportWrapper}>
                            <NavLink className={style.supportNav} to={"/support"} onClick={menuToggle}>Support</NavLink>
                            <div className={style.supportImgWrap}>
                                <img src={SupportIcon} alt="Support" className={style.supportIcon}/>
                            </div>
                        </div>
                    </div>

                    <MobileNavigation onClick={menuToggle} role={role} location={location}/>
                </div>
            </div>

            <div className={"Desktop"}>
                <div className={style.menuWrapper}>
                    <MenuNavigationDesktop role={role} location={location}/>

                    <NavLink className={style.supportNav} activeClassName={style.activeLink} to={"/support"}>
                        <img src={location.pathname === "/support" ? SupportActive : SupportWhiteIcon} alt="Support"/>

                        <span>
                            Support
                        </span>
                    </NavLink>
                </div>

            </div>
        </>
    )};

export default withRouter(Menu);

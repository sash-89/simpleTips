import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom"
import style from "./Navigator.module.css"

import HomeIcon from "../../assets/images/navigator/Home.png"
import HomeIconActive from "../../assets/images/navigator/HomeActive.png"
import BalanceIcon from "../../assets/images/navigator/Balance.png"
import BalanceIconActive from "../../assets/images/navigator/BalanceActive.png"
import RequisitesIcon from "../../assets/images/navigator/Requisites.png"
import RequisitesIconActive from "../../assets/images/navigator/RequisitesActive.png"
import SettingsIcon from "../../assets/images/navigator/Settings.png"
import SettingsIconActive from "../../assets/images/navigator/SettingsActive.png"

import Rooms from "../../assets/images/navigator/Rooms.png"
import RoomsActive from "../../assets/images/navigator/RoomsActive.png"
import Recipients from "../../assets/images/navigator/Recipients.png"
import RecipientsActive from "../../assets/images/navigator/RecipientsActive.png"
import Reviews from "../../assets/images/navigator/Reviews.png"
import ReviewsActive from "../../assets/images/navigator/ReviewsActive.png"
import PrintForms from "../../assets/images/navigator/PrintForms.png"
import PrintFormsActive from "../../assets/images/navigator/PrintFormsActive.png"



const adminLinks = [
    {
        exact: true,
        to: "/rooms",
        linkName: "Rooms",
        clsName: "Rooms",
        icon: Rooms,
        activeIcon: RoomsActive,
    },
    {
        exact: true,
        to: "/recipients",
        linkName: "Recipients",
        clsName: "Recipients",
        icon: Recipients,
        activeIcon: RecipientsActive
    },
    {
        exact: true,
        to: "/reviews",
        linkName: "Reviews",
        clsName: "Reviews",
        icon: Reviews,
        activeIcon: ReviewsActive
    },
    {
        exact: false,
        to: "/print_forms",
        linkName: "Print Forms",
        clsName: "PrintForms",
        icon: PrintForms,
        activeIcon: PrintFormsActive
    },
    {
        exact: false,
        to: "/user",
        linkName: "Settings",
        clsName: "Settings",
        icon: SettingsIcon,
        activeIcon: SettingsIconActive
    },
];

const userLinks = [
    {
        exact: true,
        to: "/",
        linkName: "Home",
        clsName: "Home",
        icon: HomeIcon,
        activeIcon: HomeIconActive,
    },
    {
        exact: false,
        to: "/balance",
        linkName: "Balance",
        clsName: "Balance",
        icon: BalanceIcon,
        activeIcon: BalanceIconActive
    },
    {
        exact: false,
        to: "/requisites",
        linkName: "Requisites",
        clsName: "Requisites",
        icon: RequisitesIcon,
        activeIcon: RequisitesIconActive
    },
    {
        exact: false,
        to: "/user",
        linkName: "Settings",
        clsName: "Settings",
        icon: SettingsIcon,
        activeIcon: SettingsIconActive
    },
];


const commonLinks = [
    {
        exact: false,
        to: "/questions",
        linkName: "Q&A",
        clsName: "QA"
    },
    {
        exact: false,
        to: "/contacts",
        linkName: "Contacts",
        clsName: "Contacts",
    },
    {
        exact: false,
        to: "/invite",
        linkName: "Invite Friends",
        clsName: "InviteFriends"
    },
];



export const MobileNavigation =({onClick, location, role}) => {
    const links = role === "ADMIN" ? adminLinks : userLinks;
    const {pathname} = location;

    return (
        <nav>
            {links.map(({exact, to, linkName, icon, clsName, activeIcon}, index) => {
                return (
                    <div key={linkName} className={style[clsName]}>
                        <img src={pathname === to ? activeIcon : icon} alt={linkName}/>
                        <NavLink exact={exact} to={to} onClick={onClick}
                                 className={style.navMenu} key={index} activeClassName={style.menuActiveLink}>
                            {linkName}</NavLink>
                    </div>
                )
            })}

            {commonLinks.map(({exact, to, linkName, icon, clsName, activeIcon}, index) => {
                return (
                    <div key={linkName} className={style[clsName]}>
                        <NavLink exact={exact} to={to} onClick={onClick}
                                 className={style.navMenu} key={index} activeClassName={style.menuActiveLink}>
                            {linkName}</NavLink>
                    </div>
                )
            })}
        </nav>
    )
};


export const MenuNavigationDesktop =({onClick, location, role}) => {
    const links = role === "ADMIN" ? adminLinks : userLinks;
    const {pathname} = location;

    return (
        <nav>
            {links.map(({exact, to, linkName, icon, clsName, activeIcon}, index) => {
                return (
                    <div key={linkName} className={style[clsName]}>
                        <NavLink exact={exact} to={to} onClick={onClick}
                                 className={style.navMenu} key={index} activeClassName={style.menuActiveLink}>
                            <img src={exact && to !== "/" && pathname === to ? activeIcon
                            : !exact && to !== "/" && pathname.includes(to) ? activeIcon
                                : pathname === "/" && pathname === to ? activeIcon : icon} alt={linkName}/>
                            <span>
                               {linkName}
                           </span>
                        </NavLink>
                    </div>
                )
            })}
        </nav>
    )
};



const transitionStyle = `left 200ms, right 200ms`;

export const HeaderNavigationDesktop =({location}) => {
    const parentRef = useRef(null);
    const [size, changeSize] = useState(null);
    const {pathname} = location;

    const handleClick = (e) => {
        const rootBounds = parentRef.current.getBoundingClientRect();
        const bounds = e.target.getBoundingClientRect();

        const left = bounds.left - rootBounds.left;
        const right = rootBounds.right - bounds.right;
        changeSize({left, right})

    };

    const getUnderlineStyle =()=>{
        if (size) {
            return {
                left: `${size.left}px`,
                right: `${size.right}px`,
                transition: transitionStyle,
            }
        }
    };

    useEffect(()=>{
           if(pathname === "/questions") changeSize({left: 0, right: 243.891})

           if(pathname === "/contacts") changeSize({left: 73.3281, right: 137.625})

           if(pathname === "/invite") changeSize({left: 179.594, right: 0.015625})
    }, [pathname]);


    return (
        <nav ref={parentRef}>
            {commonLinks.map(({exact, to, linkName, icon, clsName, activeIcon}, index) => {
                return (
                    <div key={linkName} className={style[clsName]}>
                        <NavLink exact={exact} to={to} onClick={handleClick}
                                 className={style.navMenu} key={index} activeClassName={style.menuActiveLink}>
                            {linkName}
                        </NavLink>
                    </div>
                )
            })}

            {(pathname === "/questions" || pathname === "/contacts"  || pathname === "/invite")
            && <div className={style.tabsUnderline}  style={getUnderlineStyle()}/>}
        </nav>
    )
};

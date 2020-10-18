import React, {useState} from 'react';
import avatarIcon from "../../../assets/images/headerIcon/avatar.png"
import style from "./HeaderDT.module.css"
import {NavLink, withRouter} from "react-router-dom";
import {HeaderNavigationDesktop} from "../../../components/Navigation/Navigation";
import Backdrop from "../../../components/Backdrop/Backdrop";
import personal from "../../../assets/images/headerMenu/personal.png";
import organisation from "../../../assets/images/headerMenu/organisation.png";
import notifications from "../../../assets/images/headerMenu/notifications.png";
import reviewsSetting from "../../../assets/images/headerMenu/reviews-setting.png";
import LogOut from "../../../assets/images/LogOut.png";
import {useDispatch} from "react-redux";
import {signOut} from "../../../modules/auth/authActions";
import Modal from "../../../components/Modal/Modal";
import {resetUserAfterSignOut} from "../../../modules/userProfile/userProfileActions";
import {resetRoomsAfterSignOut} from "../../../modules/organization/organizationActions";


const userDropdownMenu = [
    {
        exact: false,
        to: "/user/personal",
        clsName: "personal",
        link: "/personal",
        linkName: "Personal",
        icon: personal,
    },
    {
        exact: false,
        to: "/user/organisation",
        clsName: "organisation",
        linkName: "Organisation",
        icon: organisation,
    },
    {
        exact: false,
        to: "/user/notifications",
        clsName: "notifications",
        linkName: "Notifications",
        icon: notifications,
    },
];

const adminDropdownMenu = [
    {
        exact: false,
        to: "/user/organisation_and_administrator",
        clsName: "organisation",
        linkName: "Organisation & Administrator",
        icon: organisation ,
    },
    {
        exact: false,
        to: "/user/reviews_setting",
        clsName: "reviews-setting",
        linkName: "Reviews Setting ",
        icon: reviewsSetting ,
    },
];


const HeaderDT = ({user, location, role}) => {
    const menuLinks = role === "ADMIN" ? adminDropdownMenu : userDropdownMenu;
    const dropdownMenuCls = [ style.dropdownMenuContainer, style.dropdownMenuContainerClose ];

    const [isOpenDropdownMenu, openingDropdownMenu] = useState(false);
    const [openModal, modalToggle] =  useState( false );

    const dispatch = useDispatch();

    if(isOpenDropdownMenu) dropdownMenuCls.pop();

    const logOut = () => {
        dispatch(resetUserAfterSignOut());
        dispatch(resetRoomsAfterSignOut());
        dispatch(signOut());
        modalToggle(false)
    };

    const openLogOutModal = () => {
        openingDropdownMenu(false);
        modalToggle(true)
    };

    return(
        <div className={'Desktop'}>
                <header className={style.headerContainer}>
                    <div className={style.headerWrapper}>
                        <h2>SimpleTips</h2>

                        <HeaderNavigationDesktop location={location}/>
                    </div>

                    <div className={style.avatarIconWrapper} onMouseOver={()=>openingDropdownMenu(true)}>
                        <img className={style.avatarIcon} src={avatarIcon} alt="avatarIcon"/>
                        <span>
                            {user && user.nameForProfile ? `${user.nameForProfile.length < 10 ? user.nameForProfile : user.nameForProfile.slice(0, 9)+"."}` : ""}  {/*Alex S.*/}
                        </span>
                    </div>
                </header>

            <Backdrop choosingTransactionsIsOpen={isOpenDropdownMenu} onClick={()=>openingDropdownMenu(false)}/>

            <div className={dropdownMenuCls.join(" ")}>
                {menuLinks.map(({exact, to, linkName, icon, clsName}) => {
                    return (
                        <div key={linkName} className={style[clsName]}>
                            <NavLink exact={exact} to={to} key={linkName} className={style.navMenu} onClick={()=>openingDropdownMenu(false)}>
                                <img src={icon} alt={linkName}/>
                                {linkName}
                            </NavLink>
                        </div>
                    )
                })}
                <div onClick={openLogOutModal} className={style.logOut}>
                    <img src={LogOut} alt={LogOut}/>
                    <span>Log out</span>
                </div>
            </div>

            <Modal modalClassName={style.modal}
                   valueLeftBtn={'Cancel'}
                   onClickLeftBtn={() => modalToggle(false)}
                   valueRightBtn={'Sign out'}
                   onClickRightBtn={logOut}
                   modalToggle={openModal}
                   modalText={'Are you sure you want to sign out?'}/>
        </div>
)};

export default withRouter(HeaderDT);

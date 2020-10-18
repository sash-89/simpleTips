import React, {useEffect, useState} from "react";
import style from './UserComponents/User.module.css'
import User from "./UserComponents/User";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {signOut} from "../../modules/auth/authActions";
import {withRouter} from "react-router-dom";
import organisation from "../../assets/images/organisation.png";
import organisationActive from "../../assets/images/headerMenu/organisation.png";
import personal from "../../assets/images/personal.png";
import personalActive from "../../assets/images/headerMenu/personal.png";
import notifications from "../../assets/images/notifications.png";
import notificationsActive from "../../assets/images/headerMenu/notifications.png";
import reviewsSetting from "../../assets/images/reviewsSetting.png";
import reviewsSettingActive from "../../assets/images/headerMenu/reviews-setting.png";
import Modal from "../../components/Modal/Modal";
import {resetUserAfterSignOut} from "../../modules/userProfile/userProfileActions";
import {resetRoomsAfterSignOut} from "../../modules/organization/organizationActions";


const UserContainer =({user, role, history, location, signOut, resetUserAfterSignOut, resetRoomsAfterSignOut, windowSizeMobile})=>{


    const [openModal, modalToggle] =  useState( false );


    useEffect(()=>{
        if(!windowSizeMobile && location.pathname === "/user"){
            if(role === "ADMIN") history.replace("/user/organisation_and_administrator");

            else history.replace("/user/personal")
        }
    }, [windowSizeMobile, location.pathname]);


    useEffect(() => {
       window.addEventListener("popstate", ()=>{
           if(!windowSizeMobile && location.pathname === "/user") history.go(2);
       }, {once: true});

        return () => {
            window.removeEventListener("popstate", ()=>{
                if(!windowSizeMobile && location.pathname === "/user") history.go(2);
            }, false);
        }
    }, [windowSizeMobile]);


    const logOut = () => {
        resetUserAfterSignOut();
        resetRoomsAfterSignOut();
        signOut();
    };



    const userMenu = role === 'ADMIN'
        ? [
            {
                link: "/user/organisation_and_administrator",
                linkName: "Organisation & Administrator",
                icon: organisation,
                activeIcon: organisationActive,
            },
            {
                link: "/user/reviews_setting",
                linkName: "Reviews Setting ",
                icon: reviewsSetting,
                activeIcon: reviewsSettingActive,
            },
        ]

        : [
            {
                link: "/user/personal",
                linkName: "Personal",
                icon: personal,
                activeIcon: personalActive,
            },
            {
                link: "/user/organisation",
                linkName: "Organisation",
                icon: organisation,
                activeIcon: organisationActive,
            },
            {
                link: "/user/notifications",
                linkName: "Notifications ",
                icon: notifications,
                activeIcon: notificationsActive,
            },
        ]

  return (
      <>
      <User user={user} modalToggle={modalToggle} userMenu={userMenu} windowSizeMobile={windowSizeMobile} location={location}/>

          <Modal modalClassName={style.modal}
              valueLeftBtn={'Cancel'}
              onClickLeftBtn={() => modalToggle(false)}
              valueRightBtn={'Sign out'}
              onClickRightBtn={logOut}
              modalToggle={openModal}
              modalText={'Are you sure you want to sign out?'}/>
      </>
  )

};

const mapStateToProps = state => ({
    windowSizeMobile: windowSizeSelector(state)
});

export default compose( connect(mapStateToProps, {signOut, resetUserAfterSignOut, resetRoomsAfterSignOut}),
    withRouter)(UserContainer);
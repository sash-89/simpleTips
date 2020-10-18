import React from 'react';
import style from './User.module.css'

import UserAvatar from '../../../assets/images/Useravatar.png'
import LogOut from "../../../assets/images/LogOut.png";
import circle from "../../../assets/images/RedSircle.png";
import editIcon from "../../../assets/images/user/edit.png";

import {NavLink} from "react-router-dom";

const User =({user, userMenu, modalToggle, windowSizeMobile, location: {pathname}}) => {

    return (
        <div className={style.userContainer}>
          <div className={style.avatarDiv}>
              <div className={style.avatarWrapper}>
                  <img className={style.avatarIMG} src={UserAvatar} alt={"UserAvatar"}/>

                  <div className={style.edit}>
                      <img src={editIcon} alt={"editIcon"}/>
                  </div>
              </div>

              <h6 className={style.avatarName}>{`${user.nameForProfile ? user.nameForProfile : ""}`}</h6>
          </div>

          <div className={style.bottomDiv}>
            <div className={style.linksWrapper}>
            {userMenu.map((item, i) => {
                const  isActiveLink = (pathname === "/user/change_email" || pathname === "/user/change_phone_number")
                    && (item.linkName === "Personal" || item.linkName === "Organisation & Administrator");

                return (
                <div key={i}>
                    <NavLink className={isActiveLink ? style.activeLink : style.link} activeClassName={style.activeLink} to={item.link}>
                        <img src={!windowSizeMobile && (pathname === item.link || isActiveLink) ? item.activeIcon : item.icon} alt={item.icon}/>
                        <span>{item.linkName}</span>
                    </NavLink>

                    {item.linkName === "Organisation" &&
                        <img className={style.circle} src={circle} alt={"circle"}/>
                    }
                </div>
            )})}
            </div>

            <div onClick={()=>modalToggle(true)} className={style.logOutWrapper}>
              <img src={LogOut} alt={LogOut}/>
              <span className={style.logOut}>Log out</span>
            </div>

          </div>
        </div>
    );

};

export default User;


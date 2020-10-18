import React from 'react';
import backIcon from "../../../assets/images/BackButton.png"
import closeIcon from "../../../assets/images/balance/closeMenu.png"
import style from "./HeaderMB.module.css"
import {NavLink} from "react-router-dom";

const HeaderSecondMB = ({onClick, title, isCloseIcon, headerClassName, role}) => {

  const Link = title === 'Personal' ? '/user' :
               title === 'Organisation' ? '/user' :
               title === 'Notifications' ? '/user' :

               title === 'Replace Employee' ? '/rooms':
               title === 'Attach Employee' ? '/rooms':
               title === 'Add Number' ? '/rooms':
               title === 'Add Range of Numbers' ? '/rooms':
               title === 'Add Recipient' ? '/recipients':
               title === 'Change e-mail' && role === "ADMIN" ? '/user/organisation_and_administrator' :
               title === 'Change e-mail' && role !=="ADMIN" ? '/user/personal' :
               title === 'Change phone' && role ==="ADMIN" ? '/user/organisation_and_administrator' :
               title === 'Change phone' && role !=="ADMIN" ? '/user/personal' :
               title === 'Reviews Setting' ? '/user' :
               title === 'Organisation & Administrator' ? '/user' : null;

  return(
    <div className={style.headerContainer}>
        <header className={[style.headerWrapperSecond, headerClassName].join(" ")}>

          {Link
              ? <NavLink to={Link}>
                  <img className={isCloseIcon ? style.BackIconClose : style.BackIcon}
                       src={isCloseIcon ? closeIcon : backIcon} alt="BackIcon"/>
              </NavLink>

              : <img className={isCloseIcon ? style.BackIconClose : style.BackIcon} src={isCloseIcon ? closeIcon : backIcon}
                     alt="BackIcon" onClick={onClick}/>
          }

          <h2 className={style.secondTitle}>{title}</h2>

        </header>
      </div>
  )};

export default HeaderSecondMB;

import React from 'react';
import {Redirect, withRouter} from "react-router-dom";

const RedirectHomePage = ({location, role}) => {

    const urlUser = ['/user', '/user/notifications', '/user/organisation', '/user/personal', '/user/change_email', '/user/change_phone_number',];

    const urlAdmin = ['/user', '/user/reviews_setting', '/user/organisation_and_administrator', '/user/change_email', '/user/change_phone_number', '/rooms/attach_or_replace_employee', '/recipients/registered_recipient',
        '/recipients/add_new_recipient', '/rooms/add_range_of_numbers', '/rooms/add_number', '/rooms/replace_employee', '/rooms/attach_employee'];

    const isUserRedirect = urlUser.find(url => location.pathname === url)
    const isAdminRedirect = urlAdmin.find(url => location.pathname === url)

    if (role === "ADMIN" && !isAdminRedirect) {
        return <Redirect to={"/rooms"}/>

    } else if (role !== "ADMIN" && !isUserRedirect) {
        return <Redirect to={"/"}/>
    }
    return null
  // else  return <div style={{position: "absolute", height: "calc(100vh - 60px)", background: "white", width: "100%"}}>Page not found</div>
};

export default withRouter(RedirectHomePage)
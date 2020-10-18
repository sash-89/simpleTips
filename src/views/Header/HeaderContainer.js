import React, {Component} from 'react';
import HeaderMB from "./HeaderMobile/HeaderMB";
import {withRouter} from "react-router-dom";
import HeaderSecondMB from "./HeaderMobile/HeaderSecondMB";

class HeaderContainer extends Component {
    render() {
        const {menuToggle, location} = this.props;

        // const Titles =location.pathname === '/personal' ? 'Personal' :
        //     location.pathname === '/organisation' ? 'Organisation' :
        // //         location.pathname === '/notifications' ? 'Notifications' :
        // //             location.pathname === '/change_email' ? 'Change e-mail' :
        //                 // location.pathname === '/change_phone_number' ? 'Change phone' :
        //                 //     location.pathname === '/reviews_setting' ? 'Reviews Setting' :
        //                         // location.pathname === '/replace_employee' ? 'Replace Employee' :
        //                         //     location.pathname === '/attach_employee' ? 'Attach Employee' :
        //                         //         location.pathname === '/add_number' ? 'Add Number' :
        //                         //             location.pathname === '/add_range_of_numbers' ? 'Add Range of Numbers' :
        //                         //                 location.pathname === '/add_new_recipient' ? 'Add Recipient' :
        //                         //                     location.pathname === '/registered_recipient' ? 'Add Recipient':
        //                         //                         location.pathname === '/organisation_and_administrator' ? 'Organisation & Administrator'
        //                         //
        //                                                     null;

        return (
            <>
                <div className={'Mobile'}>
                    {/*{Titles ?*/}
                    {/*    <HeaderSecondMB title ={Titles} />*/}
                    {/*    :*/}
                        <HeaderMB menuToggle={menuToggle} location={location}/>
                </div>
            </>
        );
    }
}

export default withRouter(HeaderContainer);

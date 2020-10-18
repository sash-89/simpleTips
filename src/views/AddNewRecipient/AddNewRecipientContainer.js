import React from 'react';
import AddNewRecipientMB from "./AddNewRecipientComponents/AddNewRecipient";
import Backdrop from "../../components/Backdrop/Backdrop";
import {withRouter} from "react-router-dom";

const AddNewRecipientContainer = ({history}) => {

    return(
        <>
            <AddNewRecipientMB />

            <div className={'Desktop'}>
                <Backdrop choosingTransactionsIsOpen={true} onClick={() => history.push("/recipients")}/>
            </div>
        </>
    )};

export default withRouter(AddNewRecipientContainer);

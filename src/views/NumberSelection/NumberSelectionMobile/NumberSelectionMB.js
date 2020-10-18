import React from 'react';
import style from "./NumberSelection.module.css";
import Tabs from "../../../components/Tabs/Tabs";
import sortModal from "../../../assets/images/balance/menu.png";

const NumberSelectionMB = ({tabs, organisationChoosingModal}) => {
    return (
        <div>
            <div className={style.myOrganisationsHeader}>
                <div className={style.headerTitle}>
                        My organisation
                </div>

                <div className={style.menuWrapper}>

                    <img src={sortModal} alt="menuModal"
                        onClick={organisationChoosingModal}
                    />

                </div>
            </div>

            <Tabs tabs={tabs} tabsContentCls={style.tabsContentCls}/>
        </div>
)

};

export default NumberSelectionMB;
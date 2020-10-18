import React from 'react';
import style from "./Rooms.module.css"
import TabsRooms from "../../../components/Tabs/TabsRooms";
import Tabs from "../../../components/Tabs/Tabs";
import {isIOS} from "../../../utils/validators";

const Rooms = ({tabs, pathname , windowSizeMobile}) => {

    const disableScrollIfIPad = (isIOS && pathname !== "/rooms" && !windowSizeMobile);

    return <div className={style.roomsContainer}>
        <div className={style.under372}>
            <TabsRooms tabs={tabs} underlineCls={style.underlineCls} tabsHeaderCls={style.tabsHeaderCls}
                       tabTittleActiveCls={style.tabTittleActiveCls} tabTittleCls={style.tabTittleCls}/>
        </div>

        <div className={style.after372} style={disableScrollIfIPad ? {overflow: "hidden"} : null}>
                <h5 className={style.title}>
                    Rooms
                </h5>
            <Tabs tabs={tabs} underlineCls={style.underlineCls} tabsHeaderCls={style.tabsHeaderCls}
                  tabTittleActiveCls={style.tabTittleActiveCls} tabTittleCls={style.tabTittleCls}
                  tabsContentCls={style.tabsContentCls} tabsContainerCls={style.tabsContainerCls}/>
        </div>

    </div>
};

export default Rooms;
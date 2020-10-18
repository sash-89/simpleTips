import React, {useState} from 'react';
import style from './Tabs.module.css';

const transitionStyle = `left 200ms, right 200ms`;

const TabsRooms =({tabs, tabsContainerCls, tabsHeaderCls, tabTittleActiveCls, tabTittleCls, underlineCls})=> {

   const [active, changeActive] = useState(0)
   const [css, changeCss] = useState(null)


   const tabsContainer = [ style.tabsContainer, tabsContainerCls ];
   const tabsHeader = [style.tabsHeader, tabsHeaderCls ];
   const tabTittleActive = [style.tabTittleActive, tabTittleActiveCls ];
   const tabTittle = [style.tabTittle, tabTittleCls ];
   const tabsUnderline = [ style.tabsUnderline, underlineCls ];


   const handleClick = (e , i) => {
       let left;
       let width;
       if(i===0){
           left = 5;
           width = 171;
       }else{
          left = 52;
          width = 180;
       }
       changeActive( i );
       changeCss({left, width})
    };

   const getUnderlineStyle =()=>{
        if (css) {
            return {
                left: `${css.left}%`,
                width: `${css.width}px`,
                transition: transitionStyle,
            }
        }
    };


    return (
        <div className={tabsContainer.join(" ")}>

            <div className={tabsHeader.join(" ")}>
                {tabs.map((tab, i) => (
                    <div className={active === i ? tabTittleActive.join(" ") : tabTittle.join(" ")}
                         key={tab.tittle}
                         onClick={ e => handleClick(e, i)}
                    >
                        {tab.tittle}
                    </div>
                ))}
                <div className={tabsUnderline.join(" ")} style={getUnderlineStyle()}/>
            </div>


            <div className={style.tabContent}>
                {tabs[active].component}
            </div>
        </div>
    )


}


export default TabsRooms

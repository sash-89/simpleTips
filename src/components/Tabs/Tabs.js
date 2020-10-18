import React, {useEffect, useRef, useState} from 'react';
import style from './Tabs.module.css';
import {useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";

const transitionStyle = `left 200ms, right 200ms`;

const Tabs =({tabs, tabsContainerCls, tabsHeaderCls, tabTittleActiveCls, tabTittleCls, underlineCls, tabsContentCls})=> {

    const windowSizeMobile = useSelector(state => windowSizeSelector(state));

    const tabRef = useRef(null)
    const [active, changeActive] = useState(0)
    const [size, changeSize] = useState(null)
    const [currentBounds, setCurrentBounds] = useState({})
    const [overflowY, setOverflow] = useState("auto")


    const tabsContainer = [style.tabsContainer, tabsContainerCls];
    const tabsHeader = [style.tabsHeader, tabsHeaderCls];
    const tabTittleActive = [style.tabTittleActive, tabTittleActiveCls];
    const tabTittle = [style.tabTittle, tabTittleCls];
    const tabsUnderline = [style.tabsUnderline, underlineCls];
    const tabsContent = [style.tabContent, tabsContentCls];


    const handleClick = (target, i) => {
        const rootBounds = tabRef.current.getBoundingClientRect();
        const bounds = target.getBoundingClientRect();

        const left = bounds.left - rootBounds.left;
        const right = rootBounds.right - bounds.right;
        changeActive(i);
        changeSize({left, right})
        setCurrentBounds({target, i})
    };

    useEffect(()=>{
        currentBounds.target && handleClick(currentBounds.target, currentBounds.i)
    }, [windowSizeMobile]);

    const getUnderlineStyle = () => {
        if (size) {
            return {
                left: `${size.left}px`,
                right: `${size.right}px`,
                transition: transitionStyle,
                minWidth: "auto",
                maxWidth: "auto",
            }
        }
    };


    return (
        <div className={tabsContainer.join(" ")}>

            <div ref={tabRef} className={tabsHeader.join(" ")}>
                {tabs.map((tab, i) => (
                    <div className={active === i ? tabTittleActive.join(" ") : tabTittle.join(" ")}
                         key={tab.tittle}
                         onClick={(e) => {
                             handleClick(e.target, i)
                         }}
                    >
                        {tab.tittle}
                    </div>
                ))}
                <div className={tabsUnderline.join(" ")} style={getUnderlineStyle()}/>
            </div>


            <div className={tabsContent.join(" ")} >
                {tabs[active].component}
            </div>
        </div>
    )

}


export default Tabs

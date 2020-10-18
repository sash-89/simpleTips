import React, {useEffect, useRef, useState} from 'react';
import { VariableSizeList as List } from 'react-window';
import style from "./Calendar.module.css";

import {Month} from "./Month/Month";


const Calendar = ({firstDate, setFirstDate,  setSecondDate, secondDate, monthName, isChoosingModalClosed}) => {
    const ref = useRef();
    const [calendarWidth, setCalendarWidth]= useState(window.innerWidth < 1024 ? window.innerWidth
       : window.innerWidth > 1920  ? 430 : 412);
    const [calendarHeight, setCalendarHeight]= useState(window.innerHeight-100);

    const calendarSize = ()=>{
        setCalendarWidth(window.innerWidth < 1024 ? window.innerWidth
            : window.innerWidth > 1920 ? 430 : 412)
        setCalendarHeight(window.innerHeight-100)
    };

    useEffect(()=>{
        window.addEventListener("orientationchange" , calendarSize, false);
        window.addEventListener("resize", calendarSize, false);

        return ()=>{
            window.removeEventListener("orientationchange" , calendarSize, false);
            window.removeEventListener("resize", calendarSize, false);
        }

    }, [window.innerWidth, calendarWidth, window.innerHeight, calendarHeight]);

    const weekDaysName= ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let currentDateIndex;
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const calendarArray = [];
    const startYear=2019;
    const endYear=2021;
    let monthArray=[];
    for (let i = startYear; i <= endYear; i++){
        monthArray=[];
        for (let j = 0; j < 12; j++){

            const current = new Date( i, j);

            const next = new Date( i, j + 1);

            const diff =( next - current ) / (1000*3600*24);

            const monthStartIndex = current.getDay();


            const rows = Math.ceil((monthStartIndex + diff) / 7);
            const cols = 7;

            monthArray.push( <Month key={i+j} year={i} month={j} firstDate={firstDate} setFirstDate={setFirstDate}
                                    secondDate={secondDate} setSecondDate={setSecondDate} monthName={monthName}
                                    weekDaysName={weekDaysName} diff={diff} rows={rows} cols={cols} monthStartIndex={monthStartIndex}/>)
        }
        calendarArray.push(monthArray)
    }


    const calendar=[];
    calendarArray.map( cal => {
            return cal.map(c =>{
                return calendar.push(c)
            })
        }
    );

    const CalendarRender = ({ index, style }) => {
        const item = calendar[index];

        return ( <div style={style}>
                {item}
            </div>
        );
    };

    currentDateIndex = calendar.findIndex(arr =>  arr.props.year===currentYear && arr.props.month===currentMonth);

    useEffect(()=>{
        if(!isChoosingModalClosed) ref.current = null
        else if(isChoosingModalClosed) ref.current && ref.current.scrollToItem(currentDateIndex, "start")

    }, [isChoosingModalClosed]);

    const getItemSize = index => calendar[index].props.rows===6 ? 390 : 340;

    return (

        <div className={style.monthList}>

            <List
                height={calendarHeight}
                itemCount={calendar.length}
                itemSize={getItemSize}
                width={calendarWidth}
                ref={ref}
            >
                {CalendarRender}
            </List>

        </div>
    )
};

export default Calendar

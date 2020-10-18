import React from 'react';
import style from "../Calendar.module.css";


export const Month =({year, month, firstDate, setFirstDate,  setSecondDate, secondDate, monthName, weekDaysName, diff, rows, cols, monthStartIndex})=>{

    let monthDays = [];
    let tr=[];
    let k = 1 - monthStartIndex;

    for (let i = 0; i < rows; i++){
        tr = [];
        for (let j = 0; j < cols; j++){
            tr.push(k> 0 && k <= diff ? k : "");
            k++
        }
        monthDays.push(tr)
    }

    const setActiveDays =(day, month, year)=>{
        const currentDate = new Date( firstDate.year, firstDate.month, firstDate.day);
        const nextDate = new Date( year, month, day);

        !firstDate.day
            ? setFirstDate({day, month, year})

            : (currentDate >= nextDate && !(firstDate.day && secondDate.day) )
            ? setFirstDate({day, month, year})

            : firstDate.day && secondDate.day
                ? (()=>{
                    setFirstDate({day, month, year});
                    setSecondDate({day: null, month: null, year: null})
                })()

                : setSecondDate({day, month, year})
    };

    const activeFirstDateCls = [style.activeFirstDate];
    if(secondDate.day) activeFirstDateCls.push(style.activeBefore);

    return(
        <div className={style.calendarContainer}>
            <div className={style.monthName}>{monthName[month]+ " "}{year}</div>
            <div className={style.weekName}>{weekDaysName.map(weekDay=> (<span key={weekDay} className={style.weekDays}>{weekDay}</span>))}</div>

            {monthDays.map(( day, i )=> {
                return <div className={style.month} key={i} >
                    {day.map((d, i)=> <span key={i}
                                            className={firstDate.day === d && firstDate.month=== month && firstDate.year=== year
                                                ? activeFirstDateCls.join(" ")

                                                : secondDate.day === d && secondDate.month=== month && secondDate.year=== year
                                                    ? style.activeSecondDate

                                                    : d > firstDate.day && month === firstDate.month && year === firstDate.year
                                                    && d < secondDate.day && month === secondDate.month && year === secondDate.year
                                                        ? style.activeDays

                                                        : d > firstDate.day && month === firstDate.month
                                                        && secondDate.month !== firstDate.month
                                                        && year === firstDate.year && secondDate.day && d!==""
                                                            ? style.activeDays

                                                            : d < secondDate.day && month === secondDate.month
                                                            && secondDate.month !== firstDate.month
                                                            && year === secondDate.year && firstDate.day && d!==""
                                                                ? style.activeDays

                                                                : month > firstDate.month && month < secondDate.month
                                                                && year === firstDate.year && year === secondDate.year
                                                                && secondDate.day  && d!==""
                                                                    ? style.activeDays

                                                                    : year > firstDate.year && year < secondDate.year
                                                                    && secondDate.day  && d!==""
                                                                        ? style.activeDays

                                                                        : firstDate.year === year && firstDate.month < month
                                                                        && firstDate.year !== secondDate.year
                                                                        && secondDate.day  && d!==""
                                                                            ? style.activeDays

                                                                            : secondDate.year === year  && secondDate.month > month
                                                                            && firstDate.year !== secondDate.year
                                                                            && secondDate.day  && d!==""
                                                                                ? style.activeDays

                                                                                : style.day}
                                            onClick={ ()=>d !== "" && setActiveDays(d, month, year)}
                    >{d === "" ? <span className={style.emptyDay}>&nbsp;</span> : d}</span>)}
                </div>
            })}
            <div className={style.borderBottom}/>
        </div>
    )
};

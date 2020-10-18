import React from 'react';
import style from "./SortSubMenu.module.css";

const SortSubMenu = ({sortItems, selectedSortItem, changeSelectedItem, recipientsChoosingModalToggle}) => {

    const setItem = (item)=>{
        changeSelectedItem(item);
        recipientsChoosingModalToggle([false, null])
    };

    return(
            <div className={style.itemsWrapper}>
                {sortItems.map(item => {
                    return (
                        <div className={selectedSortItem === item.title ? style.activeItem : style.item} onClick={() => setItem(item.title)} key={item.title}>
                           <span className={style.itemTitle}>
                               <img src={selectedSortItem === item.title ? item.iconActive : item.icon} alt={item.title}/>
                               {item.title}
                           </span>
                        </div>
                    )
                })
                }
            </div>
    )};

export default SortSubMenu;
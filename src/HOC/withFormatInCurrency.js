import React from 'react';


export const withFormatInCurrency = (WrappedComponent) =>{
    return (props)=> {
        const formatInCurrency=(numb)=>{
            return  `$${(numb.toString()).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`
        };

        return <WrappedComponent formatInCurrency={formatInCurrency} {...props}/>

    }

};

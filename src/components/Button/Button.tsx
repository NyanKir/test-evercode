import React from "react";
type ButtonProps={
    children:React.ReactNode,
    onClick ?:(e?:any)=>void,
    classStyles?:string
    disabled ?:boolean
}

export const Button = React.memo(({children, onClick,classStyles,disabled}:ButtonProps)=>{
    return(
        <button className={"btn "+classStyles} onClick={onClick} disabled={disabled}>{children}</button>
    )
})
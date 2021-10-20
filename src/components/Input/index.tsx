import React from "react";
type InputProps={
    onChange ?:(e:any)=>void
    classStyles?:string,
    value?:string
}

export const Input = React.memo(({ onChange,classStyles='',value}:InputProps)=>{
    return(
        <input className={"input "+ classStyles} value={value} onChange={onChange}/>
    )
})
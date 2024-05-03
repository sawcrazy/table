import React from "react";
import './styles.css'

export const ButtonShow = (props) =>{
    return (
        <button className={props.active ? 'button_show active' : 'button_show'}
        onClick={()=> props.onClick(props.id)}
        >
            <img src={props.img} alt="IMG"/>
        </button>
    )
}
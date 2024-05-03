import React from 'react';
import './styles.css'

export const ButtonFunction = (props) =>{
    return(
            <button className="button_function" onClick={props.onClick}>
                <img src={props.img} alt="img"/>
                <span className="button_function_text">{props.name}</span>
            </button>
    )
}
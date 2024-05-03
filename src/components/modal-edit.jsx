import React from 'react';
import './styles.css';

export const ModalEdit =(props) => {
    if (!props.open) {
        return null;
    }

    return (
        <div className="modal">
            <div className= "modal_widow">
                <div className="modal_header">
                    <div className="modal_name">
                        {props.title}
                    </div>
                    <button className="modal_button_close" onClick={props.closeModal}>
                        X
                    </button>
                </div>
                {props.children}
                <div className="footer">
                    <button className="footer-button" onClick={props.save}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
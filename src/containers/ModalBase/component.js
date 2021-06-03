import React from 'react';
import './style.scss';

const Modal = ({handleModal, children}) => {
    return (
        <div className="modal-base" onClick={handleModal}>
            <div className="dimmer"></div>
            <div className="modalContainer" onClick={(e)=> e.stopPropagation()}>
                <div className="wrapper">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
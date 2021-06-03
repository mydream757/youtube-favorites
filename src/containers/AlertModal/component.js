import React from 'react';
import './style.scss';

const AlertModal = ({text, onClickOk, onClickCancel}) => {
    return (
        <div className="alert-inner">
            <div className="alert-text">
                <p>{text}</p>
            </div>
            <div className="btn-group">
                    <button type="button" onClick={onClickOk} >확인</button>
                    <button type="button" onClick={onClickCancel}>취소</button>
                </div>
        </div>
    );
};

export default AlertModal;
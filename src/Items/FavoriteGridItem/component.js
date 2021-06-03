import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const FavoriteGridItem = ({favorite, showCheckbox = false, checkboxHandler}) => {
    const {id, name, description, videos} = favorite;
    const [checked, setChecked] = useState(false);
    const inputRef = useRef(null);
    const count = videos.length;

    useEffect(()=>{
        setChecked(false);
    },[showCheckbox]);
    const onChangeCheckbox = (e)=>{
        setChecked(!checked);
        checkboxHandler(e.target.value, e.target.checked);
    };

    const onClickCheckDiv = useCallback((e)=>{
        inputRef.current.click();
        e.preventDefault();
    },[showCheckbox]);
    return (
        <div className="favorite-item">
            {showCheckbox && 
                <div className="favorite-checkbox" onClick={onClickCheckDiv}>
                    <input ref={inputRef} id={id} value={id} type="checkbox" checked={checked} onChange={onChangeCheckbox} />
                    <label for={id}/>
                </div>}
            <Link to={`/favorites/${id}`}>
                <div className="favorite-text">
                    <h3 className="favorite-name">{name}</h3>
                    <p className="favorite-description">{description}</p>
                    <span className="favorite-elemenet-count">{count}/20</span>
                </div>
            </Link>
        </div>
            
    );
};

export default FavoriteGridItem;
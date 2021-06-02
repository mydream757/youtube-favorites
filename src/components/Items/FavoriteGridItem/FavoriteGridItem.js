import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteGridItem.scss';

const FavoriteGridItem = ({favorite, showCheckbox = false, checkboxHandler}) => {
    const {id, name, description, videos} = favorite;
    const [checked, setChecked] = useState(false);
    const count = videos.length;

    useEffect(()=>{
        setChecked(false);
    },[showCheckbox]);
    const onChangeCheckbox = (e)=>{
        setChecked(!checked);
        checkboxHandler(e.target.value, e.target.checked);
    };

    return (
        <div className="favorite-item">
            <Link to={`/favorites/${id}`}>
                <div className="favorite-text">
                    <h3 className="favorite-name">{name}</h3>
                    <p className="favorite-description">{description}</p>
                    <span className="favorite-elemenet-count">{count}/20</span>
                </div>
            </Link>
            {showCheckbox && 
                <div className="favorite-checkbox">
                    <input id={id} value={id} type="checkbox" checked={checked} onChange={onChangeCheckbox} />
                    <label for={id}/>
                </div>}
            </div>
            
    );
};

export default FavoriteGridItem;
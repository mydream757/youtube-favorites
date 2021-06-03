import React, { useState } from 'react';
import './style.scss';

const FavoriteListItem = ({favorite, checkboxHandler}) => {
    const {id, name, videos} = favorite;
    const [checked, setChecked] = useState(false);

    const count = videos.length;

    const onCheckbox = (e)=>{
        if(count === 20){
            e.preventDefault();
        }else{
            setChecked(!checked);
            checkboxHandler(e.target.value, e.target.checked);
        }
    }

    return (
        <div key={id} className={`favorite-list-item ${count === 20 && "full"}`}>
            <input id={id} checked={checked} value={id} type="checkbox" onChange={onCheckbox}/>
            <label for={id}>
                <span className="favorite-name" >{name}</span>
                <span className="favorite-element-count">{count}/20</span>
            </label>
        </div>
    );
};

export default FavoriteListItem;
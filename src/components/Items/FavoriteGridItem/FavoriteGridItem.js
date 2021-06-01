import React from 'react';
import './FavoriteGridItem.scss';

const FavoriteGridItem = ({favorite}) => {
    const {name, description, count} = favorite;
    return (
        <div className="favorite-item">
            <h3 className="favorite-name">{name}</h3>
            <p className="favorite-description">{description}</p>
            <span className="favorite-elemenet-count">{count}/20</span>
        </div>
    );
};

export default FavoriteGridItem;
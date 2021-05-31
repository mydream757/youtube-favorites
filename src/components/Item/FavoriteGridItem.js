import React from 'react';

const FavoriteGridItem = ({favorite}) => {
    const {name, description, count} = favorite;
    console.log('favorite grid', favorite);
    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="grid-container">
                <span>{count}/20</span>
            </div>
        </div>
    );
};

export default FavoriteGridItem;
import React from 'react';
import { Route } from 'react-router';
import FavoriteDetail from './containers/FavoriteDetail/FavoriteDetail';
import Favorites from './containers/Favorites/Favorites';

const FavoriteRouter = () => {
    return (
        <div>
            <Route exact path="/favorites" component={Favorites}/>
            <Route path="/favorites/:favorite_id" component={FavoriteDetail} />
        </div>
    );
};

export default FavoriteRouter;
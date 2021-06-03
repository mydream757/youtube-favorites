import React from 'react';
import { Route } from 'react-router';
import FavoriteDetail from 'src/routes/FavoriteDetail/component';
import Favorites from 'src/routes/Favorites/component';

const FavoriteRouter = () => {
    return (
        <div>
            <Route exact path="/favorites" component={Favorites}/>
            <Route path="/favorites/:favorite_id" component={FavoriteDetail} />
        </div>
    );
};

export default FavoriteRouter;
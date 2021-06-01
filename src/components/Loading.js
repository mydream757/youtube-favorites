import React from 'react';
import './Loading.scss';

const Loading = ({isLoading}) => {
    return (
        <div id="loading-wrap">
            <div id="loading">{isLoading && "Loading..."}</div>
        </div>
    );
};

export default Loading;
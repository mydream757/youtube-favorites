import React from 'react';
import './FavoriteDetail.scss';
import VideoGridContainer from '../VideoGridContainer/VideoGridContainer';
import VideoGridItem from 'src/components/Items/VideoGridItem/VideoGridItem';

const FavoriteDetail = () => {
    const videos = [];
    return (
        <div className="favorite-detail-template">
            <div className="favorite-title">

            </div>
            <div className="btn-group"></div>
            <div className="video-grid-container">
                {videos.map(video=>(
                <VideoGridItem
                    video={video}
                />
                ))}
            </div>
        </div>
    );
};

export default FavoriteDetail;
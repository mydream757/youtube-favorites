import React from 'react';
import './VideoGridItem.scss';

const VideoGridItem = ({video, onClickItem}) => {
    const {video_id, title, thumbnail, published_at} = video;
    return (
        <a className="video-anchor" target="_blank" href={`https://youtube.com/watch?v=${video_id}`}>
            <div className="video-item" >
                <div className="video-thumbnail-wrap">
                    <img 
                        src={thumbnail}
                    />
                </div>
                <div className="mouse-overlay">
                    
                </div>
                
                <div className="video-title" title={title}>
                    <b>{title}</b>
                </div>
                <div className="video-published">
                    <p>생성일: {published_at}</p>
                </div>
                <button className="add-btn" onClick={(e)=>{e.preventDefault(); console.log('hello'); }}>추가</button>
                
            </div>
        </a>
        
    );
};

export default VideoGridItem;
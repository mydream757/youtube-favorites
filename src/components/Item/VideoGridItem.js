import React from 'react';
import './VideoGridItem.scss';

const VideoGridItem = ({video, onClickItem}) => {
    const {video_id, title, thumbnail, published_at} = video;
    return (
        <a className="video-anchor" target="_blank" href={`https://youtube.com/watch?v=${video_id}`}>
            <div className="video-item" >
                <div>
                    <img 
                        className="thumbnail"
                        alt="이미지 표시 불가"
                        src={thumbnail}
                    />
                </div>
                <div className="mouse-overlay">
                    
                </div>
                <button className="add-btn" onClick={(e)=>{e.preventDefault(); console.log('hello'); }}>추가</button>
                
                <div className="title">
                    <a>{title}</a>
                </div>
                <div className="published">
                    생성일: <p>{published_at}</p>
                </div>
            </div>
        </a>
        
    );
};

export default VideoGridItem;
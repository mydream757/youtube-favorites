import React, { useState, useCallback, useEffect, useRef } from 'react';
import './style.scss';

const VideoGridItem = ({video, showCheckbox = false, checkBoxHandler}) => {
    const {video_id, title, thumbnail, published_at} = video;
    const [checked, setChecked] = useState(false);
    const inputRef = useRef(null);
    
    useEffect(()=>{
        setChecked(false);
    },[showCheckbox]);
    const onChangeCheckbox = (e)=>{
        setChecked(!checked);
        checkBoxHandler(e.target.value, e.target.checked);
    };

    const onClickCheckDiv = useCallback((e)=>{
        inputRef.current.click();
        e.preventDefault();
    },[showCheckbox]);

    return (
        <a className="video-anchor" key={video_id} target="_blank" href={`https://youtube.com/watch?v=${video_id}`}>
            <div className="video-item" >
                {showCheckbox && 
                <div className="video-checkbox" onClick={onClickCheckDiv} >
                    <input ref={inputRef} id={video_id} value={video_id} type="checkbox" checked={checked} onChange={(e)=>onChangeCheckbox(e)} />
                    <label  for={video_id} />
                </div>}
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
            </div>
        </a>
        
    );
};

export default VideoGridItem;
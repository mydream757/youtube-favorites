import React, { useState, useRef, useEffect } from 'react';
import VideoGridItem from '../../Item/VideoGridItem/VideoGridItem';
import './Home.scss';
import VideoData from '../../../_video_list.json';
import Loading from '../../Loading';

const fakeFetch = (delay = 1000) => new Promise(res=>setTimeout(res,delay));

const Home = () => {
    const LOADNUM = 100;
    const MAX_LENGTH = VideoData.length;
    const [state, setState] = useState({ videos: [], isLoading: false});
    const { videos, isLoading } = state;
    const nextCount = useRef(0);

    const fetchVideos = async ()=>{
        setState(prev=>({...prev, isLoading: true}));
        await fakeFetch();
        setState(prev => ({
            videos : prev.videos.concat(VideoData.slice(nextCount.current, nextCount.current + LOADNUM)),
            isLoading : false
        }));
        nextCount.current += LOADNUM;
    }

    
    useEffect(()=>{
        fetchVideos();
    }, []);

    const onIntersect = async ([entry], observer) => {
        if(entry.isIntersecting){
            observer.unobserve(entry.target);
            await fetchVideos();
            observer.observe(entry.target);
        }
    }
    /** 초기 아이템 로딩과 인터섹션이 같이 일어나는 것을 해결하기 위해
     *  Ref가 붙었을 대, 떼어졌을 때 무언가 업데이트할 수 있도록 리액트에서 제시하는 방법은
     *  Ref를 callback으로 사용하는 것
     *  출처: https://godsenal.com/posts/React-Intersection-Observer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
     */
    const [target, setTarget] = useState(null);

    /* 옵저버 등록 */
    useEffect(() => {
        /* 기존의 방법
        const observer = new IntersectionObserver(onIntersect, { threshold: 0.9 });
        observer.observe(target.current);
        return () => observer.disconnect(); */
        let observer;
        if(target!==null){
            observer = new IntersectionObserver(onIntersect, { threshold: 0.5});
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);
    
    return (
        <div className="video-grid-container">
            {videos.map(video=>(
            <VideoGridItem 
                key={video.video_id}
                video={video}
            />
            ))}
            <div ref={setTarget}/>
            <Loading isLoading={isLoading}/>
        </div>
        
    );
};

export default Home;
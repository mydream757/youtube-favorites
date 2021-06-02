import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Home.scss';
import VideoData from 'src/_video_list.json';
import Loading from 'src/components/Loading/Loading';
import ModalBase from 'src/components/containers/ModalBase/ModalBase';
import FavListModal from '../FavListModal/FavListModal';
import { fakeFetch } from 'src/components/Utils';
import VideoGridItem from 'src/components/Items/VideoGridItem/VideoGridItem';

const Home = () => {
    const LOADNUM = 20;
    const MAX_LENGTH = VideoData.length;
    const [state, setState] = useState({ videos: [], isLoading: false, isSelectMode : false, isAddModalOn : false, isAddBtnOn : false});
    const { videos, isLoading, isSelectMode, isAddModalOn } = state;
    const [checkedList, setCheckedList] = useState([]);
    const [target, setTarget] = useState(null);
    const refSwitch = useRef(null);
    const nextCount = useRef(0);

    useEffect(()=>{
        fetchVideos();
    }, []);

    const fetchVideos = async ()=>{
        setState(prev=>({...prev, isLoading: true}));
        await fakeFetch();
        setState(prev => ({
            ...prev,
            videos : prev.videos.concat(VideoData.slice(nextCount.current, nextCount.current + LOADNUM)),
            isLoading : false
        }));
        nextCount.current += LOADNUM;
    }

    const onIntersect = async ([entry], observer) => {
        if(entry.isIntersecting){
            observer.unobserve(entry.target);
            await fetchVideos();
            observer.observe(entry.target);
        }
    }

    const checkedItemHandler = useCallback((id, isChecked)=>{
        if(isChecked){
            setCheckedList(checkedList.concat([id]));
        }else if(!isChecked && checkedList.includes(id)) {
            setCheckedList(checkedList.filter(item=>item!==id));
        }
    },[checkedList]);

    const switchMode = useCallback(()=>{
        refSwitch.current.classList.toggle('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : !prev.isSelectMode 
        }));
        setCheckedList([]);
    },[]);

    const handleModal = useCallback(()=>{
        setState((prev)=>({...prev, isAddModalOn : !prev.isAddModalOn}));
    }, []);
    

    /** 초기 아이템 로딩과 인터섹션이 같이 일어나는 것을 해결하기 위해
     *  Ref가 붙었을 대, 떼어졌을 때 무언가 업데이트할 수 있도록 리액트에서 제시하는 방법은
     *  Ref를 callback으로 사용하는 것
     *  출처: https://godsenal.com/posts/React-Intersection-Observer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
     */
    

    /* 옵저버 등록 */
    useEffect(() => {
        let observer;
        if(target!==null){
            observer = new IntersectionObserver(onIntersect, { threshold: 0.5});
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);
    
    return (
        <div class="home-template">
            <div className="btn-group">
                <button id="edit-btn" ref={refSwitch} onClick={switchMode}>선택 모드</button>
                {checkedList.length > 0 && <button id="add-btn" onClick={handleModal}>추가</button>}
            </div>
            <div className="video-grid-container">
                {videos.map(video=>(
                <VideoGridItem 
                    key={video.video_id}
                    video={video}
                    showCheckbox={isSelectMode}
                    checkBoxHandler={checkedItemHandler}
                />
                ))}
            </div>
            <div ref={setTarget}/>
            {isLoading && <Loading/>}
            {isAddModalOn && 
                <ModalBase handleModal={handleModal}>
                    <FavListModal videos={checkedList} switchMode={switchMode} handleModal={handleModal} />
                </ModalBase>
            }
        </div>
    );
};

export default Home;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.scss';
import VideoData from 'src/_video_list.json';
import Loading from 'src/Loading/component';
import ModalBase from 'src/containers/ModalBase/component';
import FavListModal from 'src/containers/FavListModal/component';
import { LOADNUM, fakeFetch } from 'src/Utils';
import VideoGridItem from 'src/Items/VideoGridItem/component';

const Home = () => {
    
    const [state, setState] = useState({ videos: [], checkedList : [], isLoading: false, isSelectMode : false, isAddModalOn : false, isAddBtnOn : false});
    const { videos, isLoading, isSelectMode, isAddModalOn, checkedList } = state;
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
            setState((prev)=>({
                ...prev,
                checkedList : prev.checkedList.concat([id])
            }))
        }else if(!isChecked && checkedList.includes(id)) {
            setState((prev)=>({
                ...prev,
                checkedList : prev.checkedList.filter(item=>item!==id)
            }))
        }
    },[checkedList]);

    const switchMode = useCallback(()=>{
        refSwitch.current.classList.toggle('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : !prev.isSelectMode,
            checkedList : []
        }));
    },[checkedList]);

    const handleModal = useCallback(()=>{
        setState((prev)=>({...prev, isAddModalOn : !prev.isAddModalOn}));
    }, []);
    

    /** ?????? ????????? ????????? ??????????????? ?????? ???????????? ?????? ???????????? ??????
     *  Ref??? ????????? ???, ???????????? ??? ????????? ??????????????? ??? ????????? ??????????????? ???????????? ?????????
     *  Ref??? callback?????? ???????????? ???
     *  ??????: https://godsenal.com/posts/React-Intersection-Observer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/
     */
    

    /* ????????? ?????? */
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
                <button id="edit-btn" ref={refSwitch} onClick={switchMode}>?????? ??????</button>
                {checkedList.length > 0 && <button id="add-btn" onClick={handleModal}>??????</button>}
            </div>
            <div className="video-grid-container">
                {videos.map(video=>(
                <VideoGridItem 
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
import React, { useEffect, useState, useCallback, useRef } from 'react';
import './style.scss';
import VideoGridItem from 'src/Items/VideoGridItem/component';
import { DELETE_ALERT_TEXT, fakeFetch, findTargetFavoriteIndex, getFavoriteList, MAX_FAV_TITLE, toastPopup } from 'src/Utils';
import VideoData from 'src/_video_list.json';
import Loading from 'src/Loading/component';
import ModalBase from 'src/containers/ModalBase/component';
import AlertModal from 'src/containers/AlertModal/component';

const FavoriteDetail = ({match}) => {
    const [state, setState] = useState({ fav_title : "", isNoVideo : false, input_title : "", videos: [], checkedList : [], isLoading: true, isNoMatchFav : false, isModalOn : false, isSelectMode : false});
    const { fav_title, input_title, videos, isLoading, isModalOn, isSelectMode, isNoMatchFav, checkedList,isNoVideo } = state;
    const favorite_id = useRef(null);
    const refSwitch = useRef(null);
    const modalInner = useRef(null);

    const fetchVideos = useCallback(async ()=>{
        await fakeFetch();
        const fav_list = getFavoriteList();
        const index = findTargetFavoriteIndex(favorite_id.current);

        if(index === undefined){
            setState((prev)=>({
                ...prev,
                isLoading : false,
                isNoMatchFav : true
            }));
        }else{
            /* search video data */
            const targetFav = fav_list[index];
            
            let video_ids = targetFav.videos;
            let resultArray = [];

            while(video_ids.length !== 0){
                const searchedItem = VideoData.find((item)=> video_ids.includes(item.video_id))
                if(searchedItem === undefined){
                    break;       
                }else{
                    video_ids = video_ids.filter(item => searchedItem.video_id !== item);
                    resultArray.push(searchedItem);
                }
            }

            setState((prev)=>({
                ...prev,
                isLoading : false,
                videos : resultArray,
                fav_title : targetFav.name,
                isNoVideo : resultArray.length === 0
            }));
        }
    }, [])
    useEffect( (e)=>{
        favorite_id.current = match.params.favorite_id;
        fetchVideos();
    },[]);

    const checkedItemHandler = useCallback((id, isChecked)=>{
        if(isChecked){
            setState((prev)=>({
                ...prev,
                checkedList : checkedList.concat([id])
            }));
        }else if(!isChecked && checkedList.includes(id)) {
            setState((prev)=>({
                ...prev,
                checkedList : checkedList.filter(item=>item!==id)
            }))
        }
    },[checkedList]);

    const switchMode = useCallback(()=>{
        refSwitch.current.classList.toggle('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : !prev.isSelectMode,
            checkedList : [],
            input_title : fav_title
        }));
    },[fav_title, input_title]);

    const toggleModal = (e)=>{
        setState((prev)=>({...prev, isModalOn : !prev.isModalOn}));
        if(e!==undefined){
            switch(e.target.id){
                case 'del-btn':
                    const alertText = DELETE_ALERT_TEXT;
                    modalInner.current = <AlertModal text={alertText} onClickOk={deleteVideos} onClickCancel={toggleModal} />
                    break;
                default:
                    modalInner.current = null;
                    break;
            }
        }
    };

    const deleteVideos = useCallback(async ()=>{
        await fakeFetch();
        let fav_list = getFavoriteList();
        const index = findTargetFavoriteIndex(favorite_id.current)
        if(index === undefined){
            setState((prev)=>({
                ...prev,
                isLoading : false,
                isNoMatchFav : true
            }));
            switchMode();
            toggleModal();
        }else{
            /* search video data */
            let video_ids = fav_list[index].videos;
            console.log('video_ids:', video_ids);
            let result = video_ids.filter((video_id)=> !checkedList.includes(video_id));
            fav_list[index].videos = result;
            localStorage.setItem('favorite_list', JSON.stringify(fav_list));
            await fetchVideos();
            switchMode();
            toggleModal();
            toastPopup("선택한 비디오들이 즐겨찾기에서 제외되었습니다.", 3000);
        }
    },[checkedList]);

    const onChangeInput = useCallback((e)=>{
        setState((prev)=>({
            ...prev,
            input_title : e.target.value
        }))
    }, []);
    const onClickChangeTitle = useCallback(async(e)=>{
        await fakeFetch();
        let fav_list = getFavoriteList();
        const index = findTargetFavoriteIndex(favorite_id.current)
        if(index === undefined){
            setState((prev)=>({
                ...prev,
                isLoading : false,
                isNoMatchFav : true
            }));
        }else{
            /* search video data */
            console.log('input_title?', input_title);
            fav_list[index].name = input_title;
            localStorage.setItem('favorite_list', JSON.stringify(fav_list));
            setState((prev)=>({
                ...prev,
                fav_title : input_title
            }))
            //fetchVideos();
        }
        switchMode();
        toastPopup("즐겨찾기의 이름이 변경되었습니다.", 3000);

    }, [input_title]);
    
    return (
        <div className="favorite-detail-template">
            <div className="title-area">
              
                {isNoMatchFav ? <div>해당 즐겨찾기가 존재하지 않습니다.</div> : 
                    <div className="fav-title">
                        {isSelectMode ? <input type="text" value={input_title} maxLength={MAX_FAV_TITLE} onChange={onChangeInput}/> : <span>{fav_title}</span>}
                        {isSelectMode && <button id="edit-title-btn" onClick={onClickChangeTitle}>변경</button>}
              
                    </div>
                }
                
            </div>
            <div className="btn-group">
                <button id="edit-btn" ref={refSwitch} onClick={switchMode} >편집 모드</button>
                {checkedList.length > 0 && <button id="del-btn" onClick={toggleModal}>삭제</button>}
            </div>
            <div className="video-grid-container">
                {isNoVideo && <div className="noti-text"> 비디오가 존재하지 않습니다. </div>}
                {videos.map(video=>(
                <VideoGridItem
                    video={video}
                    showCheckbox={isSelectMode}
                    checkBoxHandler={checkedItemHandler}
                />
                ))}
            </div>
            {isLoading && <Loading/>}
            {isModalOn && 
            <ModalBase handleModal={toggleModal}>
                {modalInner.current}
            </ModalBase>}
            
        </div>
    );
};

export default FavoriteDetail;
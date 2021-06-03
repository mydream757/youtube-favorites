import React, { useCallback, useEffect, useState } from 'react';
import './style.scss';
import { fakeFetch, getFavoriteList, toastPopup } from 'src/Utils';
import FavoriteListItem from 'src/Items/FavoriteListItem/component';


const FavListModal = ({handleModal, videos, switchMode}) => {
    const [favorite_list, setFavoriteList] = useState([]);
    const [checkedList, setCheckedList] = useState([]);

    const fetchFavoriteList = async ()=>{
        await fakeFetch();
        setFavoriteList(getFavoriteList());
    }
    useEffect(()=>{
        fetchFavoriteList();
    },[]);

    const checkboxHandler = useCallback((id, isChecked)=>{
        if(isChecked){
            setCheckedList(checkedList.concat([id]));
        }else if(checkedList.includes(id) && !isChecked){
            setCheckedList(checkedList.filter(item=>item!==id));
        }
    },[checkedList]);

    const addVideosToFavorites = async ()=>{
        //find favorite
        const fav_list = getFavoriteList();
        const result = fav_list.map((item)=>{
            if(checkedList.includes(item.id)){
                let alreadyIncludedVideoSet = new Set(item.videos);
                for(let video of videos){
                    alreadyIncludedVideoSet.add(video);
                    if(alreadyIncludedVideoSet.size >= 20) break;
                } 
                item.videos = [...alreadyIncludedVideoSet];
            }
            return item;
        });
        await fakeFetch();
        localStorage.setItem('favorite_list', JSON.stringify(result));
        toastPopup("즐겨찾기에 선택 항목들이 추가되었습니다.", 3000);
        handleModal();
        switchMode();
    }
    return (
        <div className="fav-list-inner">
            <h2>즐겨찾기 선택</h2>
            <div className="noti-text">
                <p>비디오들을 즐겨찾기 목록들에 중복 없이 추가합니다. 즐겨찾기는 최대 20개의 비디오만 저장할 수 있습니다. </p>
            </div>
            <div className="fav-list-container">
                {favorite_list.map((item)=>(
                    <FavoriteListItem favorite={item} checkboxHandler={checkboxHandler} />))}
            </div>
            <div className="btn-group">
                <button type="button" onClick={addVideosToFavorites} >확인</button>
                <button type="button" onClick={handleModal} >취소</button>
            </div>
        </div>
    );
};

export default FavListModal;
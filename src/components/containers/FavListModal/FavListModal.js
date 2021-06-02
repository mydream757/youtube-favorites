import React, { useCallback, useEffect, useState } from 'react';
import './FavListModal.scss';
import { fakeFetch, getFavoriteList } from 'src/components/Utils';
import FavoriteListItem from 'src/components/Items/FavoriteListItem/FavoriteListItem';


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
        console.log('id?', id, isChecked)
        if(isChecked){
            setCheckedList(checkedList.concat([id]));
        }else if(checkedList.has(id) && !isChecked){
            checkedList.delete(id);
            setCheckedList(checkedList.filter(item=>item!==id));
        }
    },[checkedList]);

    const addVideosToFavorites = ()=>{
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

        localStorage.setItem('favorite_list', JSON.stringify(result));
        handleModal();
        switchMode();
        
    }
    return (
        <div className="fav-list-inner">
            <h2>즐겨찾기 선택</h2>
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
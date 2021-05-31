import React, { useState, useEffect, useCallback } from 'react';
import './Favorite.scss';
import FavoriteGridItem from '../Item/FavoriteGridItem';
import ModalBase from './ModalBase';
import FavGenModal from './FavGenModal';

const fakeFetch = (delay = 1000) => new Promise(res=>setTimeout(res,delay));

const Favorites = () => {

    const [state, setState] = useState({ favorite_list: [], isLoading: false, isModalOn : false});
    const { favorite_list, isLoading, isModalOn } = state;

    const fetchFavoriteList = async ()=>{
        setState((prev)=>({...prev, isLoading: true}));
        await fakeFetch();
        setState((prev)=>({
            ...prev,
            favorite_list : getLocalList(),
            isLoading : false    
        }));

    }
    const getLocalList = () =>{
        const data = JSON.parse(localStorage.getItem("favorite_list"));
        return data == null ? [] : data;
    } 

    /* 초기 데이터 세팅 */
    useEffect(()=>{
        fetchFavoriteList();
    },[]);

    const handleModal = useCallback((e)=>{
        setState((prev)=>({...prev, isModalOn: !prev.isModalOn}));
    },[]);

    const generateFav = useCallback((data)=>{
        const nextData = getLocalList().concat(data);
        console.log('whatData?', nextData);
        localStorage.setItem("favorite_list", JSON.stringify(nextData))
        handleModal();
        fetchFavoriteList();
    }, []);

    return (
        <div>
            <div>
                <button className="gen-btn" onClick={handleModal}>생성</button>
                <button className="edit-btn">편집</button>
                <button className="del-btn">삭제</button>
            </div>
            <hr/>
            <div className="grid-container">
                {favorite_list.map((item)=>(
                    <FavoriteGridItem 
                        favorite={item}
                    />
                ))}
                <div className="loading">
                {isLoading && "Loading..."}
            </div>
            </div>
            {isModalOn && 
                <ModalBase handleModal={handleModal}>
                    <FavGenModal handleOk={generateFav} handleCancel={handleModal} />
                </ModalBase>}
        </div>
    );
};

export default Favorites;
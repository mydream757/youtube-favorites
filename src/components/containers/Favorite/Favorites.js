import React, { useState, useEffect, useCallback } from 'react';
import './Favorite.scss';
import FavoriteGridItem from '../Item/FavoriteGridItem';
import ModalBase from './ModalBase/ModalBase';
import FavGenModal from './FavGenModal/FavGenModal';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

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
        localStorage.setItem("favorite_list", JSON.stringify(nextData))
        handleModal();
        fetchFavoriteList();
    }, []);

    return (
        <div className="favorite-template">
            <div className="btn-group">
                <button id="gen-btn" onClick={handleModal}>생성</button>
                <button id="edit-btn">편집</button>
                <button id="sum-btn">합치기</button>
                <button id="del-btn">삭제</button>
            </div>
            <div className="favorite-grid-container">
                {favorite_list.map((item)=>(
                    <Link>
                    <FavoriteGridItem favorite={item}></FavoriteGridItem>
                    </Link>
                ))}
                <Loading isLoading={isLoading}/>
            </div>
            {isModalOn && 
                <ModalBase handleModal={handleModal}>
                    <FavGenModal handleOk={generateFav} handleCancel={handleModal} />
                </ModalBase>}
        </div>
    );
};

export default Favorites;
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.scss';
import FavoriteGridItem from 'src/Items/FavoriteGridItem/component';
import ModalBase from 'src/containers/ModalBase/component';
import FavGenModal from 'src/containers/FavGenModal/component';
import AlertModal from 'src/containers/AlertModal/component';
import Loading from 'src/Loading/component';
import { DELETE_ALERT_TEXT, fakeFetch, getFavoriteList, toastPopup } from 'src/Utils';

const Favorites = () => {

    const [state, setState] = useState({ favorite_list: [], checkedList : [], isLoading: false, isModalOn : false, isSelectMode : false, isNoData : false});
    const { favorite_list, isLoading, isModalOn, isSelectMode, checkedList, isNoData } = state;
    const refSwitch = useRef(null);
    const modalInner = useRef(null);

    const fetchFavoriteList = async ()=>{
        setState((prev)=>({...prev, isLoading: true}));
        await fakeFetch();
        const data = getFavoriteList();
        setState((prev)=>({
            ...prev,
            favorite_list : data,
            isLoading : false,
            isNoData : data.length === 0 
        }));
    }
     

    /* 초기 데이터 세팅 */
    useEffect(()=>{
        fetchFavoriteList();
    },[]);

    const toggleModal = (e)=>{
        setState((prev)=>({...prev, isModalOn: !prev.isModalOn}));
        if(e!==undefined){
            switch(e.target.id){
                case 'gen-btn':
                case 'sum-btn':
                    modalInner.current = <FavGenModal handleOk={generateFav} toggleModal={toggleModal} checkedList={checkedList}/>
                    break;
                case 'del-btn':
                    const alertText = DELETE_ALERT_TEXT;
                    modalInner.current = <AlertModal text={alertText} onClickOk={deleteFavorites} onClickCancel={toggleModal} />
                    break;
                default:
                    modalInner.current = null;
                    break;
            }
        }
    };

    const generateFav = useCallback(async (data)=>{
        const nextData = getFavoriteList().concat(data);
        localStorage.setItem("favorite_list", JSON.stringify(nextData))
        refSwitch.current.classList.remove('active');
        await fetchFavoriteList();
        setState((prev)=>({
            ...prev,
            isSelectMode : false,
            checkedList : [] 
        }));
        toggleModal();
        toastPopup("즐겨찾기가 생성되었습니다.", 3000);
    }, [checkedList]);

    const switchMode = useCallback(()=>{
        refSwitch.current.classList.toggle('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : !prev.isSelectMode,
            checkedList : []
        }));
    },[checkedList]);

    const checkedItemHandler = useCallback((id, isChecked)=>{
        if(isChecked){
            setState((prev)=>({
                ...prev,
                checkedList : prev.checkedList.concat([id])
            }));
        }else if(!isChecked && checkedList.includes(id)) {
            setState((prev)=>({
                ...prev,
                checkedList : prev.checkedList.filter(item=>item!==id)
            }));
        }
    },[checkedList]);

    const deleteFavorites = useCallback(async ()=>{
        const fav_list = getFavoriteList();
        const result = fav_list.filter((item)=>!checkedList.includes(item.id));
        localStorage.setItem('favorite_list', JSON.stringify(result));
        await fetchFavoriteList();
        toggleModal();
        switchMode();
        toastPopup("선택한 즐겨찾기들이 삭제되었습니다.", 3000);
    }, [checkedList]);


    console.log('favorite_list', favorite_list, favorite_list.length);
    return (
        <div className="favorite-template">
            <div className="btn-group">
                {!isSelectMode && <button id="gen-btn" onClick={toggleModal}>생성</button>}
                <button id="edit-btn" ref={refSwitch} onClick={switchMode}>선택 모드</button>
                {checkedList.length > 1 && <button id="sum-btn" onClick={toggleModal}>합치기</button> }
                {checkedList.length > 0 && <button id="del-btn" onClick={toggleModal}>삭제</button> }
            </div>
            <div className="favorite-grid-container">
                {isNoData && <div className="noti-text"> 즐겨찾기가 존재하지 않습니다. </div>}
                {favorite_list.map((item)=>(
                    <FavoriteGridItem favorite={item} showCheckbox={isSelectMode} checkboxHandler={checkedItemHandler} />
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

export default Favorites;
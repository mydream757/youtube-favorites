import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './Favorites.scss';
import FavoriteGridItem from 'src/components/Items/FavoriteGridItem/FavoriteGridItem';
import ModalBase from 'src/components/containers/ModalBase/ModalBase';
import FavGenModal from 'src/components/containers/FavGenModal/FavGenModal';
import Loading from 'src/components/Loading/Loading';
import { fakeFetch, getFavoriteList } from 'src/components/Utils';

const Favorites = () => {

    const [state, setState] = useState({ favorite_list: [], isLoading: false, isModalOn : false, isSelectMode : false});
    const { favorite_list, isLoading, isModalOn, isSelectMode } = state;
    const [checkedList, setCheckedList] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const refSwitch = useRef(null);

    const fetchFavoriteList = async ()=>{
        setState((prev)=>({...prev, isLoading: true}));
        await fakeFetch();
        setState((prev)=>({
            ...prev,
            favorite_list : getFavoriteList(),
            isLoading : false    
        }));
    }
     

    /* 초기 데이터 세팅 */
    useEffect(()=>{
        fetchFavoriteList();
    },[]);
    const toggleModal = useCallback(()=>{
        setState((prev)=>({...prev, isModalOn: !prev.isModalOn}));
    })

    const handleModal = useCallback((e)=>{
        toggleModal();
        let title = '';
        switch(e.target.id){
            case 'gen-btn':
                title = '새로운 즐겨찾기 생성';
                break;
            case 'sum-btn':
                title = '즐겨찾기 합치기';
                break;
            default:
                break;
        }
        setModalTitle(title);
    },[]);

    const generateFav = useCallback((data)=>{
        const nextData = getFavoriteList().concat(data);
        localStorage.setItem("favorite_list", JSON.stringify(nextData))
        toggleModal();
        refSwitch.current.classList.remove('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : false 
        }));
        setCheckedList([]);
        fetchFavoriteList();
    }, []);

    const switchMode = useCallback(()=>{
        refSwitch.current.classList.toggle('active');
        setState((prev)=>({
            ...prev,
            isSelectMode : !prev.isSelectMode 
        }));
        setCheckedList([]);
    },[]);

    const checkedItemHandler = useCallback((id, isChecked)=>{
        if(isChecked){
            setCheckedList(checkedList.concat([id]));
        }else if(!isChecked && checkedList.includes(id)) {
            setCheckedList(checkedList.filter(item=>item!==id));
        }
    },[checkedList]);

    const deleteFavorites = ()=>{
        const fav_list = getFavoriteList();
        const result = fav_list.filter((item)=>!checkedList.includes(item.id));
        localStorage.setItem('favorite_list', JSON.stringify(result));
        fetchFavoriteList();
        switchMode();
    }
    console.log('checkItem', checkedList);


    return (
        <div className="favorite-template">
            <div className="btn-group">
                <button id="gen-btn" onClick={handleModal}>생성</button>
                <button id="edit-btn" ref={refSwitch} onClick={switchMode}>선택 모드</button>
                {checkedList.length > 1 && <button id="sum-btn" onClick={handleModal}>합치기</button> }
                {checkedList.length > 0 && <button id="del-btn" onClick={deleteFavorites}>삭제</button> }
            </div>
            <div className="favorite-grid-container">
                {favorite_list.map((item)=>(
                    <FavoriteGridItem favorite={item} showCheckbox={isSelectMode} checkboxHandler={checkedItemHandler} />
                ))}
            </div>
            {isLoading && <Loading/>}
            {isModalOn && 
                <ModalBase handleModal={toggleModal}>
                    <FavGenModal title={modalTitle} handleOk={generateFav} toggleModal={toggleModal} checkedList={checkedList}/>
                </ModalBase>}
        </div>
    );
};

export default Favorites;
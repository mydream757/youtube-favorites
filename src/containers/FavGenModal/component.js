import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getFavoriteList,MAX_FAV_TITLE } from 'src/Utils';
import './style.scss';

const FavGenModal = ({ handleOk, toggleModal, checkedList = [] }) => {
    const [isErr, setError] = useState(false);
    const name = useRef(null);
    const description = useRef(null);
    const isGenModal = checkedList.length === 0

    useEffect(()=>{
        name.current.focus();
    }, []);

    const handleGenerate = useCallback((e)=>{
        
        if(name.current.value.trim().length > 0){
            let videos;
            if(checkedList.length === 0){
                videos = [];
            }else{
                videos = new Set();
                const fav_list = getFavoriteList();
                
                fav_list.forEach((item)=>{
                    if(checkedList.includes(item.id)){
                        for(let i=0; i<item.videos.length; i++){
                            if(videos.size < 20) videos.add(item.videos[i]);
                            else break;
                        }
                    }
                });
                videos = [...videos];
            }
            handleOk([{
                id : Math.floor(Math.random() * 1000000).toString(),
                name : name.current.value,
                description : description.current.value,
                videos : videos
            }])
        }else{
            setError(true);
        }

    },[checkedList]);

    const onChangeInput = (e)=>{
        const value = e.target.value;
        if(value.trim().length===0){
            setError(true);
        }else{
            setError(false);
        }
    };
    return (
        <div className="gen-fav-inner">
            <h2>{isGenModal ? "새로운 즐겨찾기 생성" : "즐겨찾기 합치기"}</h2>
            <div className="noti-text">
                <p>{isGenModal ?  
                " 새로운 즐겨찾기를 생성합니다. 최대 20개의 비디오만 저장할 수 있습니다."
                : " 중복된 항목 없이 새로운 즐겨찾기로 합칩니다. 최대 20개의 항목만 저장됩니다."} </p>
            </div>
            <form>
                
                <div>
                    <label for="name">이름</label>
                    <input 
                        className={`input-text ${isErr === true ? 'err' : ''}`}
                        type="text" 
                        name="name" 
                        maxLength={MAX_FAV_TITLE}
                        ref={name} 
                        onChange={onChangeInput}
                        required
                        />
                    {isErr && <span>* 이름을 입력해주세요.</span>}
                </div>
                <div>
                    <label for="description">설명</label>
                    <textarea 
                        name="description" 
                        rows="3" 
                        cols="30"
                        ref={description} 
                        placeholder="즐겨찾기에 대한 설명을 적어주세요."
                        />
                </div>
                
                
                <div className="btn-group">
                    <button type="button" onClick={handleGenerate}>생성</button>
                    <button type="button" onClick={toggleModal}>취소</button>
                </div>
            
            </form>
        </div>
    );
};

export default FavGenModal;
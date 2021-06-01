import React, { useCallback, useEffect, useRef, useState } from 'react';
import './FavGenModal.scss';

const FavGenModal = ({ handleOk, handleCancel }) => {
    const [isErr, setError] = useState(false);
    const name = useRef(null);
    const description = useRef(null);
    
    useEffect(()=>{
        name.current.focus();
    }, []);

    const handleGenerate = useCallback((e)=>{
        if(name.current.value.trim().length > 0){
            handleOk({
                id : Math.floor(Math.random() * 1000000),
                name : name.current.value,
                description : description.current.value,
                count : 0
            })
        }else{
            setError(true);
        }
    },[]);

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
            <h2>새로운 즐겨찾기 생성</h2>
            <form>
                <div>
                    <label for="name">이름</label>
                    <input 
                        className={`input-text ${isErr === true ? 'err' : ''}`}
                        type="text" 
                        name="name" 
                        maxLength="12"
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
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            
            </form>
        </div>
    );
};

export default FavGenModal;
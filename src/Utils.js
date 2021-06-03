/* functions */
export const fakeFetch = (delay = 1000) => new Promise(res=>setTimeout(res,delay));
export const getFavoriteList = () =>{
    const data = JSON.parse(localStorage.getItem("favorite_list"));
    return data == null ? [] : data;
};

export const findTargetFavoriteIndex = (id)=>{
    const fav_list = getFavoriteList();
    return fav_list.findIndex((favorite)=> favorite.id === id);
};
export const toastPopup = (text, time)=>{
    const toast = document.getElementById("toast-message");
    let removeToast;
    if(toast.classList.contains("reveal")){
        removeToast = setTimeout( ()=>{
            document.getElementById("toast-message").classList.remove("reveal")
        }, time);
        clearTimeout(removeToast);
    }else{
        removeToast = setTimeout(()=>{
            document.getElementById("toast-message").classList.remove("reveal")
        }, time);
    }
        
    toast.classList.add("reveal");
    toast.innerText = text;
};
/* variables */
export const LOADNUM = 100;
export const MAX_FAV_TITLE = 12;
export const DELETE_ALERT_TEXT = "정말로 삭제하시겠습니까?";

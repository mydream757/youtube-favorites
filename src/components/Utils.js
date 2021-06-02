export const fakeFetch = (delay = 1000) => new Promise(res=>setTimeout(res,delay));
export const getFavoriteList = () =>{
    const data = JSON.parse(localStorage.getItem("favorite_list"));
    return data == null ? [] : data;
}
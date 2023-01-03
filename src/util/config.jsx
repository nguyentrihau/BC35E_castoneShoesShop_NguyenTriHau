import axios from "axios";
import {isExpired, decodeToken} from 'react-jwt'
import { history } from "../App";

export const USER_LOGIN = 'userLogin';
export const TOKEN = 'accessToken';
export const TOKEN_CYBER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIzMS8wNS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODU0OTEyMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NTYzODgwMH0.LWlPoCoXPHgp2U6FijTqXvKFt7ENvY9Tyn9ux-bVlXo';

export const {luuStore,luuStoreJson,layStore,layStoreJson,huyStore,setCookie,getCookie,eraseCookie, getToken,sl} = {
    sl : (arr,select) => {
        let total = 0;
        for (const key in arr) {
            total += arr[key][select];
        }
        return total;
    },
    luuStore: (name,data) => {
        localStorage.setItem(name,data);
    },
    luuStoreJson:(name,jsonData)=>{
        const data = JSON.stringify(jsonData);
        localStorage.setItem(name,data);
    },
    layStore: (name)=>{
        if(localStorage.getItem(name)){
            return localStorage.getItem(name);
        };
        return null;
    },
    // layStore: (name)=>{
    //     const nameReturn = localStorage.getItem(USER_LOGIN)
    //     console.log({nameReturn});
    //     //lấy đc userLogin từ lc về nhưng vẫn còn là json, anh chưa parse
    //     const userLogin = JSON.parse(nameReturn)
    //     //giờ mới parse
    //     const userLoginProperty = userLogin[name]
    //     // ra object thì mới lấy đc property mình muốn
    //     console.log(userLogin);
    //     if(!userLoginProperty){
    //         return null;
    //     };
    //     return userLoginProperty;
    // },
    layStoreJson: (name,token) => {
        if(localStorage.getItem(name)){
            return JSON.parse(localStorage.getItem(name))[token];
        };
        return null;
    },
    huyStore:(name)=>{
        localStorage.removeItem(name);
    },
    setCookie: (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    getToken: () => {
        const token = localStorage.getItem("userLogin");
        if(token) return JSON.parse(token).accessToken;
        return null;
    }
}

//cau hinh interceptor (cau hinh cho tat request(gui di),response(du lieu nhan ve))

export const http = axios.create({
    baseURL:'https://shop.cyberlearn.vn',
    timeout:30000
});

//cau hinh cho request deu co token
http.interceptors.request.use((config)=>{
    let token = getToken();
    // console.log("layStore(TOKEN)",token);
    config.headers = {
        ...config.headers,
        Authorization:`Bearer ${token}`,
        TokenCybersoft: TOKEN_CYBER,
    }
    return config;
},err => {
    return Promise.reject(err);
});

//cau hinh cho tat ca response api
http.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    // if(err.response?.status === 415){alert('dang nhap that bai')}
    //Bat loi 400 hoac 404
    if(err.response?.status === 400 || err.response?.status === 404){
        //Loi do tham so => backend tra ve 400 hoac 404 minh se xu ly
        alert('tham so khong hop le hoac trung email');
        //chuyen huong ve home
        history.push('/');
    }
    if(err.response?.status === 401 || err.response?.status === 403){
        const isMyTokenExpired = isExpired(layStore(TOKEN));
        //token het han
        if(isMyTokenExpired){
            // alert('Het phien dang nhap yeu cau dang nhap lai !');
            // huyStore(TOKEN);
            // huyStore(USER_LOGIN);
            // // chuyen huong dang trang f5
            // window.location.href = '/login';
        }
        // history.push('/login');
    }
    if(err.code === "ERR_NETWORK"){
        localStorage.removeItem(USER_LOGIN);
        window.location.reload();
    }
    return Promise.reject(err);
})
/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành công
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/
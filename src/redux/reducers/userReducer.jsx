// rxslice
import { createSlice } from '@reduxjs/toolkit'
import { history } from '../..';
import { http, layStoreJson, luuStoreJson, TOKEN, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin: layStoreJson(USER_LOGIN, TOKEN) ? layStoreJson(USER_LOGIN, TOKEN) : null,
    profile: null,
    newUser: {},
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUserLoginAction: (state, action) => {
            state.userLogin = action.payload;
        },
        setNewUser: (state, action) => {
            state.newUser = action.payload;
        },
        getProfileAction: (state, action) => {
            state.profile = action.payload;
        },
        postUpdateProfileApi: (state, action) => {
            state.profile = action.payload;
        },
        postApiFacebookToken: (state, action) => {
            state.userLogin = action.payload;
        }

    }
});

export const { setUserLoginAction, setNewUser, getProfileAction, postUpdateProfileApi, postApiFacebookToken } = userReducer.actions

export default userReducer.reducer

/**=========== async action ================= */
//lay thong tin nguoi dang ky
export const registerApi = (infoUse) => {  // { "email": "", "password": "",  "name": "",  "gender": true, "phone": "" }
    return async dispatch => {
        let result = await http.post('/api/Users/signup', infoUse);
        console.log('result', result.data);
        const action = setNewUser(result.data.content);
        dispatch(action);
        alert('đăng kí thành công')
        history.push('/login')
    }
}
//gui thong tin len api de dang nhap
export const loginApi = (userLogin) => {
    return async (dispatch) => {
        let result = await http.post(`/api/Users/signin`, userLogin);

        //sau khi dang nhap thanh cong dispatch len reducer
        const action = setUserLoginAction(result.data.content);
        dispatch(action);
        alert('đăng nhập thành công')
        history.push('/profile');
        //Luu cookie hoac localstorage cho token
        //luu thong tin dang nhap thanh cong {email,accessToken} vao localstorage
        luuStoreJson(USER_LOGIN, result.data.content);
        console.log(result.data.content);
        //luu access token vao cookie
        // setCookie(TOKEN_CYBER,result.data.content.accessToken);
    }
}

//lay thong tin user ve profile
export const getProfileApi = () => {
    return async (dispatch) => {
        let result = await http.post('/api/Users/getProfile');
        //sau khi call api profile dua len reducer
        const action = getProfileAction(result.data.content);
        dispatch(action);
        console.log(result.data.content);
    }
}

//cap nhat thong tin user
export const updateProfileApi = (profileUpdate) => {
    return async (dispatch) => {
        let result = await http.post('/api/Users/updateProfile', profileUpdate);
        const action = postUpdateProfileApi(result.data.content);
        console.log(result);
        dispatch(action);
    }
}

//dang nhap bang facebook
export const loginFacebookApi = (fbToken) => {
    try {
        return async (dispatch) => {
            const result = await http.post("/api/Users/facebooklogin", fbToken)
            const action = postApiFacebookToken(result.data.content);
            console.log(result.data);
            dispatch(action);
            // alert('đăng nhập thành công')
            // history.push('/profile');
            luuStoreJson(USER_LOGIN, result.data.content);
        }
    } catch (error) {
        console.log({ error });
    }
}
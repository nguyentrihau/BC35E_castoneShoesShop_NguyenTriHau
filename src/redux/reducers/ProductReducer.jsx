//rxslice
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../util/config';
import _ from 'lodash'

const initialState = {
    arrProduct: [
        {
            id: 1, name: 'nike 1 ', price: 1000, image: 'https://picsum.photos/id/1/200/200'
        }
    ],
    productDetail: null,
    productSearch:[],
  

}

const ProductReducer = createSlice({
    name: 'productReducer ', //ten cua reducer
    initialState, //gia tri ban dau
    reducers: {
        getProductAction: (state, action) => {
            state.arrProduct = action.payload;
        },
        getProductDetailAction: (state, action) => {
            state.productDetail = action.payload;
        },
        getListResultAction:(state,action) =>{
            state.productSearch = action.payload;
        },
        sortListResultAction:(state,action)=>{
            let sortedListResult = [...state.productSearch];
            sortedListResult = _.orderBy(
                sortedListResult,["price"],[action.payload]
            );
            state.productSearch = sortedListResult;
        }
    }
});

export const { getProductAction,getProductDetailAction,getListResultAction,sortListResultAction,
} = ProductReducer.actions

export default ProductReducer.reducer


/**----------async action------------------ */

//lay danh sach san pham trang home
export const getAllProductApi = async (dispatch) => {
    console.log("dispatch", dispatch);
    const result = await http.get(`/api/Product`);

    console.log("result", result);
    //sau khi lay du lieu thanh cong tu api => dispatch len redux
    const action = getProductAction(result.data.content);
    dispatch(action);
    console.log(action);
};
//lay chi tiet san pham trang detail
export const getProductByIdApi = (id) => {
    return async (dispatch) => {
        const result = await http.get(`/api/Product/getbyid?id=${id}`);
        //sau khi co du lieu tu api => dispatch lan 2 len reducer
        const action = getProductDetailAction(result.data.content)
        dispatch(action);
        console.log(action);
    }
};
//lay san pham trang search theo keyword
export const getProductApi = (keyword) => {
    return async (dispatch) => {     
            const result = await http.get(`/api/Product?keyword=${keyword}`);
            console.log(result.data.content);
            const action =getListResultAction(result.data.content);
            dispatch(action);
    };
};

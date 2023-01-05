//rxslice
import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import _, { result } from 'lodash'

const initialState = {
    arrProduct: [
        {
            id: 1, name: 'nike 1 ', price: 1000, image: 'https://picsum.photos/id/1/200/200'
        }
    ],
    productDetail: null,
    productSearch: [],
    arrCategory: [],
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
        getListResultAction: (state, action) => {
            state.productSearch = action.payload;
        },
        sortListResultAction: (state, action) => {
            let sortedListResult = [...state.productSearch];
            sortedListResult = _.orderBy(
                sortedListResult, ["price"], [action.payload]
            );
            state.productSearch = sortedListResult;
        },
        getAllCategoryAction: (state, action) => {
            state.arrCategory = action.payload;
        },
        getProductByCategoryIdAction: (state, action) => {
            state.productSearch = action.payload;
        }
    }
});

export const { getProductAction, getProductDetailAction, getListResultAction, sortListResultAction, getAllCategoryAction, getProductByCategoryIdAction } = ProductReducer.actions

export default ProductReducer.reducer


/**----------async action------------------ */
export const getAllProductApiCall = async (dispatch) => {
    // console.log("dispatch", dispatch);
    return await http.get(`/api/Product`).then(res => {
        return res
    }).catch(err => console.log({ err }))

};

//lay danh sach san pham trang home
export const getAllProductApi = async (dispatch) => {
    try {
        // console.log("dispatch", dispatch);
        const result = await http.get(`/api/Product`);

        // console.log("result", result);
        //sau khi lay du lieu thanh cong tu api => dispatch len redux
        const action = getProductAction(result.data.content);
        dispatch(action);

        // console.log(action);
    } catch (error) {
        console.log("err", error);
    }
};
//lay chi tiet san pham trang detail
export const getProductByIdApi = (id) => {
    return async (dispatch) => {
        try {

            const result = await http.get(`/api/Product/getbyid?id=${id}`);
            //sau khi co du lieu tu api => dispatch lan 2 len reducer
            const action = getProductDetailAction(result.data.content)
            dispatch(action);
            console.log(action);
        } catch (error) {
            console.log(error);
        }
    }
};
//lay san pham trang search theo keyword
export const getProductApi = (keyword) => {
    return async (dispatch) => {
        const result = await http.get(`/api/Product?keyword=${keyword}`);
        console.log(result.data.content);
        const action = getListResultAction(result.data.content);
        dispatch(action);
    };
};

//category lay ten hang giay
export const getAllCategoryApi = async (dispatch) => {
    try {
        const result = await http.get("/api/Product/getAllCategory");
        const action = getAllCategoryAction(result.data.content);
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}
//lay san pham category
export const getProductByCategoryId = (keyword) => {
    return async (dispatch) => {
        try {
            const result = await http.get(`/api/Product/getProductByCategory?categoryId=${keyword}`);
            const action = getProductByCategoryIdAction(result.data.content);
            dispatch(action);
            console.log(result.data.content);
        } catch (error) {
            console.log(error);
        }
    }
}

import { createSlice } from '@reduxjs/toolkit'
import { history } from '../../App';
import { getToken, http} from '../../util/config';
import { getProfileApi } from './userReducer';

const initialState = {
    listCartTemp: [],
}

const CartReducer = createSlice({
    name: "CartReducer",
    initialState,
    reducers: {
        addToCartAction: (state, action) => {
            //check login
            if (!getToken()){return history.push("/login")};
            //boc tach phan tu
            let { listCartTemp } = state;
            let { payload } = action;
            let index = listCartTemp.findIndex((item) => item.id === payload.id);
            if (index !== -1) {
                //neu da co thi tien hanh tang so luong len
                listCartTemp[index] = {
                    ...listCartTemp[index],
                    quantityState: listCartTemp[index].quantityState + payload.quantityState,
                };
            } else {
                //neu chua co thi add moi vao
                listCartTemp = [...listCartTemp, payload]
            };
            //update vao state
            state.listCartTemp = listCartTemp;
            // if (state.listCartTemp = listCartTemp){ alert('Thêm thành công') }
            console.log("listCartTemp", listCartTemp);
        },
        changeQuantityAction: (state, action) => {
            console.log("soluong", action.payload[0]);
            let index = state.listCartTemp.findIndex(
                (item) => item.id === action.payload[1]
            );
            if (index !== -1) {
                state.listCartTemp[index].quantityState += action.payload[0];
            }
        },
        handleDeleteAction: (state, action) => {
            let newListCartTemp = state.listCartTemp.filter(
                (item) => item.id !== action.payload
            );
            state.listCartTemp = newListCartTemp;
        },
        submitOrderAction: (state, action) => {
            let newListCartTemp = [...state.listCartTemp];
            console.log(action.payload);
            action.payload.orderDetail.forEach((i, index) => {
                newListCartTemp = newListCartTemp.filter((j) => j.id !== i.productId);
            });
            console.log("newListCartTemp", newListCartTemp);
            state.listCartTemp = newListCartTemp;
        },
        checkItem: (state, action) => {
            let { listCartTemp } = state;
            const { payload } = action;
            const index = listCartTemp.findIndex((item) => item.id === payload);
            if (index !== -1) {
                listCartTemp[index] = {
                    ...listCartTemp[index],
                    checked: !listCartTemp[index].checked,
                };
            }
            state.listCartTemp = listCartTemp;
        },
        checkAllItem: (state, action) => {
            let { listCartTemp } = state;
            let { payload } = action;
            for (const key in listCartTemp) {
                listCartTemp[key] = {
                    ...listCartTemp[key],
                    checked: payload,
                }
            }
            state.listCartTemp = listCartTemp;
        }
    }
});

export const { addToCartAction, changeQuantityAction, handleDeleteAction, submitOrderAction, checkItem, checkAllItem } = CartReducer.actions

export default CartReducer.reducer

/**--------------async action  */

export const postOrderProductApi = (order) => {
    return async (dispatch) => {
        try {
            const result = await http.post("/api/Users/order", order);
            console.log(result);
            alert("Đặt hàng thành công!");
            dispatch(submitOrderAction(order));
            dispatch(getProfileApi);
        } catch (err) {
            console.log(err);
        }
    };
};
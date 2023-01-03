import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { changeQuantityAction, checkAllItem, checkItem, handleDeleteAction, postOrderProductApi } from '../../redux/reducers/CartReducer';

const Carts = () => {
  const { listCartTemp } = useSelector(state => state.CartReducer);
  const { profile } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  console.log(listCartTemp);
  let handleChangeQuantity = (number, id) => {
    dispatch(changeQuantityAction([number, id]));
  };
  let handleDelete = (id) => { dispatch(handleDeleteAction(id)) };
  let handleCheck = (id) => { dispatch(checkItem(id)) };
  let handeCheckAll = ({ target: { checked } }) => {
    dispatch(checkAllItem(checked));
  };
  const findIfCheckAll = () => {
    let result = true;
    for (let value of listCartTemp) {
      if (!value.checked) result &= false;
    }
    return result;
  };
  let handleSubmitOrder = () => {
    let order = {
      orderDetail: [],
      email: profile.email,
    };
    let deleteProd = [];
    for (let value of listCartTemp) {
      if (value.checked) {
        let prod = {
          productId: value.id,
          quantity: value.quantity,
        };
        order.orderDetail = [...order.orderDetail, prod];
        deleteProd = [...deleteProd, value.id];
      }
    };
    if (order.orderDetail.length !== 0) {
      dispatch(postOrderProductApi(order));
      for (let value of deleteProd) {
        handleDelete(value);
      }
    } else {
      alert("Chọn sản phẩm trước khi đặt hàng!");
    }
  }
  return (
    <section>
      <div className="cart">
        <div className="container">
          <h2>Carts</h2>
          <div className="product_cart">
            <table className='table'>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox"
                      checked={findIfCheckAll()}
                      onChange={(e) => handeCheckAll(e)}
                    />
                  </th>
                  <th>id</th>
                  <th>img</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>action</th>
                </tr>
              </thead>
              {listCartTemp.map((prod, index) => {
                console.log(prod.checked);
                return <tbody key={index}>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => { handleCheck(prod.id) }}
                        checked={prod.checked ? true : false}
                      />
                    </td>
                    <td>{prod.id}</td>
                    <td><img src={prod.image} width={90} height={90} alt=".." /></td>
                    <td><Link to={`/detail/${prod.id}`}>{prod.name}</Link></td>
                    <td>{prod.price}$</td>
                    <td>
                      <button onClick={() => {
                        handleChangeQuantity(1, prod.id);
                      }}>+</button>
                      <span className='sl'>{prod.quantityState}</span>
                      <button onClick={() => {
                        if (prod.quantityState <= 1) {
                          if (window.confirm(`Bạn có muốn xóa sản phẩm ${prod.name}`)) {
                            handleDelete(prod.id);
                          }
                        } else {
                          handleChangeQuantity(-1, prod.id);
                        }
                      }}>-</button>
                    </td>
                    <td>{prod.price * prod.quantityState}$</td>
                    <td>
                      <button className='btn btn-danger btn_delete' onClick={() => {
                        if (window.confirm(`Bạn có muốn xóa sản phẩm ${prod.name}`)) {
                          handleDelete(prod.id)
                        }
                      }}>DELETE</button>
                    </td>
                  </tr>
                </tbody>
              })}

              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <button className='btn_submit' onClick={handleSubmitOrder}>SUBMIT ORDER</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Carts
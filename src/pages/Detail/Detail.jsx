import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import Products from '../../Component/Product/Products';
import { addToCartAction } from '../../redux/reducers/CartReducer';
import {getProductByIdApi} from '../../redux/reducers/ProductReducer';

const Detail = () => {
  const [sizeState, setSizeState] = useState("36");
  const [quantityState, setQuantityState] = useState(1);
  const { productDetail } = useSelector(state => state.ProductReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const getProductByID = async () => {
    const action = getProductByIdApi(param.id);
    dispatch(action);
  }
  useEffect(() => {
    getProductByID();
  }, [param.id])
  console.log(productDetail);

  const handleChangeQuantity = (number) => {
    if (quantityState < 2 && number === -1) {
      return alert("Không thể chỉnh số lượng dưới 1");
    }
    setQuantityState(quantityState + number);
  };

  const handleAddToCart = () =>{
    dispatch(addToCartAction({ ...productDetail, quantityState }));
  }

  return (
    <section className="carousel_detail">
      <div className="container">
        <div className="product_name">
          <div className="row" id="data_carousel_detail">
            <div className="detail_img col-lg-4 col-md-6 col-sm-12  ">
              <img src={productDetail?.image} alt="..." />
            </div>
            <div className="detail_content col-lg-8 col-md-6 col-sm-12">
              <h3>{productDetail?.name}</h3>
              <p>{productDetail?.description}</p>
              <h4>Available size</h4>
              <div className="size">
                {productDetail?.size?.map((size,idx)=>{
                  return <button className={(sizeState === size ? "active-size my-2" : "my-2")}  key={idx} onClick={()=>{
                    setSizeState(size)
                  }}><span>{size}</span></button>
                })}
              </div>
              <p className="gia">{productDetail?.price}$</p>
              <div className="add">
                <button onClick={() => {
                  handleChangeQuantity(1);
                }}><span>+</span></button>
                <p>{quantityState}</p>
                <button onClick={() => {
                  handleChangeQuantity(-1);
                }}><span>-</span></button>
              </div>
              <button className="btnAdd" onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="title">
        <h2>-Product Feature -</h2>
      </div>
      <div className="product container_pr">
        <div className="row">
          {productDetail?.relatedProducts?.map((item, index) => {
            return <div className="col-lg-4 col-md-6 px-4 pt-5" key={index}>
              <Products prod={item} />
            </div>
          })}

        </div>
      </div>
    </section>
  )
}

export default Detail
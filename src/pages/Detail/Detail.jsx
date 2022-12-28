import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import Products from '../../Component/Product/Products';
import { getProductByIdApi, getProductDetailAction } from '../../redux/reducers/ProductReducer';

const Detail = () => {
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
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores pariatur sequi esse ducimus veritatis
                aspernatur totam inventore, tempore rem impedit illum qui a quae aperiam officiis, error repellat sunt
                nulla! ( Thuộc tính Description)</p>
              <h4>Available size</h4>
              <div className="size">
                <button><span>38</span></button>
                <button><span>39</span></button>
                <button><span>40</span></button>
                <button><span>41</span></button>
                <button><span>42</span></button>
              </div>
              <p className="gia">{productDetail?.price}$</p>
              <div className="add">
                <button><span>+</span></button>
                <p>1</p>
                <button><span>-</span></button>
              </div>
              <button className="btnAdd">Add to cart</button>
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
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import Products from '../../Component/Product/Products'
import { getAllProductApi, getProductAction } from '../../redux/reducers/ProductReducer';
import { getProductFavoriteApi } from '../../redux/reducers/userReducer';

const Home = () => {
  const { arrProduct } = useSelector(state => state.ProductReducer);
  const dispatch = useDispatch();
  const { productFavorite } = useSelector(state => state.userReducer);
  // let valid = false;
  // console.log(productFavorite?.productsFavorite);
  // const heart = async (dispatch) => {

  //   try {


  //     const result = await axios({
  //       url: `https://shop.cyberlearn.vn/api/Users/getproductfavorite`,
  //       method: 'GET',
  //       // window + v : paste collection
  //       headers: { "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJob2FAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVklFV19QUk9GSUxFIiwibmJmIjoxNjcxOTkyNTU0LCJleHAiOjE2NzE5OTYxNTR9.5AGX9Zg1JCHh59MUBCva0-BKwbPQ-Cu_DwJCBg1apjg" }

  //     });
  //     //sau khi co du lieu tu api => dispatch lan 2 len reducer
  //     const action = result.data.content
  //     console.log(result);
  //     dispatch(action);
  //   } catch (error) {
  //     console.log({ error });

  //   }
  // }

  

  const getAllProduct = async () => {
    try {
      
      const action = await getAllProductApi;
      dispatch(action);
    } catch (error) {
      console.log({error});
    }
  }

  useEffect(() => {
    //call api tu backend
    getAllProduct();
    // heart();
    const action = getProductFavoriteApi();
    dispatch(action);
  }, [])
  return (
    <>
      <section className="carousel">
        <div id="carouselCapstone" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselCapstone" data-slide-to={0} className="active" />
            <li data-target="#carouselCapstone" data-slide-to={1} />
            <li data-target="#carouselCapstone" data-slide-to={2} />
          </ol>
          <div className="carousel-inner" id="data-carousel">
            {arrProduct.map((prod, index) => {
              return <div className="carousel-item" key={index}>
                <div className="carousel__left">
                  <img src={prod?.image} alt="image4" />
                </div>
                <div className="carousel__right">
                  <h2>{prod?.name}</h2>
                  <p>{prod?.shortDescription}</p>
                  <NavLink to={`/detail/${prod?.id}`}>Buy now</NavLink>
                </div>
              </div>
            })}
            <div className="carousel-item active">
              <div className="carousel__left">
                <img src="./img/adidas.png" alt="image4" />
              </div>
              <div className="carousel__right">
                <h2>Adidas Prophere</h2>
                <p>The midsole contains 20% more Boost for an amplified Boost feeling</p>
                <NavLink to={`/detail/1`}>Buy now</NavLink>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-target="#carouselCapstone" data-slide="prev">
            <img className="polygon-1" src="./img/Polygon 2.png" aria-hidden="true" alt="..." />
            <span className="sr-only">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-target="#carouselCapstone" data-slide="next">
            <img className="polygon-2" src="./img/Polygon 1.png" aria-hidden="true" alt="..." />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </section>
      <section className="product">
        <div className="title">
          <h2> - Product Feature - </h2>
        </div>
        <div className="container_pr">
          <div className="row">

            {arrProduct.map((prod, index) => {
            //  console.log({prod});
                 const findeditem = productFavorite?.productsFavorite?.findIndex(item => item.id === prod.id)
                //  console.log(findeditem !== -1);
                //  let validItem = false;
              // productFavorite?.productsFavorite?.map((prodLike, idl) => {
              //   // console.log("prod.id=",prod.id,";prodLike.id=",prodLike.id);
              //   {
              //     if (prod.id == prodLike.id) {
              //       validItem = true;
              //     } else {
              //     }
              //   }
              // })
              return <div className="col-lg-4 col-md-6 px-4 pt-5" key={index}>
                <Products prod={prod} valid={findeditem!==-1} />
              </div>
              // console.log(prod);
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Products from '../../Component/Product/Products'
import * as yup from 'yup'
import { getAllProductApi, getProductApi } from '../../redux/reducers/ProductReducer';
const Search = () => {
  const dispatch = useDispatch();
  const {productSearch} = useSelector(state=>state.userReducer);
  console.log("productSearch:",productSearch);
  const form = useFormik({
    initialValues: {
      searchValue: "",
    },
    validationSchema: yup.object().shape({
      searchValue: yup.string(),
    }),
    onSubmit: (values) => {
      // console.log(values);
      dispatch(getProductApi(values.searchValue));
    },
  });
  useEffect(()=>{
    // dispatch(getProductApi(''));
    // dispatch(getAllProductApi);
  },[])
  return (
    <section>
      <div className="search mt-5 pt-3 ">
        <form className="search_product ml-5" onSubmit={form.handleSubmit}>
          <h4>Search</h4>
          <input type="text" name='searchValue' placeholder='product name...' className='form-control w-25 d-inline' onChange={form.handleChange} />
          <button type="submit" className='btn btn-primary ml-2 btn_search'><span>SEARCH</span></button>
        </form>
        <div className="search_result mt-4">
          <h2>Search result</h2>
        </div>
        <div className="container_search">
          <div className="search_price">
            <h5>Price</h5>
            <select name="" id="" className='form-control w-25 price_select'>
              <option value="">decrease</option>
              <option value="">crease</option>
            </select>
            <p className='form-control w-25 price_select mt-2'>ascending</p>
          </div>
          <section className='product'>
            <div className="container_pr">
              <div className="row" id="data-product">
                <Products />
                <Products />
                <Products />
                <Products />
                <Products />
                <Products />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Search
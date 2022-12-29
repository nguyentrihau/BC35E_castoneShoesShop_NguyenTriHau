import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Products from '../../Component/Product/Products'
import * as yup from 'yup'
import { getAllProductApi, getProductApi, sortListResultAction } from '../../redux/reducers/ProductReducer';
import { useSearchParams } from 'react-router-dom';
const Search = () => {
  const dispatch = useDispatch();
  const { productSearch } = useSelector(state => state.ProductReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('k');//khi url ko co tham so keyword = null
  console.log("productSearch:", productSearch);
  const form = useFormik({
    initialValues: {
      keyword: "",
    }, validationSchema: yup.object().shape({
      keyword: yup.string(),
    }),
    onSubmit: (values) => {
      setSearchParams({
        k: values.keyword,
      })
      console.log(values.keyword);
    },
  });
  useEffect(() => {
    dispatch(getProductApi(keyword));
  }, [keyword]);
  const handleSort = (sort) => {
    dispatch(sortListResultAction(sort));
  };
  return (
    <section>
      <div className="search mt-5 pt-3 ">
        <form className="search_product ml-5" onSubmit={form.handleSubmit}>
          <h4>Search</h4>
          <input type="text" name='keyword' placeholder='product name...' className='form-control w-25 d-inline' onChange={form.handleChange} />
          <button type="submit" className='btn btn-primary ml-2 btn_search'><span>SEARCH</span></button>
        </form>
        <div className="search_result mt-4">
          <h2>Search result</h2>
        </div>
        <div className="container_search">
          <div className="search_price">
            <h5>Price</h5>
            <button className='form-control w-25 price_select' onClick={() => handleSort("desc")}>decrease<i className="fa-solid fa-arrow-down ml-5"></i></button>
            <button className='form-control w-25 price_select mt-2 mb-2' onClick={() => handleSort("asc")}>ascending<i className="fa-solid fa-arrow-up ml-5"></i></button>
          </div>
          <section className='product'>
            <div className="container_pr">
              <div className="row" id="data-product">
                {productSearch?.map((prod, index) => {
                  // console.log(prod);
                  return <div className="col-lg-4 col-md-6 px-4 pt-5" key={index}>
                    <Products prod={prod} />
                  </div>
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Search
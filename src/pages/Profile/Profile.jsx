import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getProfileApi, updateProfileApi } from '../../redux/reducers/userReducer';
import * as yup from 'yup';
import { useFormik } from 'formik';
const Profile = () => {
  const { profile } = useSelector(state => state.userReducer);
  console.log(profile?.ordersHistory)
  // const profile = null;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: profile?.email,
      password: profile?.password,
      name: profile?.name,
      gender: profile?.gender,
      phone: profile?.phone,
    },
    validationSchema: yup.object().shape({
      phone: yup.string()
        .required("Nhập số điện thoại để update !")
        .matches(/^[0-9]+$/, 'Chỉ được nhập số')
        .min(9, "Số điện thoại phải đúng 10 số ")
        .max(10, "Số điện thoại phải đúng 10 số "),
      name: yup.string().required("Nhập tên mới để update "),
    }),
    onSubmit: (values) => {
      let { email, password, gender, phone, name } = values;
      let userUpdate = {
        ...profile,
        ...(email && { email }),
        ...(password && { password }),
        ...(gender === null || gender === undefined ? {} : { gender }),
        ...(phone && { phone }),
        ...(name && { name }),
      };
      dispatch(updateProfileApi(userUpdate));
      console.log(userUpdate);
    }
  });

  return (
    <section>
      <div className="profile">
        <h3 className='title_profile'>Profile</h3>
        <div className="container">
          <form className="profile_content" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="profile_content_left col-8">
                <div className="row">
                  <div className="col-5 profile_content_left_img mt-3">
                    <img src={profile?.avatar} className='img-fluid' alt="" />
                  </div>
                  <div className="col-6">
                    <div className='form-group mt-3'>
                      <label htmlFor="email">Email</label>
                      <input name='email' defaultValue={profile?.email} className='form-control' id="email" disabled onChange={formik.handleChange} />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="phone">Phone</label>
                      <input name='phone' defaultValue={profile?.phone} id="phone" className='form-control' onChange={formik.handleChange} />
                      {formik.errors.phone && formik.touched.phone && <div className="text-danger">{formik.errors.phone}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile_content_right col-4">
                <div className='form-group mt-3'>
                  <label htmlFor="name">Name</label>
                  <input name='name' id="name" defaultValue={profile?.name} className='form-control' onChange={formik.handleChange} />
                  {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input name='password' id="password" className='form-control' onChange={formik.handleChange} />
                  {/* {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>} */}
                </div>
                <div className="form-group d-xl-flex reCheck">
                  <div className="gender mr-3">Gender:</div>
                  <div className="radio mr-3">
                    <input id="radio-1" name="gender" type="radio" defaultChecked={profile?.gender} style={{ cursor: 'pointer' }} onChange={() =>
                      formik.setFieldValue("gender", true)
                    } />
                    <label htmlFor="radio-1" className="radio-label" style={{ cursor: 'pointer' }}>Male</label>
                  </div>
                  <div className="radio ml-3">
                    <input id="radio-2" name="gender" type="radio" defaultChecked={!profile?.gender} style={{ cursor: 'pointer' }} onChange={() =>
                      formik.setFieldValue("gender", false)
                    } />
                    <label htmlFor="radio-2" className="radio-label" style={{ cursor: 'pointer' }}>Female</label>
                  </div>
                  <div>
                    <button type='submit' className='btn_update'>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="history_favourite">
            <h3 className='ord'>Order history</h3>
            <h3 className='fav'>Favourite</h3>
          </div>
          <div className="history">
            <p>+ Order have been placed on 09 - 19 - 2020</p>
            <table className="table table_pr">
              <thead className="thead">
                <tr>
                  <th>id</th>
                  <th>img</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                </tr>
              </thead>
              {profile?.ordersHistory?.map((prod, index) => {
                console.log({ prod });
                const { orderDetail } = prod;
                return <tbody key={index}>
                  {prod.orderDetail.map((item, id) => {
                    console.log({item});
                    return (<tr key={id}>
                      <td>{id}</td>
                      <td><img src={item.image} width={90} height={90} alt="..." /></td>
                      <td>{item.name} </td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.quantity * item.price}</td>
                    </tr>)
                  })}
                </tbody>
              })}

            </table>
          </div>
          <div className="history">
            <p>+ Order have been placed on 09 - 19 - 2020</p>
            <table className="table table_pr">
              <thead className="thead">
                <tr>
                  <th>id</th>
                  <th>img</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><img src="./img/image 5.png" width={85} height={56} alt="" /></td>
                  <td>Product 1 </td>
                  <td>1000</td>
                  <td>1</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end my-5 pt-5">
              <li className="page-item">
                <NavLink className="page-link" to="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </NavLink>
              </li>
              <li className="page-item">
                <NavLink className="page-link" to="#">
                  1
                </NavLink>
              </li>
              <li className="page-item">
                <NavLink className="page-link" to="#">
                  2
                </NavLink>
              </li>
              <li className="page-item">
                <NavLink className="page-link" to="#">
                  ...
                </NavLink>
              </li>
              <li className="page-item">
                <NavLink className="page-link" to="#">
                  9
                </NavLink>
              </li>
              <li className="page-item">
                <NavLink className="page-link" to="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Profile
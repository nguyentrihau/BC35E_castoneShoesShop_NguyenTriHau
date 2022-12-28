import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginApi } from '../../redux/reducers/userReducer';
const Login = () => {
  let [type, setType] = useState("password");
  let [icon, setIcon] = useState("fa-solid fa-eye");
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:yup.object().shape({
      email:yup.string()
      .required('Vui lòng nhập email')
      .email('email không hợp lệ ...@gmail.com'),
      password:yup.string()
      .required('Vui lòng nhập password'),
    }),
    onSubmit:(values)=>{
      dispatch(loginApi(values));
    }
  });
  return (
    <section className='login'>
      <div className="container">
        <h2>Login</h2>
        <div className="row">
          <div className="col-3"></div>
          <form className="login_form col-6" onSubmit={frm.handleSubmit}>
            <div className="login_content">
              <div className='form-group mb-3'>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder='email' name='email' className='form-control' id="email" onChange={frm.handleChange} onBlur={frm.handleBlur} />
                {frm.errors.email && <p className='text-danger' style={{fontWeight:'400'}}>{frm.errors.email}</p>}
              </div>
              <div className='form-group pass_eye'>
                <label htmlFor="password">Password</label>
                <input type={type} placeholder='password' name='password' className='form-control ' id="password" onChange={frm.handleChange} onBlur={frm.handleBlur} />
                <div className='hiddeneye' style={{cursor:'pointer'}} onClick={()=>{
                  if(type === "password"){setIcon("fa-solid fa-eye-slash");setType("text")}else{
                    setIcon("fa-solid fa-eye");setType("password")
                  }
                }}><i className={icon} aria-hidden="true"></i></div>
              </div>
            </div>
            <div className="login_register">
              <NavLink to="/register">Register now?</NavLink>
              <button className='btn_login'>LOGIN</button>
            </div>
            <button className='btn_fb'>
              <i className="fa-brands fa-facebook"></i>
              <span>Continue with Facebook</span>              
            </button>
          </form>
          <div className="col-3"></div>
        </div>
      </div>
    </section>
  )
}

export default Login
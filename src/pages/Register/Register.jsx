import { useFormik, yupToFormErrors } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { registerApi } from '../../redux/reducers/userReducer';
const Register = () => {
  // let [gender, setGender] = useState(null);
  let [type, setType] = useState("password");
  let [icon, setIcon] = useState("fa-solid fa-eye")
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: yup.object().shape({
      phone: yup.string()
        .required("Số điện thoại không được để trống !")
        .matches(/^[0-9]+$/,'Chỉ được nhập số')
        .min(10, "Số điện thoại phải đúng 10 số ")
        .max(10,"Số điện thoại phải đúng 10 số "),
      name: yup.string().required("Tên không được để trống "),
      email: yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng(...@gmail.com,@email.com )!"),
      password: yup.string()
        .required("Password không được bỏ trống !")
        .min(3, "Password từ 3 - 32 ký tự!")
        .max(32, "Password từ 3 đến 32 ký tự!"),
      rePassword: yup.string()
        .oneOf([yup.ref("password")], "Nhập lại mật khẩu không đúng")
        .required("Password confirm không được bỏ trống !"),
      
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerApi(values));
    }
  });
  
  return (
    <section className="register">
      <div className="container">
        <form className="register_title" onSubmit={formik.handleSubmit}>
          <h2 className="text-left">Register</h2>
          <div className="row">
            <div className="col-6 form-left">
              <div className="form-group ">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="email" name='email' className="form_email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
              </div>
              <div className="form-group ">
                <label htmlFor="password">Password</label>
                <input type={type} name='password' placeholder="password" className='form_pass' id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <span className={icon} style={{cursor:'pointer'}} onClick={()=>{
                  if(type === "password"){setIcon("fa-solid fa-eye-slash");setType("text")}else{
                    setIcon("fa-solid fa-eye");setType("password")
                  }
                }}></span>
                {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}

              </div>
              <div className="form-group ">
                <label htmlFor="rePassword">password confirm</label>
                <input type={type} name='rePassword' placeholder="password confirm" className='form_repass' id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <span className={icon} style={{cursor:'pointer'}} onClick={()=>{
                  if(type === "password"){setIcon("fa-solid fa-eye-slash");setType("text")}else{
                    setIcon("fa-solid fa-eye");setType("password")
                  }
                }}></span>
                {formik.errors.rePassword &&  formik.touched.rePassword && <div className="text-danger">{formik.errors.rePassword}</div>}
              </div>
            </div>
            <div className="col-6 form-right">
              <div className="form-group ">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' placeholder="name" className="form_name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
              </div>
              <div className="form-group ">
                <label htmlFor="phone">Phone</label>
                <input type="text" name='phone' placeholder="phone" className="form_phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.phone && formik.touched.phone && <div className="text-danger">{formik.errors.phone}</div>}
              </div>
              <div className="form-group d-xl-flex reCheck">
                <div className="gender">Gender</div>
                <div className="radio d-flex">
                  <input id="radio-1" name="gender" className='male' type="radio" value={true} onChange={formik.handleChange} defaultChecked/>
                  <label htmlFor="radio-1" className="radio-label" style={{ cursor: 'pointer' }}>Male</label>
                </div>
                <div className="radio d-flex">
                  <input id="radio-2" name="gender" className='female' type="radio" value={false} onChange={formik.handleChange} />
                  <label htmlFor="radio-2" className="radio-label" style={{ cursor: 'pointer' }}>Female</label>
                </div>
              </div>
              <button type="submit" className="btnTK" id="btnTaoTK">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}

export default Register
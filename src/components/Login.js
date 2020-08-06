import React,{useState} from 'react';
import { Formik } from 'formik';
import {Link }from "react-router-dom";
import axios from 'axios';
import { Button } from 'antd';
function Login(props) {
  const[loading,setLoading]=useState(false)
    return(
  <div className="Register">
    <Formik
      initialValues={{ phone: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.phone ) {
          errors.phone = 'Required';
        }
          if (!values.password ) {
            errors.password = 'Required';
          } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setLoading(true)
        axios.post(`https://react-price-tracker.herokuapp.com/users/login`, values)
        .then(res=>{
          
          localStorage.priceUserName = res.data.name
          localStorage.priceUserID = res.data.id
          localStorage.priceToken = res.data.token
          if(localStorage.priceToken && localStorage.priceUserID && localStorage.priceUserName){
            setLoading(false)
          props.history.push('/dashboard')
          } 
          
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className="form landing-form" onSubmit={handleSubmit}>
          <h1 className="sign-in-header">Sign In</h1>
          <input
            placeholder="Phone"
            type="phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          <span>{errors.phone && touched.phone && errors.phone}</span>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <span>{errors.password && touched.password && errors.password}</span>
          
          <Button htmlType='submit' className='register-btn' loading={loading}>  Login</Button>
      
          <span className='register-text'>or</span>
          <Link className='form-link'to='/'>Sign Up</Link>
        </form>
      )}
    </Formik>
  </div>
    )};

export default Login;
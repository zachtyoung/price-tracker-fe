import React, {useState} from 'react';
import { Formik } from 'formik';
import {Link }from "react-router-dom";
import axios from 'axios';
import { Button } from 'antd';

function Register(props) {
  const[loading,setLoading]=useState(false)
    return(
  <div className="Register">
    <Formik
      initialValues={{ name:'', email: '', phone:'', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email ) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.name ) {
            errors.name = 'Required';
          } 
          if (!values.phone ) {
            errors.phone = 'Required';
          } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          }
          if (!values.password ) {
            errors.password = 'Required';
          } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setLoading(true)
        axios.post(`https://react-price-tracker.herokuapp.com/users/register`, values)
        .then(res=>{
          localStorage.priceUserName = res.data.name
          localStorage.priceUserID = res.data.id
          localStorage.priceToken = res.data.token
          setLoading(false)
          props.history.push('/dashboard')
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
          <h1>Register</h1>
            <input
            placeholder="Name"
            type="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            placeholder="Phone"
            type="phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          {errors.phone && touched.phone && errors.phone}
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          
          <Button htmlType='submit' className='register-btn' loading={loading}>Register</Button>
          <span className='register-text'>or</span>
          <Link className='form-link'to='/login'>Sign in</Link>
        </form>
      )}
    </Formik>
  </div>
    )};

export default Register;
  
  
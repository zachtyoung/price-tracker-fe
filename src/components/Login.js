import React from 'react';
import { Formik } from 'formik';
import {Link }from "react-router-dom";
import axios from 'axios';

function Login(props) {
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
        axios.post(`http://localhost:4000/users/login`, values)
        .then(res=>{
          console.log(res.data.token)
          localStorage.priceToken = res.data.token
          if(localStorage.priceToken){
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
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Phone"
            type="phone"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          <span>{errors.email && touched.email && errors.email}</span>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <span>{errors.password && touched.password && errors.password}</span>
          
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
          <Link className='form-link'to='/'>Sign Up</Link>
        </form>
      )}
    </Formik>
  </div>
    )};

export default Login;
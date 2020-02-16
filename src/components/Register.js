import React from 'react';
import { Formik } from 'formik';
import {Link }from "react-router-dom";
import axios from 'axios';

function Register(props) {
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
        console.log(values)
        axios.post(`http://localhost:4000/users/register`, values)
        .then(res=>{
          console.log(res.data.token)
          localStorage.priceToken = res.data.token
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
        <form className="form" onSubmit={handleSubmit}>
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
          
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
          <Link className='form-link'to='/login'>Sign In</Link>
        </form>
      )}
    </Formik>
  </div>
    )};

export default Register;
  
  
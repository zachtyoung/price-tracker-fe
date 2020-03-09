import React,{useState} from 'react';
import { Formik } from 'formik';
import axios from 'axios';
export const TargetPriceEdit = (props) => {
    return (
    <div className='target-price-form'>
        <Formik
      initialValues={{ target_price:props.price}}
      onSubmit={(values, { setSubmitting }) => {
        axios.put(`https://react-price-tracker.herokuapp.com/users/product/${props.productID}`,values)
        .then(res => {
            axios.get(`https://react-price-tracker.herokuapp.com/users/${props.userID}/products`)
            .then(res =>{
                props.setProducts(res.data)
                props.setIsEditing(false)
            })

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
        <form className="price-edit-form" onSubmit={handleSubmit}>
            <input
            className='price-input'
            type="target_price"
            name="target_price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.target_price}
          />
          {errors.name && touched.name && errors.name}
          <div className='price-btn-wrap'>
          <button className='price-update-btn'type="submit" disabled={isSubmitting}>
            Update
          </button>
          <button className='price-cancel-btn' type="button"onClick={()=>props.setIsEditing(false)}>
            cancel
          </button>
          </div>
        </form>
      )}
    </Formik>

     
     </div>
    )
  };
  
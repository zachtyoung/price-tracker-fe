import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import add from '../assets/add.svg'
import axios from 'axios';

import {ProductView} from './ProductView'


export default function Dashboard(props) {
  const [products, setProducts] = useState(null)
  const userID = localStorage.getItem("priceUserID")

  useEffect(() => {
    props.setThing(localStorage.getItem('priceUserName'))
    axios.get(`https://react-price-tracker.herokuapp.com/users/${userID}/products`)
          .then(res =>{
            setProducts(res.data)
          })
  },[])
  if(products){
    props.setNumPro(products.length)
  }
  if(localStorage.getItem("priceToken")){
    props.setIsLoggedIn(true)
  }
return(
    <div className="register">
        
    <Formik
      initialValues={{ user_id: userID, url: '', target_price:'' }}
      validate={values => {
        const errors = {};
        if (!values.url ) {
          errors.url = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        axios.post(`https://react-price-tracker.herokuapp.com/users/scrapeAndAdd`, values)
        .then(res=>{
          axios.get(`https://react-price-tracker.herokuapp.com/users/${userID}/products`)
          .then(res =>{
            console.log(res)
            setProducts(res.data)
          })
          

        })
        resetForm({})
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
          <h1>Add a new product</h1>
          <div className="form-flex-wrap">
            <span>{errors.url && touched.url && errors.url}</span>
          <input
            placeholder={"Product URL"}
            type="url"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
          />
          <input
            placeholder={"Target Price"}
            type="text"
            name="target_price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.target_price}
          />
          
          
          <button className='add-btn'type="submit" disabled={isSubmitting}>
            <img className="add-img" src={add}></img>
          </button>
          </div>
        </form>
      )}
    </Formik>
    <div className='product-wrap'>
    {products ? products.map((el) => 
    <ProductView key={el.id} products={el} setProducts={setProducts} userID={userID}/>
    ): ""}
    </div>
  </div>
)
}
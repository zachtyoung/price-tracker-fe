import React,{useState} from 'react';
import axios from 'axios';
import {AlertIcon} from './AlertIcon'
import {NoAlertIcon} from './NoAlertIcon'
import {TargetPriceEdit} from './TargetPriceEdit'
export const ProductView = (props) => {
  const [productNotifications, setProductNotifications] =useState(props.products.notifications)
  const [isEditing, setIsEditing]=useState(false)
    return (
    <div className='product-card'>
      <div className='product-card-header'>
      <button className="product-remove" title='Delete Product' onClick={() => {
        axios.delete(`https://react-price-tracker.herokuapp.com/users/product/${props.products.id}`)
        .then(res =>{
            axios.get(`https://react-price-tracker.herokuapp.com/users/${props.userID}/products`)
            .then(res =>{
              props.setProducts(res.data)
            })
        })
        }}>&#x2715;</button>
        <button className='product-alerts' title='Notifications'onClick={()=> {
          axios.put(`https://react-price-tracker.herokuapp.com/users/product/${props.products.id}`,{"notifications":!productNotifications})
          .then(res =>{
          //  axios.get(`http://localhost:5000/users/${props.products.id}/products`)
          //  .then(res => console.log(res))
            setProductNotifications(!productNotifications)})
          
          }}>{productNotifications? <AlertIcon fill={'#FF9900'}/>:<NoAlertIcon fill={'#bdbdbd'}/>}</button>
        
        </div>
    <img className='product-img' src={props.products.img_url} alt={'product'}></img>
    <div className='product-name'><p>{props.products.description}</p></div>
    <div className='product-price'>Currently: {props.products.price}</div>
    {isEditing? <TargetPriceEdit setProducts={props.setProducts} userID={props.userID} price={props.products.target_price} productID={props.products.id} isEditing={isEditing} setIsEditing={setIsEditing}/>:<div className='product-target-price'>Target: ${props.products.target_price}<button className="price-edit-btn" onClick={()=>setIsEditing(true)}>Edit</button></div>}
    </div>
    )
  };
  
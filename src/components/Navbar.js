import React, {useEffect, useState, useRef} from 'react';
import account from '../assets/account.svg'
import axios from 'axios'
import {AlertIcon} from './AlertIcon'
import {NoAlertIcon} from './NoAlertIcon'
import { useHistory } from 'react-router-dom'
import { Modal, Button, Avatar, Menu, Dropdown} from 'antd';
import { Formik } from 'formik';
import add from '../assets/add.svg'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import logo from '../assets/ptracker-logo.svg'
import {Link }from "react-router-dom";

export const Navbar = (props) => {
    const userID = localStorage.getItem("priceUserID")
    let history = useHistory()
    const [noti, setNoti] = useState(true)
    const[visible, setVisible]=useState(false)
    const[menuVisible, setMenuVisible]=useState(false)
    const[confirmLoading, setConfirmLoading]=useState(false)
    const[loading, setLoading]=useState(false)
    const formRef = useRef()

    const handleMenuClick = e => {
      if (e.key === '3') {
        setMenuVisible(false)
      }
    };
    const menu = (
      <Menu className='testing'onClick={handleMenuClick}>
        <Menu.Item className='pro-name'key="1">{props.thing}</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={() => {
                axios.put(`https://react-price-tracker.herokuapp.com/users/${userID}`,{"all_notifications":!noti})
                .then(res =>{
                    setNoti(!noti)
                })
                }}><span className='notify-btn-text'>Notifications</span>{noti?<AlertIcon fill={'#FF9900'} className={'alert-dropdown'}/>:<NoAlertIcon fill={'#bdbdbd'} className={'alert-dropdown'}/>}</Menu.Item>
        <Menu.Item key="3" onClick={()=> {
                localStorage.removeItem("priceUserID")
                localStorage.removeItem("priceUserName")
                localStorage.removeItem("priceToken")
                props.setIsLoggedIn(false)
                history.push("/");
                
        }}>Logout</Menu.Item>
      </Menu>
    );
    const handleVisibleChange = flag => {
      setMenuVisible(flag)
    };
    const showModal = () => {
        setVisible({
          visible: true,
        });
      };
      const handleOk = () => {
        setLoading(true)
        if (formRef.current) {
          formRef.current.handleSubmit()
  
        }
      };
      const handleCancel = () => {
        setVisible(false)
      };
    return (
        <div className="nav-wrap">
             <Modal
          title={<h1 className='modal-title'>Add a new product</h1>}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button className='add-product-btn' key="submit" type="primary" loading={loading} onClick={handleOk}>
              Add
            </Button>,
          ]}
        >
              <Formik
              innerRef={formRef}
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
            props.setProducts(res.data)
            setLoading(false)
            setVisible(false)
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
          <div className="form-flex-wrap">
            <span className='errors-url'>{errors.url && touched.url && errors.url}</span>
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
          
          
          {/* <button className='add-btn'type="submit" disabled={isSubmitting}>
            <img className="add-img" src={add}></img>
          </button> */}
          </div>
        </form>
      )}
    </Formik>
        </Modal>
        <div><img className="logo"src={logo}></img></div>
        
        {props.isLoggedIn? 
        <>
        <div className="products">Watchlist: {props.numPro}</div> 
        <div className="nav-user">
        <button className='add-btn' onClick={showModal}>
            <img className="add-img" src={add}></img>
          </button>
            
            <div className='user-icon-wrap'><Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={menuVisible}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <Avatar size="small" icon={<UserOutlined />} />
        </a>
      </Dropdown></div>
           
        </div>
        </>
        : <Link to='/login'className='nav-sign-in'>sign in</Link>}
        
       

        
        </div>
    )
  };
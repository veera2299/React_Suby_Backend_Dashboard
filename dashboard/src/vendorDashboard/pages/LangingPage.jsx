import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'



const LangingPage = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [welcome,setWelcome] = useState(false);
  const [showallproducts,setShowallproducts] = useState(false);
  const [showLogout,setShowLogout] =useState(false);
  const [showFirmTitle,setShowFirmTitle] = useState(true);

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogout(true)
    }
  },[])

    useEffect(()=>{
      const firmName = localStorage.getItem('firmName');
      if(firmName){
        setShowFirmTitle(false);
      }
  },[])
 

  const logoutHandler =()=>{
    confirm("Are you sure to logout");
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName')
    setShowLogout(false)
    setShowLogin(true);
    setShowFirmTitle(true);
  }

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setWelcome(false)
    setShowallproducts(false);
  }
  const showLoginHandler = () => {
    setShowRegister(false);
    setShowLogin(true);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setWelcome(false)
    setShowallproducts(false);
  }
  const showAddFirmHandler = () => {
    if(showLogout){
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(true);
    setShowAddProduct(false);
    setWelcome(false)
    setShowallproducts(false);
    }else{
      alert("Please Login");
      setShowLogin(true);
    }
  }
  const showAddProductHandler = () => {
    if(showLogout){
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(true);
    setWelcome(false)
    setShowallproducts(false)
    }else{
      alert("Please Login");
      setShowLogin(true);
    };
  }
  const showWelcomeHandler =() =>{
    setWelcome(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowallproducts(false);
  }
  const showAllProductHandler =()=>{
    if(showLogout){
    setShowallproducts(true);
    setWelcome(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    }else{
      alert("Please Login");
      setShowLogin(true);
    }
  }
   
  return (
    <>
    <section className='landingSection'>
    <NavBar showRegisterHandler={showRegisterHandler} showLoginHandler={showLoginHandler} 
    showLogout ={showLogout} logoutHandler ={logoutHandler}
    />
        <div className="collectionSection">
        <SideBar showAddFirmHandler = {showAddFirmHandler} showAddProductHandler = {showAddProductHandler} 
        showAllProductHandler ={showAllProductHandler} showFirmTitle = {showFirmTitle}
        />
          {showRegister && <Register showLoginHandler ={showLoginHandler} />}
          { showLogin && <Login showWelcomeHandler ={showWelcomeHandler}/>}
         { showAddFirm && showLogout && <AddFirm/>}
          {showLogout && showAddProduct && <AddProduct/>}
          {welcome && <Welcome/>}
         {showLogout && showallproducts && <AllProducts/>}
        </div>
    </section>
    </>
  )
}

export default LangingPage

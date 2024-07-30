import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {

  const [productName,setProductName] =useState('');
  const [price,setPrice] =useState('');
  const [category,setCategory] = useState([]);
  const [bestSeller,setBestSeller] = useState(false);
  const [description,setDescription] =useState('')
  const [file,setFile]= useState(null);

  const handleCategoryChange = e => {
    const value = e.target.value;
    if (category.includes(value)) {
        setCategory(category.filter((item) => item !== value));
    }
    else {
        setCategory([...category, value]);
    }
}
const handleBestSeller = (e)=>{
  const value = e.target.value === 'true'
  setBestSeller(value)
}

const handleImageUpload = (e) =>{
  const selectedImage = e.target.files[0];
  setFile(selectedImage);
}

const handleProductSubmit =async(e)=>{
  e.preventDefault();
  try {
    const loginToken = localStorage.getItem('loginToken')
    const firmId = localStorage.getItem('firmId');
    if(!loginToken || !firmId){
      console.log("user not authenticated");
    }
     const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('bestSeller',bestSeller);
    formData.append('image', file);

    category.forEach((value) => {
        formData.append('category', value)
    })

    const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body: formData
    });
    const data = await response.json();
    if(response.ok){
     alert("product added successfully");
     setProductName('');
     setPrice('');
     setCategory([]);
     setBestSeller(false);
     setDescription('')
     setFile(null);
     
    }
   
  } catch (error) {
    console.log(error);
    alert("failed to add product")
  }
}

  return (
    <div className="firmSection">
      <form className='tableForm' onSubmit={handleProductSubmit} >
        <h3>Add Product</h3>
        <label >Product Name</label>
        <input type="text"  value={productName} onChange={(e)=>setProductName(e.target.value)} />
        <label >Price</label>
        <input type="text" value={price}  onChange={(e)=>setPrice(e.target.value)} />
        <div className="checkinp">
          <label >Category : </label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label> Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handleCategoryChange} />
            </div>
            <div className="checkboxContainer">
              <label>non-veg</label>
              <input type="checkbox" checked ={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange} />
            </div>
          </div>
        </div>
        <div className="checkinp">
          <label >BestSeller : </label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label> Yes</label>
              <input type="radio" value='true' checked ={bestSeller === true} onChange={handleBestSeller}  />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio" value='false' checked = {bestSeller === false} onChange={handleBestSeller} />
            </div>
          </div>
        </div>
        <label >Description</label>
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <label >Product Image</label>
        <input type="file" onChange={handleImageUpload}/>
        <div className="btnSubmit"><br />
          <button type='submit'>Sumbit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct

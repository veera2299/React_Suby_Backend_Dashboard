import React, { useState } from 'react'
import {API_URL} from '../../data/apiPath'

const AddFirm = () => {
    const [firmName, setFirmName] = useState('');
    const [area, setArea] = useState('');
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState('');
    const [file, setFile] = useState(null);

    const handleCategoryChange = e => {
        const value = e.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        }
        else {
            setCategory([...category, value]);
        }
    }


    const handleRegionChange = (e) => {
        const value = e.target.value;
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value))
        }
        else {
            setRegion([...region, value])
        }
    }

    const handleImageUpload = (e) =>{
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
    }

    const handleFirmSubmit = async(e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('loginToken');
            if (!loginToken) {
                console.log("user not authenticated");
            }

            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file);

            category.forEach((value) => {
                formData.append('category', value)
            })
            region.forEach((value) => {
                formData.append('region', value);
            })

            const response = await fetch(`${API_URL}/firm/add-firm`,{
                method:'POST',
                headers:{
                    'token' : `${loginToken}`
                },
                body: formData
            });
            const data = await response.json()
            if(response.ok){
                console.log(data);
                alert("Add Firm Successfully");
                localStorage.setItem('firmId', data.firmId);
            }else if(data.message === "vendor can have only one firm"){
                alert('vendor can add only one Firm')
            }else{
                alert('failed to add firm')
            }
            console.log("this is firmId", data.firmId);
            const firmId = data.firmId;



        } catch (error) {
            console.log("failed to add Firm",error);
        }
    }
    return (
        <div className="firmSection">
            <form className='tableForm' onSubmit={handleFirmSubmit} >
                <h3>Add Firm</h3>
                <label >Firm Name</label>
                <input type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                <label >Area</label>
                <input type="text" name='area' value={area} onChange={(e) => setArea(e.target.value)} />
                <div className="checkinp">
                    <label >Category : </label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <label> Veg</label>
                            <input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handleCategoryChange} />
                        </div>
                        <div className="checkboxContainer">
                            <label>non-veg</label>
                            <input type="checkbox" checked={category.includes('non-veg')} value='non-veg'onChange={handleCategoryChange} />
                        </div>
                    </div>
                </div>
                <div className="checkinp">
                    <label >Region : </label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <label> South Indian</label>
                            <input type="checkbox" checked={region.includes('south-indian')} value='south-indian' onChange={handleRegionChange}/>
                        </div>
                        <div className="checkboxContainer">
                            <label>North-Indian</label>
                            <input type="checkbox" checked={region.includes('north-indian')} value='north-indian' onChange={handleRegionChange}/>
                        </div>
                        <div className="checkboxContainer">
                            <label>Chineese</label>
                            <input type="checkbox" checked={region.includes('chinese')} value='chinese' onChange={handleRegionChange}/>
                        </div>
                        <div className="checkboxContainer">
                            <label>Bakery</label>
                            <input type="checkbox" checked={region.includes('bakery')} value='bakery' onChange={handleRegionChange} />
                        </div>
                    </div>
                </div>
                <label >Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />
                <label >Firm Image</label>
                <input type="file"  onChange={handleImageUpload}/>
                <div className="btnSubmit"><br />
                    <button type='submit'>Sumbit</button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm

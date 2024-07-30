import React from 'react'

const SideBar = ({showAddFirmHandler,showAddProductHandler,showAllProductHandler,showFirmTitle}) => {
  return (

      <div className="sideBarSection">
        <ul>
          {showFirmTitle ? <li onClick={showAddFirmHandler}>Add Firm</li> : ""  }
        
            <li onClick={showAddProductHandler}>Add Product</li>
            <li onClick={showAllProductHandler}>All Products</li>
            <li>User Details</li>
        </ul>
      </div>
   
  )
}

export default SideBar

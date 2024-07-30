import React, { useEffect, useState } from 'react';
import { API_URL } from '../../vendorDashboard/data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products || []);
    } catch (error) {
      console.log("failed to fetch products", error);
    }
  }

  useEffect(() => {
    productHandler();
  }, [])

  const deleteProductById = async (productId) => {
    if (!confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        console.log("Failed to delete product", response.statusText);
      }
    } catch (error) {
      alert("Failed to delete product");
      console.log("Failed to delete product", error);
    }
  }

  return (
    <div>
      {!products ? (
        <p>No Product Found</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ height: "50px", width: "60px" }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts;

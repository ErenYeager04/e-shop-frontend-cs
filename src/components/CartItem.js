import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux'

const CartItem = ({ product }) => {
  const { token, userId } = useSelector((state) => state.user)
  const [error, setError] = useState(null)

  const handleRemove = async () => {
    const data = { userId: userId, productId: product.productId }
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Cart/deleteProduct`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      setError(null)
      window.location.reload()
    }

    if(!response.ok){
      setError(json)
    }

  };

  return (
    <tr>
      <td>
        <img src={product.product.imageUrl} alt={product.product.title} width="50" className=" mx-2"/>
        {product.product.title}
      </td>
      <td>{product.seasons}</td>
      <td>${product.product.price.toFixed(2)}</td>
      <td>${(product.product.price * product.seasons).toFixed(2)}</td>
      <td>
        <Button variant="danger" className="my-2 mx-1" onClick={handleRemove}>
          Remove
        </Button>
        {error && <div className="text-danger mt-1">{error}</div>}
      </td>
    </tr>
  );
};

export default CartItem;
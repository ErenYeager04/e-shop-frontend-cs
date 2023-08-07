import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useSelector } from "react-redux"
import { FaStar } from 'react-icons/fa';

const Product = ({ product }) => {
  const [seasons, setSeasons] = useState(0)
  const [disabled, setDisabled] = useState(null)
  const {userId, token} = useSelector((state) => state.user)
  const [error, setError] = useState(null)
  const [success, setSucces] = useState(null)

  const handleClick = async () => {
    setDisabled(true)
    setError(null)
    setSucces(null)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Cart/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ seasons: seasons, userId: userId, productId: product.id })
    })

    if(response.ok){
      setDisabled(null)
      setSucces(true)
    }
    if(!response.ok){
      setDisabled(null)
      const error = await response.text()
      setError(error)
    }
  }

  return (
    <Card >
      <Card.Img variant="top" src={product.imageUrl} className="product-image" />
      <Card.Body>
        <Card.Title className="product-title">{product.title}</Card.Title>
        <Card.Text className="product-price">Price: {product.price}</Card.Text>
        <Card.Text className="product-price">Rating: {product.rating ? product.rating : ("There is no rating yet")}{product.rating ? <FaStar size={15} className=" mb-1" color={"#ffc107"}/> : ""}</Card.Text>
        <Form.Group className='mb-3' controlId='season'>
        <Form.Label>Seasons:</Form.Label>
          <Form.Select value={seasons} onChange={(e) => setSeasons(e.target.value)}>
            <option value={0}>Select seasons</option>
            {Array.from({ length: product.seasons }, (_, index) => (
              <option key={index+1} value={index+1}>{index+1}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {error && <div className="text-danger m-2">{error}</div>}
        {success && <div className=" text-black m-2">Successfuly added</div>}
        <div className="d-flex justify-content-between">
          <Button  onClick={handleClick} disabled={disabled} variant="primary" className="add-to-cart-btn">Add to Cart</Button>
          <NavLink to={`/product/${product.id}`}>
            <Button variant="secondary" className="view-details-btn">View Details</Button>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
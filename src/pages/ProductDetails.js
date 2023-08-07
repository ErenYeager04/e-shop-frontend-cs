import {  Row, Col, Card, Button,Badge, Form } from "react-bootstrap"
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


const ProductDetail = () => {
  const [product, setProduct] = useState(null)
  const [seasons, setSeasons] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [reviews, setReviews] = useState([])
  const [disabled, setDisabled] = useState(null)
  const [reviewError, setReviewError] = useState(null)
  const [reviewSuccess, setReviewSucces] = useState(null)
  const [productError, setProductError] = useState(null)
  const [productSuccess, setProductSucces] = useState(null)
  const {userId, token} = useSelector((state) => state.user)
  const url = new URL(window.location.href);
  const id = url.pathname.split('/')[2];
  // Initial fetch
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Product/getSingleProduct/${id}`)
      const json = await response.json()
      if (!response.ok) {
        setProduct(null)
      }
  
      if (response.ok) {
        setProduct(json)
        setReviews(json.reviews) 
      } 
    }
    fetchWorkout()  
  }, [id])
  // Review submit handler
  const handleReviewSubmit = async () => {
    setDisabled(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/User/createReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ rating: rating, userId: userId, productId: product.id, comment: comment })
    })

    if(!response.ok) {
      setDisabled(null)
      const error = await response.text()
      setReviewError(error)
    }
    
    if(response.ok) {
      setDisabled(null)
      setReviewError(null)
      setReviewSucces(true)
    }
  }

  const handleAddProductClick = async () => {
    setDisabled(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/Cart/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ seasons: seasons, userId: userId, productId: product.id })
    })

    if(!response.ok) {
      setDisabled(null)
      const error = await response.text()
      setProductError(error)
    }
    
    if(response.ok) {
      setDisabled(null)
      setProductError(null)
      setProductSucces(true)
    }
  }
  
  // get avg score
  const calculateAvg = (reviews) => {
    const totalRatings = reviews.length;
    const sumRatings = reviews.reduce((total, review) => total + review.rating, 0);
    return sumRatings / totalRatings;
  }
  
  const averageRating = calculateAvg(reviews)
  
  
  return (
    // Product section
    <div className="container py-4">
      {product && <>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={product.imageUrl} />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <hr className="my-2 custom-hr"/>
              <Card.Text>{product.description}</Card.Text>
              <hr className="my-2 custom-hr"/>
              <Card.Text>Price: ${product.price}/per season</Card.Text>
              <hr className="my-2 custom-hr"/>
              <Card.Text>
                Genres:{' '}
                {product.productGenres.map((genre) => (
                  <Badge key={genre.id} variant="primary" className="mr-1 mx-1">
                    {genre.name}
                  </Badge>
                ))}
              </Card.Text>
              <hr className="my-2 custom-hr"/>
              <Card.Text>Rating: {product.rating.name}</Card.Text>
              <hr className="my-2 custom-hr"/>
              <Card.Text>Studio: {product.studio.name}</Card.Text>
              <hr className="my-2 custom-hr"/>
              <Card.Text>
                Rating: {averageRating ? averageRating.toFixed(1) : ("There are no ratings yet")}
                {Array.from({ length: averageRating }, (_, index) => (
                  <FaStar
                      key={index}
                      size={20}
                      color={"#ffc107"}
                      className=" mx-1"
                      style={{ border: "1px solid #ccc", borderRadius: "50%" }}
                    />
                ))}
              </Card.Text>
              <hr/>
              <div className="d-flex align-items-center ">
                <Form.Group  controlId='season'>
                  <Form.Label>Seasons:</Form.Label>
                  <Form.Select value={seasons} onChange={(e) => setSeasons(e.target.value)}>
                    <option value={0}>Select seasons</option>
                    {Array.from({ length: product.seasons }, (_, index) => (
                      <option key={index+1} value={index+1}>{index+1}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button onClick={handleAddProductClick} disabled={disabled} className="mx-2 mt-4" variant="primary">Add to cart</Button>
                {productError && <div className="text-danger m-2">{productError}</div>}
                {productSuccess && <div className=" text-black m-2">Successfuly added</div>}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* End of the product section */}
      <hr />
      {/* User review section */}
      <h4>Leave a review</h4>
      <Form >
        <Form.Group  controlId='season'>
          <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={0}>Your rating</option>
            {Array.from({ length: 5 }, (_, index) => (
              <option key={index+1} value={index+1}>{index+1}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Your review comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        {reviewError && <div className="text-danger m-2">{reviewError}</div>}
        {reviewSuccess && <div className=" text-black m-2">Successfuly added</div>}
        <Button disabled={disabled} onClick={handleReviewSubmit}>Submit</Button>
      </Form>
      {/* End of user review section */}
      <hr/>
      {/* All reviews section */}
      <h4>Reviews:</h4>
      {reviews.length > 0 ? reviews.map((review) => (
        <div key={review.index}>
          <strong>User: {review.user.firstName}</strong>
          <p>Review: {review.comment}</p>
          <hr />
        </div>
      )) : ("There are no reviews yet")}
      </>}
    </div>
    
  )
}

export default ProductDetail